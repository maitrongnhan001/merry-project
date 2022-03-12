
import React, { useEffect, useState } from 'react'
import './toolbar-chat.scss'
import Emoji from '../../emoji/emoji'
import $ from 'jquery'
import { sendDocumentMessage, sendMediaMessage } from '../../../../Sockets/socket-chat'
import { useDispatch } from 'react-redux'
import { updateNotification } from '../../../../../redux/actions/notification'

function ToolbarChat({id}) {

    /*----redux----*/
    const dispatch = useDispatch()

    /*----states----*/

    const [emoji, setEmoji] = useState(0)

    /*----handles----*/
    const handleClickEmoji = (e)=>{
        e.stopPropagation()
        console.log(emoji);
        setEmoji(emoji ? 0 : 1)
    }

    const handleChangeToSendMediaMessage = (e)=> {
        const file = e.target.files[0]
        const data = {
            senderId: localStorage.getItem('userId'),
            receiverId: id,
            message: {
                fileName: file.name,
                content: file
            }
        }
        sendMediaMessage(data)
    }

    const handleChangeToSendDocumentMessage = (e)=> {
        const file = e.target.files[0]
        if(file.size >= 1000000) {
            const data = updateNotification('Tài liệu không được lớn hơn 1MB.')
            dispatch(data)
        }else {
            const data = {
                senderId: localStorage.getItem('userId'),
                receiverId: id,
                message: {
                    fileName: file.name,
                    content: file
                }
            }
            sendDocumentMessage(data)
        }
    }

    //lifecycle
    useEffect(()=>{
        $(window).resize(()=>{
            setEmoji(0)
        })
        $(window).click(function(e){
            if(!e.target.classList.value.match(/main-chat-emoji/) || !e.target.classList.value.match(/fa-grin-stars/) ){
                setEmoji(0)
            }
        })
    }, [])

    return (
        <div className="main-chat-toolbar">
            {
                !emoji ? '' : 
                <div className="main-chat-emoji" onClick={(e)=>e.stopPropagation()}>
                    <Emoji></Emoji>
                </div>
            }
            <i className="fas fa-grin-stars" title="Gửi biểu tượng cảm xúc" onClick={handleClickEmoji}></i>
            <label htmlFor="main-chat-image-sender">
            <i className="fas fa-photo-video" title="Gửi tệp đa phương tiện"></i>
            </label>
            <label htmlFor="main-chat-file-sender">
            <i className="fas fa-paperclip" title="Gửi tệp"></i>
            </label>
            <input type="file" style={{display: 'none'}}  id='main-chat-image-sender' accept="image/* , video/*" onChange={handleChangeToSendMediaMessage}/>
            <input type="file" style={{display: 'none'}} id="main-chat-file-sender"  onChange={handleChangeToSendDocumentMessage}/>
        </div>
    );
}

export default React.memo(ToolbarChat)
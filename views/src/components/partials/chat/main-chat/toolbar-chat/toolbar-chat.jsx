
import React from 'react'
import './toolbar-chat.scss'
import $ from 'jquery'
import { sendDocumentMessage, sendMediaMessage } from '../../../../Sockets/socket-chat'
import { useDispatch } from 'react-redux'
import { updateNotification } from '../../../../../redux/actions/notification'

function ToolbarChat({id}) {

    /*----redux----*/
    const dispatch = useDispatch()

    /*----states----*/


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

    return (
        <div className="main-chat-toolbar">
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
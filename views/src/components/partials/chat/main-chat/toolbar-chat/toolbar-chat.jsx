
import React, { useEffect, useState } from 'react'
import './toolbar-chat.scss'
import Emoji from '../../emoji/emoji'
import $ from 'jquery'

function ToolbarChat() {

    /*----states----*/

    const [emoji, setEmoji] = useState(0)

    /*----handles----*/
    const handleClickEmoji = (e)=>{
        e.stopPropagation()
        console.log(emoji);
        setEmoji(emoji ? 0 : 1)
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
            <input type="file" style={{display: 'none'}}  id='main-chat-image-sender' accept="image/* , video/*"/>
            <input type="file" style={{display: 'none'}} id="main-chat-file-sender"/>
        </div>
    );
}

export default React.memo(ToolbarChat)
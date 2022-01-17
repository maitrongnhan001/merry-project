
import React, { useEffect, useState } from 'react'
import './toolbar-chat.scss'
import Emoji from '../../emoji/emoji'
import $ from 'jquery'

function ToolbarChat(props) {

    //states
    const[emoji, setEmoji] = useState(0)

    //
    const showEmoji= (isTrue)=>{
        if(isTrue)
            $('.main-chat-toolbar .main-chat-emoji').css('display', 'block')
        $('.main-chat-toolbar .main-chat-emoji').css('opacity', 0)
        
        setTimeout(()=>{
            if(isTrue) {
                $('.main-chat-toolbar .main-chat-emoji').css('opacity', isTrue)
            }else {
                $('.main-chat-toolbar .main-chat-emoji').css('display', 'none')
            }
        }, 200)
        
    } 

    //handles

    const handleClickEmoji = (e)=>{
        setEmoji(emoji ? 0 : 1)
    }

    //lifecycle

    useEffect(()=>{
        showEmoji(emoji)
    }, [emoji])

    useEffect(()=>{
        $(window).resize(()=>{
            setEmoji(0)
        })
    }, [])

    return (
        <div className="main-chat-toolbar">
            <div className="main-chat-emoji">
               <Emoji></Emoji>
            </div>
            <i className="fas fa-grin-stars" title="Gửi biểu tượng cảm xúc" onClick={handleClickEmoji}></i>
            <i className="fas fa-photo-video" title="Gửi tệp đa phương tiện"></i>
            <i className="fas fa-paperclip" title="Gửi tệp"></i>
        </div>
    );
}

export default React.memo(ToolbarChat)
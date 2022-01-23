import React from 'react'
import { useEffect } from 'react'
import './input-chat.scss'
import $ from 'jquery'

function InputChat(props) {


    //handles

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    const handleChange = (e)=> {
        console.log($(e.target).html());
        if($(e.target).find('.placeholder'))
            $(e.target).find('.placeholder').css('display', 'none')
        if($(e.target).html() === '') {
            console.log('ui');
            $(e.target).find('.placeholder').css('display', 'block')
        }
    }

    //lifecycle
    useEffect(()=>{
        $('.main-chat-input-chat-wrapper .input-chat-content').focus()
    }, [])

    return (
        <div className="main-chat-input-chat-wrapper">
            <form onSubmit={handleSubmit}>
                <div contentEditable id="input-chat-content"  className="input-chat-content" data-placeholder="Gửi tin nhắn đến Đinh Phúc Khang." onKeyUp={handleChange}></div>
                <input type="submit" className="input-chat-submit" value="Gửi" />
            </form>
        </div>
    )
}

export default InputChat
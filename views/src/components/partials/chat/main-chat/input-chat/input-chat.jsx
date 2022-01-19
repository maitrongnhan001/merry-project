import React from 'react'
import { useEffect } from 'react'
import './input-chat.scss'
import $ from 'jquery'

function InputChat(props) {


    //handles

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    //lifecycle
    useEffect(()=>{
        $('.main-chat-input-chat-wrapper .input-chat-content').focus()
    }, [])

    return (
        <div className="main-chat-input-chat-wrapper">
            <form onSubmit={handleSubmit}>
                <input type="text" className="input-chat-content" name="" placeholder="Tin nhắn đến Dinh Phuc Khang!" />
                <input type="submit" className="input-chat-submit" value="Gửi" />
            </form>
        </div>
    )
}

export default InputChat
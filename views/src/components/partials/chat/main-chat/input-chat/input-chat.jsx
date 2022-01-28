import React, { useState } from 'react'
import { useEffect } from 'react'
import './input-chat.scss'
import $ from 'jquery'
import {useSelector} from 'react-redux'

function InputChat() {


    const emoji = useSelector(state => state.message.emoji)

    /*----states----*/
    const[message, setMessage] = useState({
        senderId: 0,
        receiverId: '',
        message: {
            content: ''
        }
    })

    /*----handles----*/
    //xu ly submit form
    const handleSubmit = () => {
        $('#input-chat-content').html('')
        const emptyMessage = {
            ...message,
            message: {
                content: ''
            }
        }
        setMessage(emptyMessage)
    }

    //xu ly the input
    const handleChange = (e)=> {
        if($(e.target).find('.placeholder'))
            $(e.target).find('.placeholder').css('display', 'none')
        if($(e.target).html() === '') {
            $(e.target).find('.placeholder').css('display', 'block')
        }
        const value = $(e.target).html()
        const newMessage = {
            senderId: 0,
            receiverId: '',
            message: {
                content: value
            }
        }
        setMessage(newMessage)
    }

    const handleStopDefault = (e)=> {
        if(e.which === 13) {
            handleSubmit()
            e.preventDefault()
        }
    }

    /*----lifecycle ----*/
    useEffect(()=>{
        $('.main-chat-input-chat-wrapper .input-chat-content').focus()
    }, [])

    useEffect(()=>{
        $('#input-chat-content').html($('#input-chat-content').html() + emoji)
        const value = $('#input-chat-content').html()
        const newMessage = {
            senderId: 0,
            receiverId: '',
            message: {
                content: value
            }
        }
        setMessage(newMessage)
        console.log(newMessage);
    }, [emoji])

    return (
        <div className="main-chat-input-chat-wrapper">
            <div className="main-chat-input-chat-form">
                <div contentEditable id="input-chat-content" className="input-chat-content" data-placeholder="Gửi tin nhắn đến Đinh Phúc Khang." onKeyPress={handleStopDefault} onKeyUp={handleChange}></div>
                <button className="input-chat-submit" onClick={handleSubmit}>Gửi</button>
            </div>
        </div>
    )
}

export default InputChat
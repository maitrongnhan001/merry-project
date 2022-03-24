import React, { useState } from 'react'
import { useEffect } from 'react'
import './input-chat.scss'
import $ from 'jquery'
import {useSelector} from 'react-redux'
import { sendTextMessage } from '../../../../Sockets/socket-chat'

function InputChat({id}) {

    const currentChat = useSelector(state => state.message.currentChat)
    const emoji = useSelector(state => state.message.emoji)

    /*----states----*/
    const[message, setMessage] = useState({
        senderId: localStorage.getItem('userId'),
        receiverId: id,
        message: {
            content: ''
        }
    })

    /*----handles----*/
    //xu ly submit form
    const handleSubmit = () => {
        sendTextMessage(message)
        $('#input-chat-content').html('')
        const newMessage = {
            ...message,
            message: {
                content: ''
            }
        }
        setMessage(newMessage)
    }

    //xu ly the input
    const handleChange = (e)=> {
        if($(e.target).find('.placeholder'))
            $(e.target).find('.placeholder').css('display', 'none')
        if($(e.target).html() === '') {
            $(e.target).find('.placeholder').css('display', 'block')
        }
        const value = $(e.target).text()
        const newMessage = {
            ...message,
            message: {
                content: value
            }
        }
        setMessage(newMessage)
    }

    const handleStopDefault = (e)=> {
        if(e.which === 13) {
            e.preventDefault()
            handleSubmit()
        }
    }

    useEffect(()=>{
        const value = $('#input-chat-content').text('')
        const newMessage = {
            ...message,
            message: {
                content: value
            }
        }
        setMessage(newMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChat])


    /*----lifecycle ----*/
    useEffect(()=>{
        $('.main-chat-input-chat-wrapper .input-chat-content').focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        setMessage({...message, receiverId: id})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(()=>{
        $('#input-chat-content').html($('#input-chat-content').text() + emoji)
        const value = $('#input-chat-content').text()
        const newMessage = {
            ...message,
            message: {
                content: value
            }
        }
        setMessage(newMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emoji])

    return (
        <div className="main-chat-input-chat-wrapper">
            <div className="main-chat-input-chat-form">
                <div contentEditable id="input-chat-content" className="input-chat-content" data-placeholder={`Gửi tin nhắn đến ${currentChat.name}.`} onKeyPress={handleStopDefault} onKeyUp={handleChange}></div>
                <button className="input-chat-submit" onClick={handleSubmit}>Gửi</button>
            </div>
        </div>
    )
}

export default InputChat
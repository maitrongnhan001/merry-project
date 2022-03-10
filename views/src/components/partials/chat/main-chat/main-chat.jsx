import React, { useEffect } from 'react'
import Header from './header/header'
import ChatArea from './main/main' 
import ToolbarChat from './toolbar-chat/toolbar-chat'
import InputChat from './input-chat/input-chat'
import './main-chat.scss'
import {useSelector} from 'react-redux'
import $ from 'jquery'

function MainChat() {

    /*----redux----*/
    const isShowExtension = useSelector(state => state.extension.isShow)
    const currentChat = useSelector(state => state.message.currentChat)

    /*----lifecycle----*/
    useEffect(()=>{
        if(isShowExtension) {
            $('.main-chat-wrapper').css('width', 'calc(100% - 22rem)')
        }else {
            $('.main-chat-wrapper').css('width', 'calc(100%)')
        }
    }, [isShowExtension])

    return (
        <div className="main-chat-wrapper">
            <Header name={currentChat.name} image={currentChat.image} id={currentChat.receiverId}></Header>
            <div className="main-chat-chat-group-wrapper-box">
                <ChatArea id={currentChat.receiverId}></ChatArea>
                <ToolbarChat></ToolbarChat>
                <InputChat id={currentChat.receiverId}></InputChat>
            </div>
        </div>
    );
}

export default React.memo(MainChat)
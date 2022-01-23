import React, { useEffect } from 'react'
import Header from './header/header'
import ChatArea from './main/main' 
import ToolbarChat from './toolbar-chat/toolbar-chat'
import InputChat from './input-chat/input-chat'
import './main-chat.scss'
import {useSelector} from 'react-redux'
import $ from 'jquery'

function MainChat(props) {

    //redux
    const isShowExtension = useSelector(state => state.extension.isShow)

    useEffect(()=>{
        if(isShowExtension) {
            $('.main-chat-wrapper').css('width', 'calc(100% - 22rem)')
        }else {
            $('.main-chat-wrapper').css('width', 'calc(100%)')
        }
    }, [isShowExtension])

    return (
        <div className="main-chat-wrapper">
            <Header></Header>
            <div className="main-chat-chat-group-wrapper-box">
                <ChatArea></ChatArea>
                <ToolbarChat></ToolbarChat>
                <InputChat></InputChat>
            </div>
        </div>
    );
}

export default React.memo(MainChat)
import React, { useEffect } from 'react'
import Header from './header/header'
import ChatArea from './main/main' 
import ToolbarChat from './toolbar-chat/toolbar-chat'
import './main-chat.scss'
import {useSelector} from 'react-redux'
import $ from 'jquery'

function MainChat(props) {

    //redux
    const isShowExtension = useSelector(state => state.extension.isShow)

    useEffect(()=>{
        if(isShowExtension) {
            $('.main-chat-wrapper').css('width', 'calc(100% - 48rem)')
        }else {
            $('.main-chat-wrapper').css('width', 'calc(100% - 48rem  + 22rem)')
        }
    }, [isShowExtension])

    return (
        <div className="main-chat-wrapper">
            <Header></Header>
            <ChatArea></ChatArea>
            <ToolbarChat></ToolbarChat>
        </div>
    );
}

export default React.memo(MainChat)
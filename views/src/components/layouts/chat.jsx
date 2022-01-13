import React from 'react'
import MainChat from '../partials/chat/main-chat/main-chat'
import TaskBar from '../partials/chat/task-bar/task-bar'
import Tab from '../partials/chat/tabs/Tab'
import Extension from '../partials/chat/extension/Extension'
import './chat.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../redux/actions/taskbar'

function Chat(props) {
    const theme = useSelector(state => state.taskbar.theme)
    const dispatch = useDispatch()

    useEffect(()=>{
        let themeLocal = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light-theme'
        let themeState = setTheme(themeLocal)
        dispatch(themeState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        document.getElementsByClassName('chat-wrapper')[0].setAttribute('data-theme', theme)
    }, [theme])

    return (
        <div className="chat-wrapper">
            <TaskBar></TaskBar>
            <Tab></Tab>
            <MainChat></MainChat>
            <Extension></Extension>
        </div>
    );
}

export default Chat
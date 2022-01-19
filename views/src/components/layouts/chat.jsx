import React, { useRef } from 'react'
import MainChat from '../partials/chat/main-chat/main-chat'
import TaskBar from '../partials/chat/task-bar/task-bar'
import Tab from '../partials/chat/tabs/Tab'
import Extension from '../partials/chat/extension/Extension'
import AddedFriendDialog  from '../partials/chat/add-friends/add-friends'
import CreateGroup from '../partials/chat/create-group/create-group'
import Profile from '../partials/chat/profile/profile'
import './chat.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../redux/actions/taskbar'

function Chat(props) {
    const theme = useSelector(state => state.taskbar.theme)
    const display = useSelector(state => state.taskbar.addedForm)
    const dispatch = useDispatch()

    useEffect(()=>{
        let themeLocal = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light-theme'
        let themeState = setTheme(themeLocal)
        dispatch(themeState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const REF = useRef()

    useEffect(()=>{
        REF.current.classList.add('chat-wrapper')
        document.getElementsByClassName('chat-wrapper')[0].setAttribute('data-theme', theme)
    }, [theme])

    



    return (
        <div ref={REF} className="chat-wrapper">
            
            {
                display === 1 ? 
                <AddedFriendDialog></AddedFriendDialog> 
                : 
                display === 2 ?
                <CreateGroup></CreateGroup> 
                : 
                display === 3 ? 
                <Profile></Profile>
                :
                ''
            }
            <TaskBar></TaskBar>
            <Tab></Tab>
            <MainChat></MainChat>
            <Extension></Extension>
        </div>
    );
}

export default Chat
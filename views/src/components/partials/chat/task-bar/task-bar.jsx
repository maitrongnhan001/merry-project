import React, { useEffect } from 'react'
import './task-bar.scss'
import {useDispatch, useSelector} from 'react-redux'
import { saveTab, setTheme } from '../../../../redux/actions/taskbar'
import $ from 'jquery'

function TaskBar(props) {

    //redux
    const focusTab = useSelector(state => state.taskbar.data)
    const dispatch = useDispatch() 

    //hooks
    useEffect(()=>{
        if(focusTab === 0) {
            $('.taskbar-wrapper .fa-comments').css('background', '#414ab1')
            $('.taskbar-wrapper .fa-address-book').css('background', 'none')
            $('.taskbar-wrapper .fa-users').css('background', 'none')
        }else if(focusTab === 1) {
            $('.taskbar-wrapper .fa-address-book').css('background', '#414ab1')
            $('.taskbar-wrapper .fa-users').css('background', 'none')
            $('.taskbar-wrapper .fa-comments').css('background', 'none')
        }else {
            $('.taskbar-wrapper .fa-users').css('background', '#414ab1')
            $('.taskbar-wrapper .fa-address-book').css('background', 'none')
            $('.taskbar-wrapper .fa-comments').css('background', 'none')
        }
    }, [focusTab])

    //handle avatar item
    const handleClickAvatar = (e)=>{

    }

    //handle message item
    const handleClickMessage = (e)=> {
        const tab = saveTab(0)
        dispatch(tab)
    }

    //handle friends list item
    const handleClickFriendsList = (e)=> {
        const tab = saveTab(1)
        dispatch(tab)
    }

    //handle groups list item
    const handleClickGroupsList = (e)=> {
        const tab = saveTab(2)
        dispatch(tab)
    }

    //handle dark mode item
    const handleClickDarkMode = (e)=> {
        const themeLocal = localStorage.getItem('theme')
        const isDark = themeLocal && themeLocal === 'dark-theme'  ? 'light-theme' : 'dark-theme' 
        localStorage.setItem('theme', isDark)
        const theme = setTheme(isDark)
        dispatch(theme)
        if(isDark === 'light-theme') {
            e.target.style.color = 'white'
        }else {
            e.target.style.color = '#36393f'
        }
    }

    //handle sign out item
    const handleClickSignOut = (e)=> {

    }

    useEffect(()=>{
        const themeLocal = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light-theme'
        if(themeLocal === 'light-theme') {
            $('.taskbar-wrapper .taskbar-bottom .fa-moon').css('color', 'white')
        }else {
            $('.taskbar-wrapper .taskbar-bottom .fa-moon').css('color', '#36393f')
        }
    }, [])

    return (
        <div className="taskbar-wrapper">
            <div className="taskbar-top">
                <div className="my-avatar" onClick={handleClickAvatar}>
                    <img src="/img/me.jpg" alt="avt" />
                </div>
                <div className="task-items">
                    <i className="task-item fas fa-comments" onClick={handleClickMessage}></i>
                    <i className="task-item fas fa-address-book" onClick={handleClickFriendsList}></i>
                    <i className="task-item fas fa-users" onClick={handleClickGroupsList}></i>
                </div>
            </div>
            <div className="taskbar-bottom function-items">
                <i className="function-item fas fa-moon" onClick={handleClickDarkMode}></i>
                <i className="function-item fas fa-sign-out-alt" onClick={handleClickSignOut}></i>
            </div>
        </div>
    );
}

export default React.memo(TaskBar)
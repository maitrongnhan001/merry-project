import React, { useEffect } from 'react'
import './task-bar.scss'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveTab, setTheme, showCenter, showDialog } from '../../../../redux/actions/taskbar'
import $ from 'jquery'
import { setTemplate, urlUserAvatar } from '../../../APIs/ConnectAPI'
import { sendLogout } from '../../../Sockets/home'


function TaskBar() {

    /*----redux----*/
    //lay du lieu tu redux
    const focusTab = useSelector(state => state.taskbar.data)
    const currentChat = useSelector(state => state.message.currentChat)
    
    //ket noi den redux
    const dispatch = useDispatch() 

    //history
    const navigate = useNavigate()

    /*----handles----*/
    //handle avatar item
    const handleClickAvatar = (e)=>{
        const display = showDialog(3)
        dispatch(display)
    }

    //handle message item
    const handleClickMessage = (e)=> {
        const tab = saveTab(0)
        dispatch(tab)
        let center = showCenter(0)
        if(currentChat.receiverId) {
            center = showCenter(1)
        }
        dispatch(center)
        $('#tab-wrapper').removeClass('hide-tab-in-phones-screen')
        $('.main-chat-center').removeClass('show-main-chat-phone-screen')
    }

    //handle friends list item
    const handleClickFriendsList = (e)=> {
        const tab = saveTab(1)
        dispatch(tab)
        const center = showCenter(2)
        dispatch(center)
        $('#tab-wrapper').removeClass('hide-tab-in-phones-screen')
        $('.main-chat-center').removeClass('show-main-chat-phone-screen')
    }

    //handle groups list item
    const handleClickGroupsList = (e)=> {
        const tab = saveTab(2)
        dispatch(tab)
        const center = showCenter(0)
        dispatch(center)
        $('#tab-wrapper').removeClass('hide-tab-in-phones-screen')
        $('.main-chat-center').removeClass('show-main-chat-phone-screen')
    }

    //handle dark mode item
    const handleClickDarkMode = async (e)=> {
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
        sendLogout(localStorage.getItem('userId'))
        localStorage.removeItem('userId')
        localStorage.removeItem('accessToken')
        navigate('/')
    }

    if(!localStorage.getItem('accessToken')) {
        navigate('/')
    }
    /*----lifecycle----*/
    useEffect(()=>{
        if(focusTab === 0) {
            $('.taskbar-wrapper .task-item-focus span').animate({top: '.5rem'}, 250)
        }else if(focusTab === 1) {
            $('.taskbar-wrapper .task-item-focus span').animate({top: "5.5rem"}, 250)
        }else {
            $('.taskbar-wrapper .task-item-focus span').animate({top: "10.5rem"}, 250)
        }
    }, [focusTab])

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
                    <img src={urlUserAvatar + localStorage.getItem('userAvatar')} alt="avt" />
                </div>
                <div className="task-items">
                    <div className="task-item-focus">
                        <span></span>
                    </div>
                    <div className="task-items-box">
                        <i className="task-item fas fa-comments" onClick={handleClickMessage}></i>
                        <i className="task-item fas fa-address-book" onClick={handleClickFriendsList}></i>
                        <i className="task-item fas fa-users" onClick={handleClickGroupsList}></i>
                    </div> 
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
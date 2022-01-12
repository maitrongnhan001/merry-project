import React from 'react'
import './task-bar.scss'
import {useDispatch} from 'react-redux'
import { saveTab } from '../../../../redux/actions/taskbar'

function TaskBar(props) {

    //redux
    const dispatch = useDispatch() 


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

    }

    //handle sign out item
    const handleClickSignOut = (e)=> {

    }

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

export default TaskBar;
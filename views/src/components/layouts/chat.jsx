import React from 'react'
import MainChat from '../partials/chat/main-chat/main-chat'
import TaskBar from '../partials/chat/task-bar/task-bar'
import Tab from '../partials/chat/tabs/Tab'
import Extension from '../partials/chat/extension/Extension'
import './chat.scss'

function chat(props) {
    return (
        <div className="chat-wrapper">
            <TaskBar></TaskBar>
            <Tab></Tab>
            <MainChat></MainChat>
            <Extension></Extension>
        </div>
    );
}

export default chat
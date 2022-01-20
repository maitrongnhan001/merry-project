import React, { useState } from 'react'
import './center.scss'
import FriendCenter from './friend-center/friend-center'
import StartedCenter from './started-center/started-center'
import Chat from '../main-chat/main-chat'
import Extension from '../extension/Extension'

function Center(props) {

    //states 
    const [center, setCenter] = useState(2)

    return (
        <div className="main-chat-center">
            {
                center === 0
                ?
                <StartedCenter></StartedCenter>
                :
                center === 1
                ?
                <>
                    <Chat></Chat>
                    <Extension></Extension>
                </>
                :
                <FriendCenter></FriendCenter>
            }
            
        </div>
    );
}

export default Center
import React, { useEffect } from 'react'
import './tab.scss'
import { useSelector } from 'react-redux'
import ChatTab from './chats/Chats'
import FriendsTab from '../tabs/friends/friends'
import GroupsTab from '../tabs/groups/groups'
import Search  from './search/search'
import $ from 'jquery'

function Tab(props) {
    //redux
    const state = useSelector(state => state.taskbar.data)

    useEffect(()=>{
        $('.tab-main').scrollTop(0)
    }, [state])

    return (
        <div className='tab-wrapper'>
            <Search></Search>
            <div className="tab-main">
                {state === 0 ? <ChatTab></ChatTab>: 
                 state === 1 ? <FriendsTab></FriendsTab> : 
                               <GroupsTab></GroupsTab>}
            </div>
        </div>
    );
}

export default React.memo(Tab)
import React, { useEffect } from 'react'
import './tab.scss'
import { useDispatch, useSelector } from 'react-redux'
import ChatTab from './chats/Chats'
import FriendsTab from '../tabs/friends/friends'
import GroupsTab from '../tabs/groups/groups'
import Search  from './search/search'
import $ from 'jquery'
import { showFeature } from '../../../../redux/actions/taskbar'

function Tab(props) {
    //redux
    const state = useSelector(state => state.taskbar.data)
    const feature = useSelector(state => state.taskbar.feature)
    const dispatch = useDispatch()

    useEffect(()=>{
        $('.tab-main').scrollTop(0)
        $('.tab-main').scroll(()=>{
            const display = showFeature({...feature, isShow: 0})
            dispatch(display)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
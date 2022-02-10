import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, showFeature } from '../../redux/actions/taskbar'
import TaskBar from '../partials/chat/task-bar/task-bar'
import Tab from '../partials/chat/tabs/Tab'
import AddedFriendDialog  from '../partials/chat/add-friends/add-friends'
import Feature from '../partials/chat/tools/feature/feature'
import CreateGroup from '../partials/chat/create-group/create-group'
import Profile from '../partials/chat/profile/profile'
import Center from '../partials/chat/center/center'
import Loader from '../partials/chat/tools/loader/loader'
import './chat.scss'

function Chat() {
    const theme = useSelector(state => state.taskbar.theme)
    const display = useSelector(state => state.taskbar.addedForm)
    const feature = useSelector(state => state.taskbar.feature)
    const dispatch = useDispatch()

    //handles
    const handleClick = (e)=> {
        if(!e.target.classList.value.match(/tab-friend-feature-item-show/) ) {
            const display = showFeature({...feature, isShow: 0})
            dispatch(display)
        }
    }

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
        <div className="chat-wrapper" onClick={handleClick}>
            {/* <Loader></Loader> */}
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
            <Center></Center>
            {
                feature.isShow ? <Feature offset={feature.offset} group={feature.group}>{feature.group ? 'Rời nhóm' : 'Xóa bạn'}</Feature> : ''
            } 
        </div>
    );
}

export default Chat
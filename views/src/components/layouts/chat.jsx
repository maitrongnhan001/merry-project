import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, showFeature } from '../../redux/actions/taskbar'
import { useNavigate } from 'react-router-dom'
import TaskBar from '../partials/chat/task-bar/task-bar'
import Tab from '../partials/chat/tabs/Tab'
import AddedFriendDialog  from '../partials/chat/add-friends/add-friends'
import Feature from '../partials/chat/tools/feature/feature'
import CreateGroup from '../partials/chat/create-group/create-group'
import Profile from '../partials/chat/profile/profile'
import Center from '../partials/chat/center/center'
import Loader from '../partials/chat/tools/loader/loader'
import './chat.scss'
import { getFriendsList, getListChat, getGroupsList } from '../APIs/ConnectAPI'
import { saveChatList } from '../../redux/actions/friends'
import { saveGroupsList } from '../../redux/actions/groups'
import { getAddFriend } from '../Sockets/socket-friend'
import { getAddGroup } from '../Sockets/socket-group'
import { getLogin } from '../Sockets/home'

function Chat() {
    const theme = useSelector(state => state.taskbar.theme)
    const display = useSelector(state => state.taskbar.addedForm)
    const feature = useSelector(state => state.taskbar.feature)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    //handles
    const handleClick = (e)=> {
        if(!e.target.classList.value.match(/tab-friend-feature-item-show/) ) {
            const display = showFeature({...feature, isShow: 0})
            dispatch(display)
        }
    }

    useEffect(()=>{
        (async function() {
            let themeLocal = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light-theme'
            let themeState = setTheme(themeLocal)
            dispatch(themeState)
            //call chat list API
            const chatsList = await getListChat(localStorage.getItem('userId'))
            if(chatsList.status && chatsList.status === 200) {
                let chatListAction = saveChatList(chatsList.data.data)
                dispatch(chatListAction)
            } 
            //call friends list API
            // const friendsList = await getFriendsList(localStorage.getItem('userId'))
            // console.log(friendsList);
            // if(friendsList.status && friendsList.status === 200) {
            //     let friendsListAction = getFriendsList(friendsList.data.data)
            //     dispatch(friendsListAction)
            // }
            const groupsList = await getGroupsList(localStorage.getItem('userId'))
            if(groupsList.status && groupsList.status === 200) {
                let groupsListAction = saveGroupsList(groupsList.data.data)
                dispatch(groupsListAction)
            }

            //emit user login
            const userLogin = await getLogin()
            console.log(userLogin)

            //emit Socket add friend
            // const addFriendSocket = await getAddFriend()
            // console.log(addFriendSocket)

            //emit Socket add group
            // const addGroupSocket = await getAddGroup()
            // console.log(addGroupSocket) 
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        document.getElementsByClassName('chat-wrapper')[0].setAttribute('data-theme', theme)
    }, [theme])

    useEffect(()=>{
        if(!localStorage.getItem('accessToken')) {
            navigate('/')
        }
    })

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
import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, showCenter, showFeature } from '../../redux/actions/taskbar'
import { updateShowOrderFeature, updateNewMember, updateDeleteMember } from '../../redux/actions/extension'
import { useNavigate } from 'react-router-dom'
import TaskBar from '../partials/chat/task-bar/task-bar'
import Tab from '../partials/chat/tabs/Tab'
import AddedFriendDialog from '../partials/chat/add-friends/add-friends'
import Feature from '../partials/chat/tools/feature/feature'
import CreateGroup from '../partials/chat/create-group/create-group'
import Profile from '../partials/chat/profile/profile'
import Center from '../partials/chat/center/center'
import Loader from '../partials/chat/tools/loader/loader'
import Notification from '../partials/chat/tools/notification/notification'
import FormAdddMember from '../partials/chat/extension/Another-features/add-members/form/form-add-member'
import Ask from '../partials/chat/extension/Another-features/leave-group/form-ask/ask'
import './chat.scss'
import { getFriendsList, getListChat, getGroupsList } from '../APIs/ConnectAPI'
import { getAddGroup, getAddMember, getDeleteMember, getUpdateGroup } from '../Sockets/socket-group'
import { addFriendAfterAccept, addFriendRequest, saveChatList, saveFriendsList, updateInfomationFriend, deleteFriend } from '../../redux/actions/friends'
import { addGroup, saveGroupsList, updateInfomationGroup } from '../../redux/actions/groups'
import { getConnection, getLogout, sendConnection } from '../Sockets/home'
import { saveUserOffline, saveUserOnline } from '../../redux/actions/user'
import { getRoom, getTextMessageChat, getMediaMessage, getDocumentMessage } from '../Sockets/socket-chat'
import { getAcceptFriend, getAddFriend, getDeleteFriend, getDismissFriend } from '../Sockets/socket-friend'
import { saveCurrentChat, saveMassage } from '../../redux/actions/message'
import SetNameForm from '../partials/chat/extension/Another-features/set-name-group/set-name-form/set-name-form'
import SetAvatarForm from '../partials/chat/extension/Another-features/set-avatar-group/set-avatar-form/set-avatar-form'
import { updateManagerFriend } from '../../redux/actions/extension'

function Chat() {
    const theme = useSelector(state => state.taskbar.theme)
    const display = useSelector(state => state.taskbar.addedForm)
    const displayFormExtension = useSelector(state => state.extension.showForm)
    const feature = useSelector(state => state.taskbar.feature)
    const isFriendProfileForm = useSelector(state => state.friends.friendProfile)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    //handles
    const handleClick = (e) => {
        if (!e.target.classList.value.match(/tab-friend-feature-item-show/)) {
            const display = showFeature({ ...feature, isShow: 0 })
            dispatch(display)
        }

        //hide order feature in extension component
        const hideOrderFeatureExtension = updateShowOrderFeature(null)
        dispatch(hideOrderFeatureExtension)
    }

    useEffect(() => {
        (async function () {
            let themeLocal = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light-theme'
            let themeState = setTheme(themeLocal)
            dispatch(themeState)
            //call chat list API
            const chatsList = await getListChat(localStorage.getItem('userId'))
            if (chatsList && chatsList.status === 200) {
                let chatListAction = saveChatList(chatsList.data.data)
                dispatch(chatListAction)
            }
            //call friends list API
            const friendsList = await getFriendsList(localStorage.getItem('userId'))
            if (friendsList && friendsList.status === 200) {
                let friendsListAction = saveFriendsList(friendsList.data.data)
                dispatch(friendsListAction)
            }

            const groupsList = await getGroupsList(localStorage.getItem('userId'))
            if (groupsList && groupsList.status === 200) {
                let groupsListAction = saveGroupsList(groupsList.data.data)
                dispatch(groupsListAction)
            }

            //send connection
            sendConnection(localStorage.getItem('userId'))
            //listen connection
            getConnection((data) => {
                if (data.userId !== localStorage.getItem('userId')) {
                    const userOnline = saveUserOnline(data.userId)
                    dispatch(userOnline)
                }
            })

            //logout 
            getLogout((data) => {
                if (data.userId !== localStorage.getItem('userId')) {
                    const userOffline = saveUserOffline(data.userId)
                    dispatch(userOffline)
                }
            })

            //getRoom
            getRoom((data) => {
                console.log(data)
            })

            getAddMember((data) => {
                if (!data.groupId) return

                //luu du lieu vao redux extension
                const dataNewMember = updateNewMember(data)
                dispatch(dataNewMember)
            })

            getDeleteMember(data => {
                if (!data.groupId) return

                //luu du lieu vao redux extension
                const dataDeleteMember = updateDeleteMember(data);
                dispatch(dataDeleteMember);
            })

            getAddGroup((data) => {
                const addGroupAction = addGroup(data)
                dispatch(addGroupAction)
                const currentChat = saveCurrentChat({receiverId: data.groupId, name: data.groupName, image: data.image})
                dispatch(currentChat)
                const center = showCenter(1)
                dispatch(center)
            })

            getUpdateGroup(data => {
                if (!data.groupName || !data.groupId || !data.image) return
                //luu thong tin nhom vua cap nhat vao redux
                const updateInfoGroup = updateInfomationGroup(data);
                dispatch(updateInfoGroup);
                const updateInfoFriend = updateInfomationFriend(data);
                dispatch(updateInfoFriend);
            })

            getAddFriend(data => {
                const friendRequest = addFriendRequest(data)
                dispatch(friendRequest)

                const updateFriendExtension = updateManagerFriend(1);
                dispatch(updateFriendExtension);
            })

            getDismissFriend(data => {
                const updateFriendExtension = updateManagerFriend(1);
                dispatch(updateFriendExtension);
            })

            getTextMessageChat((data)=> {
                const message = saveMassage(data)
                dispatch(message)
            })

            getMediaMessage(data=> {
                const message = saveMassage(data)
                dispatch(message)
            })

            getDocumentMessage(data=> {
                const message = saveMassage(data)
                dispatch(message)
            })

            getAcceptFriend(data=> {
                const friendAccept = addFriendAfterAccept(data)
                dispatch(friendAccept)

                const updateFriendExtension = updateManagerFriend(1);
                dispatch(updateFriendExtension);
            })

            getDeleteFriend(data=> {
                const friend = deleteFriend(data)
                dispatch(friend)

                const updateFriendExtension = updateManagerFriend(1);
                dispatch(updateFriendExtension);
            })

            getTextMessageChat((data) => {
                // setMessage(data)
                const message = saveMassage(data)
                dispatch(message)
            })

        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        document.getElementsByClassName('chat-wrapper')[0].setAttribute('data-theme', theme)
    }, [theme])

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/')
        }
    })

    return (
        <div className="chat-wrapper" onClick={handleClick}>
            {/* <Loader></Loader> */}
            <Notification />
            {
                displayFormExtension === 1 ?
                    <FormAdddMember />
                    :
                    displayFormExtension === 2 ?
                        <SetAvatarForm />
                        :
                        displayFormExtension === 3 ?
                            <SetNameForm />
                            :
                            displayFormExtension === 4 ?
                                <Ask /> : ''

            }
            {/* <FormAdddMember/> */}
            {
                display === 1 ?
                    <AddedFriendDialog></AddedFriendDialog>
                    :
                    display === 2 ?
                        <CreateGroup></CreateGroup>
                        :
                        display === 3 ?
                            <Profile friendProfile={isFriendProfileForm}></Profile>
                            :
                            ''
            }
            <TaskBar></TaskBar>
            <Tab></Tab>
            <Center></Center>
            {
                feature.isShow ? <Feature offset={feature.offset} group={feature.group}></Feature> : ''
            }
        </div>
    );
}

export default Chat
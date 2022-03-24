import React, { useState, useEffect } from 'react'
import Image from '../../avatar/avatar'
import './item.scss'
import $ from 'jquery'
import { useDispatch, useSelector} from 'react-redux'
import { showCenter, showFeature } from '../../../../../redux/actions/taskbar'
import { saveCurrentChat } from '../../../../../redux/actions/message'
import { sendAddFriend, sendDeleteFriend, sendDismissFriend } from '../../../../Sockets/socket-friend'
import { createRoom } from '../../../../Sockets/socket-chat'
import { updateNotification } from '../../../../../redux/actions/notification'

function Item({userId, id, name, image, addFriend = null, createGroup = null, onAddMember, members, initCheck, isFriend = 0}) {

    /*----redux----*/
    const friendIdsList = useSelector(state => state.friends.friendIdsList)
    //ket noi den redux
    const dispatch = useDispatch()
    /*----states----*/
    const [checked, setChecked] = useState(initCheck)
    const [status, setStatus] = useState(isFriend)

    /*----handles----*/
    //xu ly nhan vao item 
    const handleClickToCheckFriend = (e) => {
        if (createGroup) {
            $(e.currentTarget).find('.friend-add-friend-checkbox').attr('checked', checked ? false : true)
            setChecked(checked ? false : true)
        } else if (addFriend) {

        }
        else {
            const currentChat = saveCurrentChat({ receiverId: id, image, name, members: members })
            dispatch(currentChat)
            $(e.currentTarget).addClass('active-friend-group-item')
            for (let val of $('.friend-group-item')) {
                if (val !== e.currentTarget) {
                    $(val).removeClass('active-friend-group-item')
                }
            }
            $('#tab-wrapper').toggleClass('hide-tab-in-phones-screen')
            $('.main-chat-center').toggleClass('show-main-chat-phone-screen')
            const display = showCenter(1)
            dispatch(display)
            const dataRoom = {
                senderId: localStorage.getItem('userId'),
                receiverId: id
            }
            createRoom(dataRoom)

        }
    }
    const handleClickToAddFriend = (e)=> {
        e.preventDefault()
        setStatus(-1)
        sendAddFriend({senderId: localStorage.getItem('userId'), receiverId: userId})
        const notification = updateNotification('Gửi lời mời kết bạn thành công')
        dispatch(notification)
    }

    const handleClickToCancelFriend = (e)=> {
        setStatus(0)
        const data = {
            senderId: localStorage.getItem('userId'),
            receiverId: userId
        }
        sendDismissFriend(data)
        const notification = updateNotification('Hủy yêu cầu kết bạn thành công')
        dispatch(notification)
    }

    const handleClickToDeleteFriend = (e)=> {
        e.preventDefault()
        setStatus(0)
        const data = {
            senderId: localStorage.getItem('userId'),
            receiverId: userId,
            groupId: id
        }
        sendDeleteFriend(data)
        const notification = updateNotification('Hủy gửi lời mời thành công')
        dispatch(notification)
    }

    //xu ly show khung mo rong
    const handleClickToShowFeature = (e) => {
        e.stopPropagation()
        const top = $(window).height() <= $(e.target).offset().top + 100 ? $(e.target).offset().top - 60 : $(e.target).offset().top
        const left = $(window).width() <= $(e.target).offset().left + 100 ? $(e.target).offset().left - 180 : $(e.target).offset().left
        const feature = {
            group: id.indexOf('G') ? 0 : 1,
            isShow: 1,
            id: id,
            userId: userId,
            offset: {
                top: top,
                left: left
            }
        }
        const display = showFeature(feature)
        dispatch(display)
    }

    //xy ly thay doi checked
    const handleChangeChecked = (e) => {
        setChecked(e.target.checked)
    }

    //lifecycle

    useEffect(() => {
        if (onAddMember)
            onAddMember(checked, id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked])

    useEffect(()=> {
        setStatus(isFriend)
    }, [isFriend])

    useEffect(()=> {
        friendIdsList.forEach(value=> {
            if(value == userId)
                setStatus(1)
        })
        
    }, [friendIdsList, userId])


    return (
        <div className="friend-group-item" data-id={id} onClick={handleClickToCheckFriend}>
            <div className="friend-group-avatar">
                <Image image={image ? image : undefined} id={userId} members={members}></Image>
            </div>
            <div className="friend-group-info">
                <p className="friend-group-name">{name}</p>
            </div>
            {
                addFriend ?
                    status == 0 ?
                    <p className="friend-add-friend-btn friend-add-friend-btn-add" onClick={handleClickToAddFriend}>Kết bạn</p> : 
                    status == 1 ?
                    <p className="friend-add-friend-btn friend-add-friend-btn-cancel" onClick={handleClickToDeleteFriend}>Hủy kết bạn</p> :
                    <p className="friend-add-friend-btn friend-add-friend-btn-cancel" onClick={handleClickToCancelFriend}>Hủy yêu cầu</p> :
                    createGroup ?
                        <input type="checkbox" className="friend-add-friend-checkbox" checked={checked} onChange={handleChangeChecked} /> :
                        <>
                            <div className='tab-friend-feature-item-show other-feature' style={{ visibility: addFriend ? 'visible' : '' }} onClick={handleClickToShowFeature}>
                                {
                                    <svg
                                        className="tab-friend-feature-item-show"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        viewBox="0 0 16 16">
                                        <path className="tab-friend-feature-item-show" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                    </svg>
                                }
                            </div>
                        </>
            }
        </div>
    )
}

export default Item
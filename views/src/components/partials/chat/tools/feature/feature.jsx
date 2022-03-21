import React, { useEffect, useRef } from 'react'
import './feature.scss'
import $ from 'jquery'
import { useDispatch, useSelector } from 'react-redux'
import { saveFriendProfile, showFriendProfile } from '../../../../../redux/actions/friends'
import { showDialog, showFeature } from '../../../../../redux/actions/taskbar'
import { sendDeleteFriend } from '../../../../Sockets/socket-friend'
import { getMemberListFromGroupByGroupId } from '../../../../APIs/ConnectAPI'
import {leaveGroup } from '../../../../../redux/actions/groups'
import { updateNotification } from '../../../../../redux/actions/notification'
import { showFormFeatureExtension } from '../../../../../redux/actions/extension'

function Feature({children, offset, group}) {

    /*----redux----*/
    //lay du lieu tu redux
    const feature = useSelector(state => state.taskbar.feature)
    
    //ket noi den redux
    const dispatch = useDispatch()

    /*----refs----*/
    const ref = useRef(null)
    
    if(ref.current != null) {
        ref.current.style.display = 'none'
    }

    /*----handles----*/
    //xu ly hien thi form thong tin ca nhan 
    const handleClickToShowProfile = async ()=> {
        const result = await getMemberListFromGroupByGroupId(localStorage.getItem('userId'), feature.id)
        if(result && result.status === 200) {
            const updateFeature = showFeature({...feature, isShow: 0}) 
            dispatch(updateFeature)
            const friendProfile = saveFriendProfile(result.data.data)
            dispatch(friendProfile)
            const show = showDialog(3)
            dispatch(show)
            const display = showFriendProfile(1)
            dispatch(display)
        }
    }
    //
    const handleClickToDeleteFriend = (e)=> {
        const data = {
            senderId: localStorage.getItem('userId'),
            receiverId: feature.userId,
            groupId: feature.id
        }
        const updateFeature = showFeature({...feature, isShow: 0}) 
        dispatch(updateFeature)
        sendDeleteFriend(data)
        const notification = updateNotification('Huỷ kết bạn thành công.')
        dispatch(notification)
    }

    const handleClickToLeaveGroup = (e)=> {
        const updateFeature = showFeature({...feature, isShow: 0}) 
        dispatch(updateFeature)
        const groupId = leaveGroup(feature.id)
        dispatch(groupId)
        const displayForm = showFormFeatureExtension(4)
        dispatch(displayForm)
        const notification = updateNotification('Rời nhóm thành công.')
        dispatch(notification)
    }

    /*----lifecycle ----*/
    useEffect(()=>{
        $('.tab-item-feature').slideDown('fast')
    })

    return (
        <div ref={ref} className="tab-friend-feature-item-show tab-item-feature" style={{top: offset.top, left: offset.left + 25}}>
            {
               !group ? <p className="tab-friend-feature-item-show tab-item-feature-elm tab-item-feature-elm-1" onClick={handleClickToShowProfile}>Xem thông tin</p> : ''
            }
            {group ? <p className="tab-friend-feature-item-show tab-item-feature-elm tab-item-feature-elm-2" onClick={handleClickToLeaveGroup}>Rời nhóm</p> :
            <p className="tab-friend-feature-item-show tab-item-feature-elm tab-item-feature-elm-2" onClick={handleClickToDeleteFriend}>Hủy kết bạn</p>}
        </div>
    )
}

export default Feature
import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteFromFriendRequest } from '../../../../../../redux/actions/friends';
import { urlUserAvatar } from '../../../../../APIs/ConnectAPI';
import { sendAcceptFriend, sendDismissFriend } from '../../../../../Sockets/socket-friend';
import './item.scss'

function Item({senderId, receiverId, name, sex, image}) {

    const dispatch = useDispatch()

    const handleClickToAccept = (e)=> {
        sendAcceptFriend({senderId, receiverId})
        console.log('1')
        const friendRequest = deleteFromFriendRequest({senderId, receiverId})
        dispatch(friendRequest)
    }

    const handleClickToDismiss = (e)=> {
        sendDismissFriend({senderId, receiverId})
        const friendRequest = deleteFromFriendRequest({senderId, receiverId})
        dispatch(friendRequest)
    }

    return (
        <div className="friend-request-item-wrapper">
            <div className="friend-request-item">
            <div className="friend-request-item-avatar">
                <img src={urlUserAvatar + image} alt="" />
            </div>
            <div className="friend-request-item-info">
                <p className="friend-request-item-info-name">{name}</p>
                <p className="friend-request-item-info-sex">{sex ? 'Nữ' : 'Nam'}</p>
            </div>
            <div className="friend-request-item-btn">
                <button className="btn friend-request-item-btn-1" onClick={handleClickToDismiss}>Từ chối</button>
                <button className="btn friend-request-item-btn-2" onClick={handleClickToAccept}>Chấp nhận</button>
            </div>
        </div>
        </div>
    );
}

export default Item
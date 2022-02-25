import React from 'react'
import { useSelector } from 'react-redux'
import './friend-center.scss'
import Item from './friend-request-item/item'

function FriendCenter() {


    const friendRequestSelector = useSelector(state=>state.friends.friendRequest)

    /*----data----*/
    const items = friendRequestSelector.map((value, idx)=> {
        return (
            <Item key={idx} name={value.name} image={value.image} sex={value.sex}></Item>
        )
    })

    return (
        <div className="friend-center-wrapper">
            <p className="friend-center-title">
            <i className="fas fa-user-check"></i> Lời mời kết bạn
            </p>
            <div className="friend-center">
                {
                    items
                }
            </div>
        </div>
    );
}

export default FriendCenter;
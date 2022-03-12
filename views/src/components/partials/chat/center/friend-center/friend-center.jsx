import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveFriendRequest } from '../../../../../redux/actions/friends'
import { getFriendRequest } from '../../../../APIs/ConnectAPI'
import './friend-center.scss'
import Item from './friend-request-item/item'

function FriendCenter() {

    /*----redux----*/
    const friendRequestSelector = useSelector(state=>state.friends.friendRequest)

    const dispatch = useDispatch()
    /*----data----*/
    const items = friendRequestSelector.map((value, idx)=> {
        return (
            <Item key={idx} senderId={value.senderId} receiverId={value.receiverId} name={value.name} image={value.image} sex={value.sex}></Item>
        )
    })

    useEffect(()=>{
        (async ()=> {
            try {
                const result = await getFriendRequest(localStorage.getItem('userId'))
                if(result && result.status === 200) {
                    const friendRequestAction = saveFriendRequest(result.data.data)
                    dispatch(friendRequestAction)
                }
            }catch (err) {
                alert("Có lỗi xảy ra!")
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

export default FriendCenter
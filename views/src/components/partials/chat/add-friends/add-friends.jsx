import React from 'react'
import FriendItem from '../tabs/friend-group-items/item'
import './add-friends.scss'
import { useSelector, useDispatch } from 'react-redux'
import {showDialog}  from '../../../../redux/actions/taskbar'

function AddFriends(props) {

    //redux
    const friendsList = useSelector(state => state.friends.friendsList)
    const dispatch = useDispatch()

    const items = friendsList.map((value, idx)=>{

        const name = value.firstName && value.lastName ? `${value.lastName} ${value.firstName}` : ''

        return (
            <FriendItem key={idx} id={value.id} name={name} image={value.image} addFriend={1}></FriendItem>
        )
    })

    //handles

    const handleClickToHideAddedFriend = () => {
        const isDisplay = showDialog(0)
        dispatch(isDisplay)
    }

    return (
        <div className="add-friend-dialog-wrapper">
            <form action="">
                <div className="add-friend-dialog">
                    <p className="add-friend-dialog-title">
                        Thêm bạn
                    </p>
                    <div className="add-friend-dialog-input">
                        <input type="text" placeholder="Nhập email bạn muốn thêm."/>
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="add-friend-dialog-suggestion">
                        {
                            items    
                        }
                    </div>
                    <div className="add-friend-dialog-submit">
                        <input type="button" className="add-friend-btn add-friend-btn-cancel" value="Hủy bỏ" onClick={handleClickToHideAddedFriend}/>
                        <input type="submit" className="add-friend-btn add-friend-btn-submit" value="Tìm kiếm"/>
                    </div>
                </div>  
            </form>
        </div>
    );
}

export default AddFriends
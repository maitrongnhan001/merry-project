import React, { useEffect } from 'react'
import FriendItem from '../tabs/friend-group-items/item'
import './add-friends.scss'
import { useSelector, useDispatch } from 'react-redux'
import {showDialog}  from '../../../../redux/actions/taskbar'
import $ from 'jquery'

function AddFriends(props) {

    /*----redux----*/
    //lay du lieu tu redux
    const friendsList = useSelector(state => state.friends.friendsList)

    //ket noi voi redux
    const dispatch = useDispatch()

    /*----data----*/
    //map du lieu 
    const items = friendsList.map((value, idx)=>{

        const name = value.firstName && value.lastName ? `${value.lastName} ${value.firstName}` : ''

        return (
            <FriendItem key={idx} id={value.id} name={name} image={value.image} addFriend={1}></FriendItem>
        )
    })

    /*----handles----*/
    //xu ly an form them ban
    const handleClickToHideAddedFriend = () => {
        const isDisplay = showDialog(0)
        dispatch(isDisplay)
    }

    /*----lifecycle----*/
    useEffect(()=>{
        $('.add-friend-dialog-form').fadeTo('.5s', 1)
    })

    return (
        <div className="add-friend-dialog-wrapper" onClick={handleClickToHideAddedFriend}>
            <form action="" className="add-friend-dialog-form" onClick={(e)=>e.stopPropagation()}>
                <div className="add-friend-dialog">
                    <p className="add-friend-dialog-title">
                        Thêm bạn
                        <i className="fas fa-times" onClick={handleClickToHideAddedFriend}></i>
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
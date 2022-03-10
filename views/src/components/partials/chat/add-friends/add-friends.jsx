import React, { useEffect, useState } from 'react'
import FriendItem from '../tabs/friend-group-items/item'
import './add-friends.scss'
import { useSelector, useDispatch } from 'react-redux'
import {showDialog}  from '../../../../redux/actions/taskbar'
import $ from 'jquery'
import { getAddFriend, sendAddFriend } from '../../../Sockets/socket-friend'
import { getOthersUsers, getUserByEmail } from '../../../APIs/ConnectAPI'

function AddFriends(props) {

    /*----redux----*/
    //lay du lieu tu redux
    
    //ket noi voi redux
    const dispatch = useDispatch()
    
    /*----states----*/
    const [email, setEmail] = useState("")
    const [friendsList,setFriendList] = useState([])

    /*----data----*/
    //map du lieu 
    const items = friendsList.map((value, idx)=>{

        return (
            <FriendItem key={idx} id={value.userId ? value.userId : value.receiverId} name={value.name} image={value.image} addFriend={1}></FriendItem>
        )
    })

    /*----handles----*/
    //xu ly an form them ban
    const handleClickToHideAddedFriend = () => {
        const isDisplay = showDialog(0)
        dispatch(isDisplay)
    }

    const handleChange = (e)=> {
        const {value} = e.target
        setEmail(value)
    }

    const handleSubmitFriend = async (e)=> {
        e.preventDefault()
        try {
            const result = await getUserByEmail(localStorage.getItem('userId'), email)
            if(result && result.status === 200) {
                setFriendList(result.data.data)
            }
        }catch(err) {
            alert('Co loi xay ra!')
        }
    }

    /*----lifecycle----*/
    useEffect(()=>{
        $('.add-friend-dialog-form').fadeTo('.5s', 1)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async ()=>{
        const result = await getOthersUsers(localStorage.getItem('userId'))
        if(result && result.status === 200) {
            setFriendList(result.data.data)
        }
    },[])

    return (
        <div className="add-friend-dialog-wrapper" onClick={handleClickToHideAddedFriend}>
            <form onSubmit={handleSubmitFriend} className="add-friend-dialog-form" onClick={(e)=>e.stopPropagation()}>
                <div className="add-friend-dialog">
                    <p className="add-friend-dialog-title">
                        Thêm bạn
                        <i className="fas fa-times" onClick={handleClickToHideAddedFriend}></i>
                    </p>
                    <div className="add-friend-dialog-input">
                        <input type="text" placeholder="Nhập email bạn muốn thêm." name="email" onChange={handleChange}/>
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
import React, { useEffect } from 'react'
import './create-group.scss'
import FriendItem from '../tabs/friend-group-items/item'
import { useSelector, useDispatch } from 'react-redux'
import { showDialog } from '../../../../redux/actions/taskbar'
import { useState } from 'react'
import $ from 'jquery'

function CreateGroup(props) {

    //states
    const [group] = useState({
        name: '',
        members: [
            1231, 123
        ],
    })

    //redux
    const friendsList = useSelector(state => state.friends.friendsList)
    const dispatch = useDispatch()
    
    //handles
    const handleClickToHideCreateGroup = () =>{
        const isDisplay = showDialog(0)
        dispatch(isDisplay)
    }

    const items = friendsList.map((value, idx) => {
        const name=value.firstName && value.lastName ? `${value.lastName} ${value.firstName}` : ''
        return  (
            <FriendItem key={idx} name={name} id={value.id} image={value.image} createGroup></FriendItem>
        )
    })

    useEffect(()=>{
        console.log(group)
    }, [group])

    useEffect(()=>{
        $('.create-group-form-action').fadeTo('.5s', 1)
    })

    return (
        <div className="create-group-form-wrapper" onClick={handleClickToHideCreateGroup}>
            <form action="" className="create-group-form-action">
                <div className="create-group-form" onClick={(e)=>e.stopPropagation()}>
                    <p className="create-group-form-title">
                        Tạo nhóm
                        <i className="fas fa-times" onClick={handleClickToHideCreateGroup}></i>
                    </p>
                    <div className="create-group-form-group-info">
                        <label htmlFor="choose-group-avatar" className="create-group-change-group-avatar"><i class="fas fa-camera"></i></label>
                        <input type="file" name="" id="choose-group-avatar" style={{display: 'none'}}/>
                        <div className="create-group-form-name-group">
                            <input type="text" placeholder="Nhập tên nhóm..."/>
                        </div>
                    </div>
                    
                    <div className="create-group-form-friends-list">
                        {
                            items
                        }
                    </div>
                    <div className="create-group-form-submit">
                        <input type="button" className="create-group-form-submit-btn create-group-form-submit-btn-1" value="Hủy bỏ" onClick={handleClickToHideCreateGroup}/>
                        <input type="button" className="create-group-form-submit-btn create-group-form-submit-btn-2" value="Tạo nhóm" />
                    </div>
                </div>
            </form>
            
        </div>
    );
}

export default CreateGroup;
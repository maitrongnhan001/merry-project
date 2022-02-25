import React, { useEffect } from 'react'
import './create-group.scss'
import FriendItem from '../tabs/friend-group-items/item'
import { useSelector, useDispatch } from 'react-redux'
import { showDialog } from '../../../../redux/actions/taskbar'
import { useState } from 'react'
import $ from 'jquery'

function CreateGroup() {

    //states
    const [group, setGroup] = useState({
        name: '',
        members: [],
    })

    /*----redux----*/
    //lay du lieu tu redux
    const friendsList = useSelector(state => state.friends.friendsList)
    
    //ket noi voi redux
    const dispatch = useDispatch()
    
    /*----handles----*/

    //xu ly them vao danh sach nhom
    const handleAddMember = (checked ,id)=> {
        if(checked) {
            const data = group.members
            data.push(id)
            setGroup({
                ...group,
                members: data.sort()
            })
        }else {
            const idx = group.members.findIndex((value)=> value === id)
            const data = group.members
            data.splice(idx, 1)
            setGroup({
                ...group,
                members: data
            })
        }
    }

    //xu ly an form tao nhom
    const handleClickToHideCreateGroup = (e) =>{
        e.stopPropagation()
        const isDisplay = showDialog(0)
        dispatch(isDisplay)
    }

    /*----lifecycle----*/
    useEffect(()=>{
        console.log(group)
    }, [group])

    useEffect(()=>{
        $('.create-group-form-action').fadeTo('.5s', 1)
    })

    /*----data----*/
    //map du lieu
    const items = friendsList.map((value, idx) => {
        const name=value.firstName && value.lastName ? `${value.lastName} ${value.firstName}` : ''
        return  (
            <FriendItem key={idx} name={name} id={value.id} image={value.image} createGroup onAddMember={handleAddMember}></FriendItem>
        )
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
                        <label htmlFor="choose-group-avatar" className="create-group-change-group-avatar"><i className="fas fa-camera"></i></label>
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
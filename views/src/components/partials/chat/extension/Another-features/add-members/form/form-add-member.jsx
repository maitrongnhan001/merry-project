import React, { useEffect } from 'react'
import './form-add-member.scss'
import FriendItem from '../../../../tabs/friend-group-items/item'
import { useSelector, useDispatch } from 'react-redux'
import { updateNotification } from '../../../../../../../redux/actions/notification'
import { showFormFeatureExtension } from '../../../../../../../redux/actions/extension'
import { sendAddMember } from '../../../../../../Sockets/socket-group'
import { useState } from 'react'
import $ from 'jquery'


function FormAdddMember() {

    //states
    const [members, setMember] = useState([])

    /*----redux----*/
    //lay du lieu tu redux
    const friendsList = useSelector(state => state.friends.friendsList)
    const idGroup = useSelector(state => state.message.currentChat.receiverId)
    
    //ket noi voi redux
    const dispatch = useDispatch()
    
    /*----handles----*/

    //xu ly them vao danh sach nhom
    const handleAddMember = (checked ,id)=> {
        if(checked) {
            const data = members
            data.push(id)
            setMember(data)
        }else {
            const idx = members.findIndex((value)=> value === id)
            const data = members
            data.splice(idx, 1)
            setMember(data)
        }
    }

    //xu ly an form tao nhom
    const handleClickToHideCreateGroup = (e) =>{
        e.stopPropagation()
        const isDisplay = showFormFeatureExtension(0)
        dispatch(isDisplay)
    }

    //xu ly submits form
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            groupId: idGroup,
            members: members
        }
        await sendAddMember(data);
        //set notification
        const notification = updateNotification('Thêm thành viên thành công');
        dispatch(notification);

        //hide form
        const isDisplay = showFormFeatureExtension(0)
        dispatch(isDisplay)
    }

    useEffect(()=>{
        $('.create-group-form-action').fadeTo('.5s', 1)
    })

    useEffect(() => {}, [])

    /*----data----*/
    //map du lieu
    const items = friendsList.map((value, idx) => {
        return  (
            <FriendItem key={idx} name={value.name} id={value.id} image={value.image} createGroup onAddMember={handleAddMember}></FriendItem>
        )
    })

    return (
        <div className="extension-form-wrapper" onClick={handleClickToHideCreateGroup}>
            <form className="extension-form-action" onSubmit={handleSubmit}>
                <div className="extension-form" onClick={(e)=>e.stopPropagation()}>
                    <p className="extension-form-title">
                        Thêm thành viên
                        <i className="fas fa-times" onClick={handleClickToHideCreateGroup}></i>
                    </p>
                    <div className="extension-form-friends-list custom-form-for-add-member">
                        {
                            items
                        }
                    </div>
                    <div className="extension-form-submit">
                        <input type="button" className="extension-form-submit-btn extension-form-submit-btn-1" value="Hủy bỏ" onClick={handleClickToHideCreateGroup}/>
                        <input type="submit"  className="extension-form-submit-btn extension-form-submit-btn-2" value="Thêm thành viên" />
                    </div>
                </div>
            </form>
            
        </div>
    );
}

export default FormAdddMember;
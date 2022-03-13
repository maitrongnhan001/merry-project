import React, { useEffect } from 'react'
import './create-group.scss'
import FriendItem from '../tabs/friend-group-items/item'
import { useSelector, useDispatch } from 'react-redux'
import { saveTab, showDialog } from '../../../../redux/actions/taskbar'
import { updateUserIdWillCreateGroup } from '../../../../redux/actions/extension'
import { useState } from 'react'
import $ from 'jquery'
import { sendAddGroup } from '../../../Sockets/socket-group'

function CreateGroup() {

    //states
    const [group, setGroup] = useState({
        image: null,
        groupName: '',
        members: [],
    })

    /*----redux----*/
    //lay du lieu tu redux
    const friendsList = useSelector(state => state.friends.friendsList)
    const idUserWillCreateGroup = useSelector(state => state.extension.idUserWillCreateGroup)

    //ket noi voi redux
    const dispatch = useDispatch()

    /*----handles----*/

    //xu ly them vao danh sach nhom
    const handleAddMember = (checked, id) => {
        if (checked) {
            const data = group.members
            data.push(id)
            setGroup({
                ...group,
                members: data.sort()
            })
        } else {
            const idx = group.members.findIndex((value) => value === id)
            const data = group.members
            data.splice(idx, 1)
            setGroup({
                ...group,
                members: data
            })
        }
    }

    //xu ly an form tao nhom
    const handleClickToHideCreateGroup = (e) => {
        e.stopPropagation()
        const isDisplay = showDialog(0)
        dispatch(isDisplay)

        //clear id user will create group
        const clearUser = updateUserIdWillCreateGroup(null)
        dispatch(clearUser)
    }

    //xu ly submits form
    const handleSubmit = async (e) => {
        e.preventDefault()
        sendAddGroup(group)
        const isDisplay = showDialog(0)
        dispatch(isDisplay)
        const tab = saveTab(2)
        dispatch(tab)

        //clear id user will create group
        const clearUser = updateUserIdWillCreateGroup(null)
        dispatch(clearUser)
    }

    //xu ly file
    const handleChangeFile = (e) => {
        const file = e.target.files[0]
        setGroup({
            ...group,
            image: {
                fileName: file.name,
                file: file
            }
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setGroup({
            ...group,
            [name]: value
        })
    }

    useEffect(() => {
        $('.create-group-form-action').fadeTo('.5s', 1)
    })

    useEffect(() => {
        const id = parseInt(localStorage.getItem('userId'))
        setGroup({
            ...group,
            members: [id]
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!idUserWillCreateGroup) return

        //dua phan tu duoc chon vao trong mang group
        const id = parseInt(localStorage.getItem('userId'))
        const listMembersGroupHandle = group.members
        listMembersGroupHandle.push(id)
        listMembersGroupHandle.push(idUserWillCreateGroup)
        setGroup({
            ...group,
            members: listMembersGroupHandle.sort()
        })

    }, [idUserWillCreateGroup])

    /*----data----*/
    if (idUserWillCreateGroup) {
        for (let index = 0; index < friendsList.length; index++) {
            if (friendsList[index].id === idUserWillCreateGroup) {
                const temp = friendsList[index]
                friendsList.splice(index, 1)
                friendsList.unshift(temp)
                break
            }
        }
    }
    //map du lieu
    const items = friendsList.map((value, idx) => {
        if (idUserWillCreateGroup) {
            return (
                <FriendItem 
                    key={idx} name={value.name} id={value.id} image={value.image} createGroup 
                    onAddMember={handleAddMember} 
                    initCheck={idUserWillCreateGroup === value.id ? true : false}></FriendItem>
            )
        } else {
            return (
                <FriendItem 
                    key={idx} name={value.name} id={value.id} image={value.image} createGroup 
                    onAddMember={handleAddMember}
                    initCheck={false}></FriendItem>
            )
        }
    })

    return (
        <div className="create-group-form-wrapper" onClick={handleClickToHideCreateGroup}>
            <form className="create-group-form-action" onSubmit={handleSubmit}>
                <div className="create-group-form" onClick={(e) => e.stopPropagation()}>
                    <p className="create-group-form-title">
                        Tạo nhóm
                        <i className="fas fa-times" onClick={handleClickToHideCreateGroup}></i>
                    </p>
                    <div className="create-group-form-group-info">
                        <label htmlFor="choose-group-avatar" className="create-group-change-group-avatar"><i className="fas fa-camera"></i></label>
                        <input type="file" name="" id="choose-group-avatar" accept='image/*' style={{ display: 'none' }} onChange={handleChangeFile} />
                        <div className="create-group-form-name-group">
                            <input type="text" name="groupName" placeholder="Nhập tên nhóm..." onChange={handleChange} />
                        </div>
                    </div>

                    <div className="create-group-form-friends-list">
                        {
                            items
                        }
                    </div>
                    <div className="create-group-form-submit">
                        <input type="button" className="create-group-form-submit-btn create-group-form-submit-btn-1" value="Hủy bỏ" onClick={handleClickToHideCreateGroup} />
                        <input type="submit" className="create-group-form-submit-btn create-group-form-submit-btn-2" value="Tạo nhóm" />
                    </div>
                </div>
            </form>

        </div>
    );
}

export default CreateGroup;
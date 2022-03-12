import React, { useEffect } from 'react'
import './form-add-member.scss'
import DataLoader from '../../../../tools/data-loader/data-loader'
import FriendItem from '../../../../tabs/friend-group-items/item'
import { useSelector, useDispatch } from 'react-redux'
import { updateNotification } from '../../../../../../../redux/actions/notification'
import { showFormFeatureExtension } from '../../../../../../../redux/actions/extension'
import { sendAddMember } from '../../../../../../Sockets/socket-group'
import { getMembers } from '../../../../../../APIs/ConnectAPI'
import { useState } from 'react'
import $ from 'jquery'


function FormAdddMember() {

    //states
    const [members, setMember] = useState([])
    const [listFriendWithoutGroup, setListFriendWithoutGroup] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    /*----redux----*/
    //lay du lieu tu redux
    const friendsList = useSelector(state => state.friends.friendsList)
    const idGroup = useSelector(state => state.message.currentChat.receiverId)

    //ket noi voi redux
    const dispatch = useDispatch()

    /*----handles----*/

    //lay danh sach ban be khong thuoc nhom
    useEffect(async () => {
        if (!idGroup) return;
        setIsLoading(true);

        const result = await getMembers(idGroup)

        switch (result.status) {
            case 200: {
                const listResponeMembers = result.data.data.member
                const listFriend = friendsList
                
                const endListFriend = listFriend.filter(elementFriend => {
                    let found = true
                    for (let index of listResponeMembers) {
                        if (index.id === elementFriend.id) {
                            found = false
                        } 
                    }
                    if (found) return elementFriend
                });

                setListFriendWithoutGroup(endListFriend)
                
                //set error when array's length is 0
                const errorListFriend = (endListFriend.length === 0) ? 'Danh sách rỗng' : null
                setError(errorListFriend);

                break;
            }

            case 500: {
                setError("Có lỗi xảy ra, xin vui lòng thử lại");
                break;
            }
        }
        setIsLoading(false);
        return () => {
            setListFriendWithoutGroup([])
        };
    }, [friendsList, idGroup])

    //xu ly them vao danh sach nhom
    const handleAddMember = (checked, id) => {
        if (checked) {
            const data = members
            data.push(id)
            setMember(data)
        } else {
            const idx = members.findIndex((value) => value === id)
            const data = members
            data.splice(idx, 1)
            setMember(data)
        }
    }

    //xu ly an form tao nhom
    const handleClickToHideCreateGroup = (e) => {
        e.stopPropagation()
        const isDisplay = showFormFeatureExtension(0)
        dispatch(isDisplay)
    }

    //xu ly submits form
    const handleSubmit = async (e) => {
        e.preventDefault()

        //check group
        if (!idGroup || idGroup.indexOf('G') !== 0) return

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

    useEffect(() => {
        $('.create-group-form-action').fadeTo('.5s', 1)

        return () => {}
    })

    /*----data----*/
    //map du lieu
    const items = listFriendWithoutGroup.map((value, idx) => {
        return (
            <FriendItem key={idx} name={value.name} id={value.id} image={value.image} createGroup onAddMember={handleAddMember}></FriendItem>
        )
    })

    return (
        <div className="extension-form-wrapper" onClick={handleClickToHideCreateGroup}>
            <form className="extension-form-action" onSubmit={handleSubmit}>
                <div className="extension-form" onClick={(e) => e.stopPropagation()}>
                    <p className="extension-form-title">
                        Thêm thành viên
                        <i className="fas fa-times" onClick={handleClickToHideCreateGroup}></i>
                    </p>
                    <div className="extension-form-friends-list custom-form-for-add-member">
                        {
                            error ? <div className="text-notification center">{error}</div> : items
                        }
                        {isLoading ? <DataLoader/> : ''}
                    </div>
                    <div className="extension-form-submit">
                        <input type="button" className="extension-form-submit-btn extension-form-submit-btn-1" value="Hủy bỏ" onClick={handleClickToHideCreateGroup} />
                        <input type="submit" className="extension-form-submit-btn extension-form-submit-btn-2" value="Thêm thành viên" />
                    </div>
                </div>
            </form>

        </div>
    );
}

export default FormAdddMember;
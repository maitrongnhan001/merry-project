import React, { useEffect } from 'react'
import './set-name-form.scss'
import { useSelector, useDispatch } from 'react-redux'
import { updateNotification } from '../../../../../../../redux/actions/notification'
import { showFormFeatureExtension } from '../../../../../../../redux/actions/extension'
import { sendUpdateGroup } from '../../../../../../Sockets/socket-group'
import { useState } from 'react'
import $ from 'jquery'


function SetNameForm() {
    //-----state-----//
    const [error, setError] = useState(null)
    const [groupName, setGroupName] = useState(null)

    /*----redux----*/
    //lay du lieu tu redux
    const idGroup = useSelector(state => state.message.currentChat.receiverId)

    //ket noi voi redux
    const dispatch = useDispatch()

    /*----handles----*/
    //handle change group name
    const handleChangeGroupName = (e) => {
        if (!e) return

        const value = e.target.value
        setGroupName(value)
        setError(value.length === 0 ? 'Xin hãy nhập tên' : null)
    }

    //xu ly an form tao nhom
    const handleClickToHideForm = (e) => {
        e.stopPropagation()
        const isDisplay = showFormFeatureExtension(0)
        dispatch(isDisplay)
    }

    //xu ly submits form
    const handleSubmit = async (e) => {
        e.preventDefault()

        //if group name don't have value then return error
        if (!groupName || groupName.length === 0) {
            setError('Xin hãy nhập tên')
            return;
        }

        if (!idGroup || idGroup.indexOf('G') !== 0) return

        //send update group
        const data = {
            groupId: idGroup,
            groupName: groupName
        }

        await sendUpdateGroup(data)

        //check group
        if (!idGroup || idGroup.indexOf('G') !== 0) return
        //set notification
        const notification = updateNotification('Đổi tên nhóm thành công');
        dispatch(notification);

        //hide form
        const isDisplay = showFormFeatureExtension(0)
        dispatch(isDisplay)
    }

    useEffect(() => {
        $('.create-group-form-action').fadeTo('.5s', 1)

        return () => {}
    })

    return (
        <div className="extension-form-wrapper" onClick={handleClickToHideForm}>
            <form className="extension-form-action form-update-name-group" onSubmit={handleSubmit}>
                <div className="extension-form" onClick={(e) => e.stopPropagation()}>
                    <p className="extension-form-title">
                        Đổi tên nhóm
                        <i className="fas fa-times" onClick={handleClickToHideForm}></i>
                    </p>
                    <div className="extension-form-friends-list custom-rename">
                        <input
                            type="text"
                            className={`form-update-name-input ${error ? 'error' : ''}`}
                            placeholder='Nhập tên nhóm'
                            onChange={handleChangeGroupName}
                        />
                        <span className='text-error-rename'>{error}</span>
                    </div>
                    <div className="extension-form-submit custom-rename-group-btn">
                        <input type="button" className="extension-form-submit-btn extension-form-submit-btn-1" value="Hủy bỏ" onClick={handleClickToHideForm} />
                        <input type="submit" className="extension-form-submit-btn extension-form-submit-btn-2" value="Cập nhật" />
                    </div>
                </div>
            </form>

        </div>
    );
}

export default SetNameForm;
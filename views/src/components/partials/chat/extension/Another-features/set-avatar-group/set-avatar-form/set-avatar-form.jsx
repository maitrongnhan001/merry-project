import React, { useEffect } from 'react'
import './set-avatar-form.scss'
import { useState } from 'react'
import { showFormFeatureExtension } from '../../../../../../../redux/actions/extension'
import { updateNotification } from '../../../../../../../redux/actions/notification'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery'
import { urlUserAvatar } from '../../../../../../APIs/ConnectAPI'
import { sendUpdateGroup } from '../../../../../../Sockets/socket-group'

function SetAvatarForm() {

    /*----redux----*/
    //get data from redux
    const currentChat = useSelector(state => state.message.currentChat)
    //ket noi den redux
    const dispatch = useDispatch()

    /*---state----*/
    const [image, setImage] = useState(null)
    const [error, setError] = useState(null)
    const [reviewImage, setReviewImage] = useState(null)

    /*----handles----*/

    //handle change
    const handleChange = (e) => {
        if (!e) return

        const value = e.target.files[0]
        const type = value.type.split('/').splice(0, 1)[0]

        setImage(value)

        //review img
        if (type === 'image') {
            var File = new FileReader()
            File.readAsDataURL(value)

            File.onload = e => {
                const img_review = (<img alt={value.name} src={e.target.result} ></img>)
                setReviewImage(img_review)
            }
        }
    }

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        //if group name don't have value then return error
        if (!image) {
            setError('Xin hãy chọn hình ảnh')
            return;
        }

        if (image.size >= 1024000) {
            setError('Xin hãy chọn hình ảnh có kích thước duói 1MB')
            return;
        }

        if (!currentChat || !currentChat.receiverId || currentChat.receiverId.indexOf('G') !== 0) return

        //send update avatar group
        const data = {
            groupId: currentChat.receiverId,
            image: {
                fileName: image.name,
                file: image
            }
        }
        await sendUpdateGroup(data)
        //set notification
        const notification = updateNotification('Đổi ảnh đại diện nhóm thành công');
        dispatch(notification);

        //hide form
        const isDisplay = showFormFeatureExtension(0)
        dispatch(isDisplay)
    }

    //xu ly an form thong tin ca nhan
    const handleClickToHideForm = (e) => {
        e.stopPropagation()
        const isDisplay = showFormFeatureExtension(0)
        dispatch(isDisplay)
    }

    /*----lifecycle----*/
    useEffect(() => {
        $('.main-chat-my-profile-form').fadeTo('.5s', 1)

        return () => {}
    })

    useEffect(() => {
        if (!currentChat || !currentChat.receiverId || currentChat.receiverId.indexOf('G') !== 0) return
        const initImage = currentChat.image
        console.log(initImage)

        if (!initImage.image2)
        {
            //group has a avatar
            setReviewImage(<img src={urlUserAvatar + initImage.image1} alt="" />);
        }
        else {
            //group hasn't avatar
            setReviewImage(<img src={`/img/img-description/choose-avatar.jpeg`} alt="" />)
        }

        return () => {
            setReviewImage(null);
        }
    }, [currentChat])
    return (
        <div className="extension-form-wrapper" onClick={handleClickToHideForm}>
            <form className="extension-form-action" onSubmit={handleSubmit}>
                <div className="extension-form custom-update-avatar" onClick={(e) => e.stopPropagation()}>
                    <p className="extension-form-title">
                        Đổi ảnh đại diện nhóm
                        <i className="fas fa-times" onClick={handleClickToHideForm}></i>
                    </p>
                    <div className="extension-form-friends-list custom-avatar">
                        <div className="my-group-update-avatar">
                            <label htmlFor="my-group-change-avatar">{reviewImage}</label>
                            <input
                                type="file"
                                id="my-group-change-avatar"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                        </div>
                        <span className='text-error-avatar'>{error}</span>
                    </div>
                    <div className="extension-form-submit custom-avatar-group-btn">
                        <input type="button" className="extension-form-submit-btn extension-form-submit-btn-1" value="Hủy bỏ" onClick={handleClickToHideForm} />
                        <input type="submit" className="extension-form-submit-btn extension-form-submit-btn-2" value="Cập nhật" />
                    </div>
                </div>
            </form>

        </div>
    );
}

export default SetAvatarForm
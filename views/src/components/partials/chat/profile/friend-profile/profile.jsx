import React, { useEffect } from 'react'
import './profile.scss'
import { useDispatch } from 'react-redux' 
import $ from 'jquery'
import { showFriendProfile } from '../../../../../redux/actions/friends'
import { showDialog } from '../../../../../redux/actions/taskbar'

function Profile() {

    /*----redux----*/
    //ket noi den redux
    const dispatch = useDispatch()

    /*----handles----*/
    const handleClickToHideFriendProfile = () => {
        const show = showDialog(0)
        dispatch(show)
        const display = showFriendProfile(0)
        dispatch(display)
    }

    /*----lifecycle----*/
    useEffect(()=> {
        $('.friend-profile-dialog-form').fadeTo('.5s', 1)
    })

    return (
        <div className="friend-profile-dialog-wrapper" onClick={handleClickToHideFriendProfile}>
            <form action="" className="friend-profile-dialog-form" onClick={(e)=>e.stopPropagation()}>
                <div className="friend-profile-dialog">
                    <p className="friend-profile-dialog-title">
                        Thông tin
                        <i className="fas fa-times" onClick={handleClickToHideFriendProfile}></i>
                    </p>
                    <div className="friend-profile-scroll">
                        <div className="friend-profile-avatar-wrapper">
                            <img src="/img/cover-background/cover-background.jpg" alt="" className="friend-profile-cover-background" />
                            <div className="friend-profile-avatar">
                                <div className="friend-profile-update-avatar">
                                    <label htmlFor="friend-profile-change-avatar"><img src="/img/me.jpg" alt="" /></label>
                                    <input type="file" id="friend-profile-change-avatar" accept="image/*" style={{ display: 'none' }} />
                                </div>
                                <div className="friend-profile-update-static">
                                    <p className="friend-profile-name">Dinh Phuc Khang</p>
                                    <p className="friend-profile-email">khangphuc@gmail.com</p>
                                </div>
                            </div>
                            <div className="friend-profile-action-btn">
                                <button className="btn friend-profile-action-btn-1">Nhắn tin</button>
                                <button className="btn friend-profile-action-btn-2">Kết bạn</button>
                            </div>
                        </div>
                        <div className="friend-profile-more-info">
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                    <div className="friend-profile-bottom-btn">
                        <button>Hủy kết bạn</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Profile;
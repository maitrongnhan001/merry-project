import React, { useEffect } from 'react'
import './profile.scss'
import { useState } from 'react'
import Select from '../../tools/select/SelectTag'
import { showDialog } from '../../../../../redux/actions/taskbar'
import { useDispatch } from 'react-redux'
import $ from 'jquery'

function Profile(props) {

    //redux
    const dispatch = useDispatch()

    const date = []
    const year = []
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    for(let i = 1950; i <= new Date().getFullYear(); i++) {
        year.push(i)
    }

    const [DOB, setDOB] = useState({
        date: 8,
        month: 6,
        year: 2000
    })

    for(let i = 1; i <= new Date(DOB.year, DOB.month, 0).getDate(); i++) {
        date.push(i)
    }

    const handleChangeSelect = (name, value)=> {
        const _DOB = {
            ...DOB,
            [name]: value
        }
        setDOB(_DOB)
    }

    const handleClickToHideMyProfile = (e)=> {
        let display = showDialog(0)
            dispatch(display)
    }

    useEffect(()=> {
        $('.main-chat-my-profile-form').fadeTo('.5s', 1)
    })

    return (
        <div className="main-chat-my-profile-wrapper" onClick={handleClickToHideMyProfile}>
            <form className="main-chat-my-profile-form" onClick={(e)=>e.stopPropagation()}>
                <div className="my-profile">
                    <p className="my-profile-title">
                        Cập nhật thông tin
                        <i className="fas fa-times" onClick={handleClickToHideMyProfile}></i>
                    </p>
                    <div className="my-profile-scroll">
                        <div className="my-profile-avatar-wrapper">
                            <img src="/img/cover-background/cover-background.jpg" alt="" className="my-profile-cover-background"/>
                            <div className="my-profile-avatar">
                                <div className="my-profile-update-avatar">
                                    <label htmlFor="my-profile-change-avatar"><img src="/img/me.jpg" alt="" /></label>
                                    <input type="file" id="my-profile-change-avatar" accept="image/*" style={{display: 'none'}}/>
                                </div>
                                <div className="my-profile-update-static">
                                    <p className="my-profile-name">Dinh Phuc Khang</p>
                                    <p className="my-profile-email">khangphuc@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="my-profile-update my-profile-update-name">
                            <label htmlFor="">Tên:</label>
                            <div className="my-profile-update-name-wrapper">
                                <input type="text" className="update-name update-last-name" placeholder="Họ" />
                                <input type="text" className="update-name update-first-name" placeholder="Tên" />
                            </div>
                        </div>
                        <div className="my-profile-update my-profile-update-DOB">
                            <label htmlFor="">Ngày sinh:</label>
                            <div className="my-profile-update-DOB-wrapper">
                                <Select width={'30%'} onSelected={handleChangeSelect} name="date" option_select={date} default_value={DOB.date}></Select>
                                <Select width={'30%'} onSelected={handleChangeSelect} name="month" option_select={month} default_value={DOB.month}></Select>
                                <Select width={'30%'} onSelected={handleChangeSelect} name="year" option_select={year} default_value={DOB.year}></Select>
                            </div>
                        </div>
                        <div className="my-profile-update my-profile-update-sex">
                            <label htmlFor="">Giới tính:</label>
                            <div className="my-profile-update-sex-wrapper">
                                <div className="sex male">
                                    <input type="radio" name="sex" id="" value="1" checked/>
                                    <label htmlFor="">Nam</label>
                                </div>
                                <div className="sex female">
                                    <input type="radio" name="sex" id="" value="0" />
                                    <label htmlFor="">Nữ</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-profile-submit">
                        <input type="button" className="my-profile-btn my-profile-btn-1" value="Hủy bỏ" onClick={handleClickToHideMyProfile}/>
                        <input type="submit" className="my-profile-btn my-profile-btn-2" value="Cập nhật" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Profile
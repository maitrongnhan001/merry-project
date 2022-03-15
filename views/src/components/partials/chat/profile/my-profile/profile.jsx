import React, { useEffect } from 'react'
import './profile.scss'
import { useState } from 'react'
import Select from '../../tools/select/SelectTag'
import { showDialog } from '../../../../../redux/actions/taskbar'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery'
import { getUserById, urlUserAvatar } from '../../../../APIs/ConnectAPI'
import { sendUpdateProfile } from '../../../../Sockets/home'
import { updateNotification } from '../../../../../redux/actions/notification'

function Profile() {

    /*----redux----*/
    const currentUser = useSelector(state => state.user.currentUser)
    //ket noi den redux
    const dispatch = useDispatch()

    /*---state----*/
    const [user, setUser] = useState({
        email: '',
        name: '',
        firstName: '',
        lastName: '',
        sex: '',
        image: '',
        isSetImage: 0
    })

    const [image, setImage] = useState({})

    /*----data----*/
    const date = []
    const year = []
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    for(let i = 1950; i <= new Date().getFullYear(); i++) {
        year.push(i)
    }

    /*----states ----*/
    const [DOB, setDOB] = useState({
        date: 8,
        month: 6,
        year: 2000
    })

    for(let i = 1; i <= new Date(DOB.year, DOB.month, 0).getDate(); i++) {
        date.push(i)
    }

    /*----handles----*/
    //xu ly thay doi ngay sinh
    const handleChangeDateSelect = (name, value)=> {
        const _DOB = {
            ...DOB,
            date: value,
        }
        setDOB(_DOB)
    }

    //xu ly thay doi tháng sinh
    const handleChangeMonthSelect = (name, value)=> {
        let maxDate;
        for(let val of month) {
            if(val === parseInt(value) && name === 'month') {
                maxDate = new Date(DOB.year, val, 0).getDate()
                break
            }else {
                maxDate = DOB.date
            }
        }
        const _DOB = {
            ...DOB,
            month: value,
            date: DOB.date > maxDate ? maxDate.toString() : DOB.date
        }
        console.log(_DOB)
        setDOB(_DOB)
    }

    //xu ly thay doi name sinh
    const handleChangeYearSelect = (name, value)=> {
        let maxDate;
        for(let val of year) {
            if(val === parseInt(value) && name === 'year') {
                maxDate = new Date(val, DOB.month, 0).getDate()
                break
            }else {
                maxDate = DOB.date
            }
        }
        const _DOB = {
            ...DOB,
            year: value,
            date: DOB.date > maxDate ? maxDate.toString() : DOB.date
        }
        setDOB(_DOB)
    }

    //xu ly an form thong tin ca nhan
    const handleClickToHideMyProfile = (e)=> {
        let display = showDialog(0)
            dispatch(display)
    }

    //xu ly thay doi input
    const handleChange = (e) => {
        const {value, name} = e.target
        const newUser = {
            ...user,
            [name]: value
        }
        setUser(newUser)
    }

    const handleChangeToUpdateImage = (e)=> {
        const image = e.target.files[0]
        if(image.size >= 1000000) {
            const notification = updateNotification('Hình ảnh không được lớn hơn 1MB.')
            dispatch(notification)
        }else {
            const newUser = {
                ...user,
                image: {
                    fileName: image.name,
                    file: image
                },
                isSetImage: 1
            }
            setUser(newUser)
            setImage(URL.createObjectURL(image))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            ...user,
            image: user.isSetImage ? user.image : null,
            userId: localStorage.getItem('userId'),
            isSetImage: 0,
            DOB: `${DOB.year}-${DOB.month}-${DOB.date}`
        }
        sendUpdateProfile(data)
    }

    /*----lifecycle----*/
    useEffect(()=> {
        $('.main-chat-my-profile-form').fadeTo('.5s', 1)
    })

    useEffect(()=> {
        (async ()=>{
            try {
                const result = await getUserById(localStorage.getItem('userId'))
                if(result && result.status === 200) {
                    const newUser = {
                        firstName: result.data.data.firstName,
                        lastName: result.data.data.lastName,
                        email: result.data.data.email,
                        sex: result.data.data.sex,
                        image: result.data.data.image,
                        name: result.data.data.name
                    }
                    setUser(newUser)
                    const newDOB = {
                        date: result.data.data.date,
                        year: result.data.data.year,
                        month: result.data.data.month,
                    }
                    setDOB(newDOB)
                }
            }catch(err) {
                alert("Có lỗi xảy ra")
            }
        })()
    
    }, [])

    useEffect(()=> {
        const newUser = {
            ...user,
            name: currentUser.name
        }
        setUser(newUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    return (
        <div className="main-chat-my-profile-wrapper" onClick={handleClickToHideMyProfile}>
            <form className="main-chat-my-profile-form" onClick={(e)=>e.stopPropagation()} onSubmit={handleSubmit}>
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
                                    <label htmlFor="my-profile-change-avatar"><img src={user.isSetImage ? image : urlUserAvatar + user.image} alt="" /></label>
                                    <input type="file" id="my-profile-change-avatar" accept="image/*" style={{display: 'none'}} onChange={handleChangeToUpdateImage}/>
                                </div>
                                <div className="my-profile-update-static">
                                    <p className="my-profile-name">{user.name}</p>
                                    <p className="my-profile-email">{user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="my-profile-update my-profile-update-name">
                            <label htmlFor="">Tên:</label>
                            <div className="my-profile-update-name-wrapper">
                                <input type="text" className="update-name update-last-name" placeholder="Họ" name="lastName" value={user.lastName} onChange={handleChange}/>
                                <input type="text" className="update-name update-first-name" placeholder="Tên" name="firstName" value={user.firstName} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="my-profile-update my-profile-update-DOB">
                            <label htmlFor="">Ngày sinh:</label>
                            <div className="my-profile-update-DOB-wrapper">
                                <Select width={'30%'} onSelected={handleChangeDateSelect} name="date" option_select={date} default_value={DOB.date}></Select>
                                <Select width={'30%'} onSelected={handleChangeMonthSelect} name="month" option_select={month} default_value={DOB.month}></Select>
                                <Select width={'30%'} onSelected={handleChangeYearSelect} name="year" option_select={year} default_value={DOB.year}></Select>
                            </div>
                        </div>
                        <div className="my-profile-update my-profile-update-sex">
                            <label htmlFor="">Giới tính:</label>
                            <div className="my-profile-update-sex-wrapper">
                                <div className="sex male">
                                    <input type="radio" name="sex" id="" value="0" checked={parseInt(user.sex) === 0} onChange={handleChange}/>
                                    <label htmlFor="">Nam</label>
                                </div>
                                <div className="sex female">
                                    <input type="radio" name="sex" id="" value="1" checked={parseInt(user.sex) === 1} onChange={handleChange}/>
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
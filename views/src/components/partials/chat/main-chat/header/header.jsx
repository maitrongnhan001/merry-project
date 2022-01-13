import React from 'react'
import './header.scss'
import Image from '../../avatar/avatar'
import {showExtension} from '../../../../../redux/actions/extension'
import {useSelector, useDispatch} from 'react-redux'

function Header(props) {
    
    //redux
    const isShowExtension = useSelector(state => state.extension.isShow)
    const dispatch = useDispatch()

    const user = {
        id: '1',
        firstName: 'Phuc Khang',
        lastName: 'Dinh',
        image: '/img/me.jpg'
    }

    const name = `${user.lastName} ${user.firstName}`

    //handles

    const handleClickShowExtension = (e)=>{
        const isShow = showExtension(isShowExtension === 0 ? 1 : 0)
        dispatch(isShow)
    }

    return (
        <div className="main-chat-header-wrapper">
            <div className="main-chat-header-receiver-info">
                <div className="main-chat-header-receiver-avatar">
                    <Image image={user.image}></Image>
                </div>
                <div className="main-chat-header-receiver-text">
                    <p className="main-chat-header-username">{name}</p>
                    <p className="main-chat-header-active">Đang hoạt động</p>
                </div>
            </div>
            <div className="main-chat-header-tools">
                <i className="fas fa-search"></i>
                <i className="fas fa-phone"></i>
                <i className="fas fa-video"></i>
                <i className="fas fa-bars" onClick={handleClickShowExtension}></i>
            </div>
        </div>
    )
}

export default Header
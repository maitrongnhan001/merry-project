import React from 'react'
import './header.scss'
import Image from '../../avatar/avatar'
import SearchBox from './search-message/search-message'
import {showExtension} from '../../../../../redux/actions/extension'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import $ from 'jquery'
import { showFriendProfile } from '../../../../../redux/actions/friends'
import { showDialog } from '../../../../../redux/actions/taskbar'

function Header({image, name}) {
    
    /*----redux----*/
    //lay du lieu tu redux
    const isShowExtension = useSelector(state => state.extension.isShow)
    
    //ket noi den redux
    const dispatch = useDispatch()

    /*----states----*/
    const [isShowSearchBox, setIsShowSearchBox]  = useState(0)

    /*----handles ----*/
    //xu ly an hien extension
    const handleClickShowExtension = (e)=>{
        e.stopPropagation();
        const isShow = showExtension(isShowExtension === 0 ? 1 : 0)
        dispatch(isShow)
    }

    //xu ly an hien khung tim kiem tin nhan
    const handleShowSearchMessageBox = (isShow)=> {
        setIsShowSearchBox(isShow)
    }

    //xu ly an hien form thong tin ca nhan
    const handleClickToShowProfile = ()=> {
        const show = showDialog(3)
        dispatch(show)
        const display = showFriendProfile(1)
        dispatch(display)
        
    }

    /*----lifecycle----*/
    useEffect(()=>{
        if(isShowExtension === 1) {
            $('.main-chat-header-wrapper .fa-bars').css('background', '#5b67ee49')
        }else {
            $('.main-chat-header-wrapper .fa-bars').css('background', 'none')
        }
    }, [isShowExtension])

    useEffect(()=>{
        if(isShowSearchBox === 1) {
            $('.main-chat-header-wrapper .main-chat-header-box .fa-search').css('background', '#5b67ee49')
        }else {
            $('.main-chat-header-wrapper .main-chat-header-box .fa-search').css('background', 'none')
        }
    }, [isShowSearchBox])

    return (
        <>
            <div className="main-chat-header-wrapper">
                <div className="main-chat-header-box">
                    <div className="main-chat-header-receiver-info">
                        <div className="main-chat-header-receiver-avatar" onClick={handleClickToShowProfile}>
                            <Image image={image}></Image>
                        </div>
                        <div className="main-chat-header-receiver-text">
                            <p className="main-chat-header-username">{name}</p>
                            <p className="main-chat-header-active">Đang hoạt động</p>
                        </div>
                    </div>
                    <div className="main-chat-header-tools">
                        <i className="fas fa-search"  onClick={()=>{$('.search-message-wrapper').slideToggle('.25s'); setIsShowSearchBox(isShowSearchBox ? 0 : 1)}}></i>
                        <i className="fas fa-phone"></i>
                        <i className="fas fa-video"></i>
                        <i className="fas fa-bars" onClick={handleClickShowExtension}></i>
                    </div>
                </div>
                <SearchBox onShowSearchMessageBox={handleShowSearchMessageBox}></SearchBox>
            </div>
            
        </>
    )
}

export default React.memo(Header)
import React, { useEffect } from 'react';
import Image from '../../avatar/avatar';
import './header-extension.scss';
import { useSelector } from 'react-redux';

const HeaderExtension = () => {

    //--------get data from redux----------//
    const currentChat = useSelector(state => state.message.currentChat);
    
    //--------------------localstorage-----------------------//
    const userId = localStorage.getItem('userId');

    return (
        <div className='extension-header'>
            <div className="extension-header-avatar">
                <Image image={currentChat.image} id={userId} ></Image>
            </div>

            <p className='name-user-extension'>{currentChat.name}</p>
        </div>
    );
}

export default HeaderExtension;
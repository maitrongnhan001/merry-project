import React from 'react'
import './item.scss'
import Image from '../../../avatar/avatar'
import { useDispatch } from 'react-redux';
import { showCenter } from '../../../../../../redux/actions/taskbar';
import $ from 'jquery'
import { createRoom, getRoom } from '../../../../../Sockets/socket-chat';
import { listenSocket, sendSocket } from '../../../../../Sockets/socket-config';

function Item({id, image, lastName, firstName}) {

    /*----redux----*/
    //ket noi den redux
    const dispatch = useDispatch()

    /*----handles----*/
    //xu ly hien thi chat item  
    const handleClickToShowChat = async (e)=> {
        const display = showCenter(1)
        dispatch(display)
        $(e.currentTarget).addClass('active-friend-group-item')
        for(let val of $('.tab-chat-item')) {
            if(val !== e.currentTarget) {
                $(val).removeClass('active-friend-group-item')
            }
        }
        $('#tab-wrapper').toggleClass('hide-tab-in-phones-screen')
        $('.main-chat-center').toggleClass('show-main-chat-phone-screen')
    }

    return (
        <div className="tab-chat-item" data-id={id} onClick={handleClickToShowChat}>
            <div className="tab-chat-avatar">
                <Image image={image}></Image>
            </div>
            <div className="tab-chat-info">
                <p className="tab-chat-name">{lastName + ' ' + firstName}</p>
                <p className="tab-chat-content">Hi! My name is Khang. What can I help you ?</p>
            </div>
        </div>
    );
}

export default Item;
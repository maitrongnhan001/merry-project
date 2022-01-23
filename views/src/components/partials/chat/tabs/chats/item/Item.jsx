import React from 'react'
import './item.scss'
import Image from '../../../avatar/avatar'
import { useDispatch } from 'react-redux';
import { showCenter } from '../../../../../../redux/actions/taskbar';
import $ from 'jquery'

function Item(props) {

    //redux
    const dispatch = useDispatch()

    //handles  
    const handleClickToShowChat = ()=> {
        const display = showCenter(1)
        dispatch(display)
        $('#tab-wrapper').toggleClass('hide-tab-in-phones-screen')
        $('.main-chat-center').toggleClass('show-main-chat-phone-screen')
    }

    return (
        <div className="tab-chat-item" data-id={props.id} onClick={handleClickToShowChat}>
            <div className="tab-chat-avatar">
                <Image image={props.image}></Image>
            </div>
            <div className="tab-chat-info">
                <p className="tab-chat-name">{props.lastName + ' ' + props.firstName}</p>
                <p className="tab-chat-content">Hi! My name is Khang. What can I help you ?</p>
            </div>
        </div>
    );
}

export default Item;
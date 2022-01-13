import React from 'react'
import './item.scss'
import Image from '../../../avatar/avatar'

function Item(props) {
    return (
        <div className="tab-chat-item" data-id={props.id}>
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
import React from 'react'
import './item.scss'
import Image from '../../avatar/avatar'

function Item(props) {
    return (
        <div className="tab-chat-item">
            <div className="tab-chat-avatar">
                <Image image={props.image}></Image>
            </div>
            <div className="tab-chat-info">
                <p className="tab-chat-name">{props.lastName + ' ' + props.firstName}</p>
                <p className="tab-chat-content">Hello!dasdsadsadsadsadsadsadsadsad</p>
            </div>
        </div>
    );
}

export default Item;
import React from 'react'
import Image from '../../avatar/avatar'
import './item.scss'

function Item(props) {
    return (
        <div className="friend-group-item" data-id={props.id}>
            <div className="friend-group-avatar">
                <Image image={props.image ? props.image : undefined}></Image>
            </div>
            <div className="friend-group-info">
                <p className="friend-group-name">{props.name}</p>
            </div>
        </div>
    )
}

export default Item
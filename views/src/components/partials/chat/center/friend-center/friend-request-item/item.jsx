import React from 'react'
import { urlUserAvatar } from '../../../../../APIs/ConnectAPI';
import './item.scss'

function Item({name, sex, image}) {
    return (
        <div className="friend-request-item-wrapper">
            <div className="friend-request-item">
            <div className="friend-request-item-avatar">
                <img src={urlUserAvatar + image} alt="" />
            </div>
            <div className="friend-request-item-info">
                <p className="friend-request-item-info-name">{name}</p>
                <p className="friend-request-item-info-sex">{sex ? 'Nữ' : 'Nam'}</p>
            </div>
            <div className="friend-request-item-btn">
                <button className="btn friend-request-item-btn-1">Từ chối</button>
                <button className="btn friend-request-item-btn-2">Chấp nhận</button>
            </div>
        </div>
        </div>
    );
}

export default Item
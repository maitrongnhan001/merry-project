import React from 'react'
import './friend-center.scss'
import Item from './friend-request-item/item'

function FriendCenter(props) {

    const list = [
        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },


        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },


        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },


        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },


        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },


        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },


        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },

        {
            id: 1,
            name: 'Dinh Phuc Khang',
            image: '/img/me.jpg',
            sex: 1
        },
    ]

    const items = list.map((value, idx)=> {
        return (
            <Item key={idx} name={value.name} image={value.image} sex={value.sex}></Item>
        )
    })

    return (
        <div className="friend-center-wrapper">
            <p className="friend-center-title">
            <i className="fas fa-user-check"></i> Lời mời kết bạn
            </p>
            <div className="friend-center">
                {
                    items
                }
            </div>
        </div>
    );
}

export default FriendCenter;
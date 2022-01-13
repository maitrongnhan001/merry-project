import React from 'react'
import './chat.scss'
import Item from './item/Item'
import {useSelector} from 'react-redux'

function Chats(props) {
    //redux

    const chatsList = useSelector(state => state.friends.chatsList)

    const items = chatsList.map((value, idx)=>{
        return (
            <Item key={idx} image={value.image} firstName={value.firstName} lastName={value.lastName}></Item>
        )
    })

    return (
        <div className="tab-chat">
            {
                items
            }
        </div>
    );
}

export default React.memo(Chats)
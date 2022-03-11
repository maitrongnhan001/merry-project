import React, { useEffect } from 'react'
import './chat.scss'
import Item from './item/Item'
import {useSelector} from 'react-redux'

function Chats() {

    /*----redux----*/
    //lay du lieu tu redux
    const chatsList = useSelector(state => state.friends.chatsList)

    /*----data----*/
    const items = chatsList.map((value, idx)=>{
        console.log(value);
        return (
            <Item key={idx} id={value.receiverId} image={value.image} name={value.receiverName} lastMessage={value.lastMessage}></Item>
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
import React from 'react'
import './chat.scss'
import Item from './item/Item'
import {useSelector} from 'react-redux'

function Chats() {

    /*----redux----*/
    //lay du lieu tu redux
    const chatsList = useSelector(state => state.friends.chatsList)

    /*----data----*/
    const items = chatsList.map((value, idx)=>{
        return (
            <Item key={idx} id={value.receiverId} members={value.members} image={value.image} name={value.receiverName} lastMessage={value.lastMessage}></Item>
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
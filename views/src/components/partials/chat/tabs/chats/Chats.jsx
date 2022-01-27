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
            <Item key={idx} id={value.id} image={value.image} firstName={value.firstName} lastName={value.lastName}></Item>
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
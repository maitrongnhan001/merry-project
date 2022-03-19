import React, { useEffect } from 'react'
import './item.scss'
import Image from '../../../avatar/avatar'
import { useDispatch, useSelector} from 'react-redux';
import { showCenter } from '../../../../../../redux/actions/taskbar';
import $ from 'jquery'
import { saveCurrentChat } from '../../../../../../redux/actions/message';
import { createRoom } from '../../../../../Sockets/socket-chat';

function Item({id, members, image, name, lastMessage, status}) {

    /*----redux----*/
    //ket noi den redux
    const currentChatSelector = useSelector(state => state.message.currentChat)
    const dispatch = useDispatch()
   


    /*----handles----*/
    //xu ly hien thi chat item  
    const handleClickToShowChat = async (e)=> {
        const currentChat = saveCurrentChat({receiverId: id, image, name, members: members})
        dispatch(currentChat)
        const display = showCenter(1)
        dispatch(display)
        $(e.currentTarget).addClass('active-friend-group-item')
        for(let val of $('.tab-chat-item')) {
            if(val !== e.currentTarget) {
                $(val).removeClass('active-friend-group-item')
            }
        }
        $('#tab-wrapper').toggleClass('hide-tab-in-phones-screen')
        $('.main-chat-center').toggleClass('show-main-chat-phone-screen')
        const dataRoom = {
            senderId: localStorage.getItem('userId'),
            receiverId: id
        }
        createRoom(dataRoom)
    }

    useEffect(()=> {
        if(currentChatSelector.receiverId === id) {
            for(let val of $('.tab-chat-item')) {
                if(val.getAttribute('data-id') === id.toString()) {
                    val.classList.add('active-friend-group-item')
                }else{
                    val.classList.remove('active-friend-group-item')
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChatSelector, id])

    const style = {
        color: ['Đã nhận', 'Đã gửi'].includes(lastMessage.status) && !lastMessage.isSender && currentChatSelector.receiverId != id ? "#5865F2" : '',
        fontWeight: ['Đã nhận', 'Đã gửi'].includes(lastMessage.status) && !lastMessage.isSender && currentChatSelector.receiverId != id ? "bold" : '',
    }

    return (
        <div className="tab-chat-item" data-id={id} onClick={handleClickToShowChat}>
            <div className="tab-chat-avatar">
                <Image image={image} id={id} members={members}></Image>
            </div>
            <div className="tab-chat-info">
                <p className="tab-chat-name">{name}</p>
                <p className="tab-chat-content" style={style}> {lastMessage.isSender ? 'Bạn: ' : ''} {lastMessage.type === 'text' ? lastMessage.content : 'Đã gửi 1 tệp.'}</p>
            </div>
            <div className="tab-chat-new-status" style={{visibility: ['Đã nhận', 'Đã gửi'].includes(lastMessage.status) && !lastMessage.isSender && currentChatSelector.receiverId != id ? "" : "hidden"}}>N</div>
        </div>
    );
}

export default Item;
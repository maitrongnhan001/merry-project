import React, { useEffect } from 'react'
import './item.scss'
import Image from '../../../avatar/avatar'
import { useDispatch, useSelector} from 'react-redux';
import { showCenter } from '../../../../../../redux/actions/taskbar';
import { updateIdHeader } from '../../../../../../redux/actions/extension';
import $ from 'jquery'
import { saveCurrentChat } from '../../../../../../redux/actions/message';
import { createRoom } from '../../../../../Sockets/socket-chat';

function Item({id, image, name, lastMessage}) {

    /*----redux----*/
    //ket noi den redux
    const currentChatSelector = useSelector(state => state.message.currentChat)

    const dispatch = useDispatch()

    /*----handles----*/
    //xu ly hien thi chat item  
    const handleClickToShowChat = async (e)=> {
        const currentChat = saveCurrentChat({receiverId: id, image, name})
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

        console.log(dataRoom)
        createRoom(dataRoom)
    }

    const updateIdExtensionHeader = () => {
        const data = updateIdHeader(id);
        dispatch(data)
    }

    const GenneralHandleClickItem = (e) => {
        handleClickToShowChat(e);
        updateIdExtensionHeader();
    }

    useEffect(()=> {
        if(currentChatSelector.receiverId === id) {
            for(let val of $('.tab-chat-item')) {
                if(val.getAttribute('data-id') === id.toString()) {
                    val.classList.add('active-friend-group-item')
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChatSelector])

    return (
        <div className="tab-chat-item" data-id={id} onClick={GenneralHandleClickItem}>
            <div className="tab-chat-avatar">
                <Image image={image}></Image>
            </div>
            <div className="tab-chat-info">
                <p className="tab-chat-name">{name}</p>
                <p className="tab-chat-content"> {lastMessage.isSender ? 'Bạn: ' : ''} {lastMessage.type === 'text' ? lastMessage.content : 'Đã gửi 1 tệp.'}</p>
            </div>
        </div>
    );
}

export default Item;
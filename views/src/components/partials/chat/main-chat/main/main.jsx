import React, { useState } from 'react'
import './main.scss'
import Message from './messages/message'

function Main() {

    /*----states----*/
    //tin nhan da gui, nhan
    const [message,setMessage] = useState({
        messageId: '',
        senderId: 0,
        receiverId: '',
        message: 
        {
            type: 'text',
            content: '',
            time: 0,
            status: 'đã gửi'
        }
    }) 

    /*----lifecycle----*/
    // useEffect(() => {
    //     (async function () {
    //         const result = await listenSocket('send-text-message')
    //         setMessage(result)
    //     })()
    // }, [])

    return (
        <div className="main-chat-chat-area">
            <div className="main-chat-chat-area-wrapper">
                <Message sender={0}><p>Ngu</p></Message>
                <Message sender={0}><p>Ngu</p></Message>                
                <Message sender={0}><p>Ngu</p></Message>
                <Message sender={0}><p>Ngu</p></Message>
                <Message next={0}><p>Hie</p></Message>
                <Message next={0}><p>alo</p></Message>
                <Message next={0}><p>co do hong</p></Message>
                <Message next={1}><p>ui</p></Message>
                <Message sender={0}><p>dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r </p></Message>
                <Message next={0}><p>doi hoi lau nha</p></Message>
                <Message next={0}><p>gion mat ha</p></Message>
                <Message next={0}><p>dam cai chet a</p></Message>
                <Message next={0}><p>aloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo</p></Message>
                <Message next={0}><p>alo</p></Message>
                <Message next={0}><p>ek</p></Message>
                <Message next={1}><img src="/img/me.jpg" alt="" /></Message>
                <Message sender={0}><img src="/img/me.jpg" alt="" /></Message>
                <Message sender={0}><img src="/img/Logos/logo-merry-chat.png" alt="" /></Message>
                <Message sender={0}><a href="https://www.messenger.com/t/4315663628493165" rel="noreferrer" target='_blank'><p>https://www.messenger.com/t/4315663628493165</p></a></Message>
            </div>
        </div>
    );
}

export default React.memo(Main);
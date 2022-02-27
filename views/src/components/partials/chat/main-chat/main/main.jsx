import React, { useState, useEffect } from 'react'
import './main.scss'
import Message from './messages/message'
import Document from './messages/document/document'
import DataLoader from '../../tools/data-loader/data-loader'
import { getContentChat } from '../../../../APIs/ConnectAPI'
import { getTextMessageChat } from '../../../../Sockets/socket-chat'

function Main({id}) {

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
    
    const [messageList, setMessageList] = useState([])

    /*----lifecycle----*/
    useEffect(() => {
        (async ()=> {
            const result = await getContentChat(localStorage.getItem('userId'), id)
            if (result && result.status === 200) {
                setMessageList(result.data.data.message)
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(()=> {
        getTextMessageChat((data)=> {
            console.log('hello')
            console.log(data)
            setMessage(data)
        })   
    })

    const data = messageList.map((value, idx)=> {
        let message
        let style = {
            // eslint-disable-next-line eqeqeq
            color: value.senderId == localStorage.getItem('userId') ? 'white' : ''
        }
        switch(value.type) {
            case "document": {
                message = (<Document color={style.color}>{value.content}</Document>)
                break
            }
            case "link" : {
                
                message = (<a style={{color: style.color}} href={value.content} rel="noreferrer" target='_blank'>{value.content}</a>)
                break
            }
            case "media" : {
                message = (<img src={value.content} alt="Chua co anh"/>)
                break
            }
            default: {
                message = (<p>{value.content}</p>)
            }
        }

        const next = messageList[idx + 1]  && messageList[idx + 1].senderId === value.senderId ? 0 : 1
        return (
            // eslint-disable-next-line eqeqeq
            <Message  key ={idx} sender={value.senderId == localStorage.getItem('userId') ? 0 : 1} next={next} date={value.time}>{message}</Message>
        )
    })

    return (
        <div className="main-chat-chat-area">
            <div className="main-chat-chat-area-wrapper">
                {data}
                {/* <DataLoader></DataLoader> */}
            </div>
        </div>
    );
}

export default React.memo(Main);
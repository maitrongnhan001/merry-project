import React, { useState, useEffect } from 'react'
import './main.scss'
import Message from './messages/message'
import Document from './messages/document/document'
import DataLoader from '../../tools/data-loader/data-loader'
import { getContentChat, getUserById } from '../../../../APIs/ConnectAPI'
import { getTextMessageChat, getTextMessageChatX } from '../../../../Sockets/socket-chat'

const isType = (value, style) => {
    switch(value.type) {
        case "document": {
            return (<Document color={style.color}>{value.content}</Document>)
           
        }
        case "link" : {
            return (<a style={{color: style.color}} href={value.content} rel="noreferrer" target='_blank'>{value.content}</a>)
        }
        case "media" : {
            return (<img src={value.content} alt="Chua co anh"/>)
        }
        default: {
            return (<p>{value.content}</p>)
        }
    }

}

function Main({id}) {

    /*----states----*/
    //tin nhan da gui, nhan
    const [message,setMessage] = useState(null
        // messageId: '',
        // senderId: 0,
        // receiverId: '',
        // message: 
        // {
        //     type: 'text',
        //     content: '',
        //     time: 0,
        //     status: 'đã gửi'
        // }
    )

    const [messageStateList, setMessageStateList] = useState([])
    const [dataState, setDataState] = useState(null)
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
            console.log(data)
            setMessage(data)
        })  
    }, [])

    useEffect(()=> {
        let newList = messageStateList
        if(message !== null)
            newList.unshift(message)
        setMessageStateList(newList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    useEffect(()=> {
        const result = messageStateList.map((value, idx) => {
            let style = {
                // eslint-disable-next-line eqeqeq
                color: value.senderId == localStorage.getItem('userId') ? 'white' : ''
            }    
            const message = isType(value.message, style)
            const next = messageList[idx + 1]  && messageList[idx + 1].senderId === value.senderId ? 0 : 1
            let image = 'image-1.jpg'
            return (
                // eslint-disable-next-line eqeqeq
                <Message  key ={idx} image={image} sender={value.senderId == localStorage.getItem('userId') ? 0 : 1} next={next} date={value.time}>{message}</Message>
            )
        })
        setDataState(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    const data = messageList.map((value, idx)=> {
        let style = {
            // eslint-disable-next-line eqeqeq
            color: value.senderId == localStorage.getItem('userId') ? 'white' : ''
        }
        const message = isType(value, style)
        let image = 'image-1.jpg'
        const next = messageList[idx + 1]  && messageList[idx + 1].senderId === value.senderId ? 0 : 1
        return (
            // eslint-disable-next-line eqeqeq
            <Message  key ={idx} image={image} sender={value.senderId == localStorage.getItem('userId') ? 0 : 1} next={next} date={value.time}>{message}</Message>
        )
    })

    return (
        <div className="main-chat-chat-area">
            <div className="main-chat-chat-area-wrapper">
                {dataState}
                {data}
                {/* <DataLoader></DataLoader> */}
            </div>
        </div>
    );
}

export default React.memo(Main);
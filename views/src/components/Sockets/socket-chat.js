import { sendSocket, listenSocketOneTime, listenSocket } from "./socket-config"

const sendTextMessage = (data)=> {
    sendSocket('send-text-message', data)
}

const sendMediaMessage = (data)=> {
    sendSocket('send-media-message', data)
}

const sendDocumentMessage = (data)=> {
    sendSocket('send-document-message', data)
}

const sendEmotionMessage = (data)=> {
    sendSocket('emotion', data)
}

const createRoom = (data)=> {
    sendSocket('create-room', data)
}

const getTextMessage = async ()=> {
    return await listenSocketOneTime('send-text-message')
}

const getTextMessageChat = (cb)=> {
    listenSocket('send-text-message', cb)
}

const getTextMessageChatX = async ()=> {
    return await listenSocketOneTime('send-message-message')
}

const getMediaMessage = async ()=> {
    return await listenSocketOneTime('send-media-message')
}

const getDocumentMessage = async ()=> {
    return await listenSocketOneTime('send-document-message')
}

const getEmotionMessage = async ()=> {
    return await listenSocketOneTime('emotion')
}

const getRoom = (cb)=> {
    listenSocket('create-room', cb)
}

export {
    sendTextMessage,
    sendMediaMessage,
    sendDocumentMessage,
    sendEmotionMessage,
    getTextMessage,
    getMediaMessage,
    getDocumentMessage,
    getEmotionMessage,
    createRoom,
    getRoom,
    getTextMessageChat,
    getTextMessageChatX
}
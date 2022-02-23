import { sendSocket, listenSocketOneTime } from "./socket-config"

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

const createRoom = async (data)=> {
    sendSocket('create-room', data)
}

const getTextMessage = async ()=> {
    return await listenSocketOneTime('send-text-message')
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

const getRoom = async ()=> {
    return await listenSocketOneTime('create-room')
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
}
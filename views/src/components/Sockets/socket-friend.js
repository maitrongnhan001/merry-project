import { sendSocket, listenSocket } from './socket-config'

const sendAddFriend = (data)=> {
    sendSocket('add-friend', data)
}

const sendAcceptFriend = (data)=> {
    sendSocket('accept-friend', data)
}

const sendDismissFriend = (data)=> {
    sendSocket('dismiss-friend', data)
}

const sendDeleteFriend = (data)=> {
    sendSocket('delete-friend', data)
}

const getAddFriend = async ()=> {
    return await listenSocket('add-friend')
}

const getAcceptFriend = async ()=> {
    return await listenSocket('accept-friend')
}

const getDismissFriend = async ()=> {
    return await listenSocket('dismiss-friend')
}

const getDeleteFriend = async ()=> {
    return await listenSocket('delete-friend')
}

export {
    sendAddFriend,
    sendAcceptFriend,
    sendDismissFriend,
    sendDeleteFriend,
    getAddFriend,
    getAcceptFriend,
    getDismissFriend,
    getDeleteFriend
}
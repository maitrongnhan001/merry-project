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

const getAddFriend = (callBack)=> {
    listenSocket('add-friend', callBack)
}

const getAcceptFriend = (cb)=> {
    listenSocket('accept-friend', cb)
}

const getDismissFriend = (cb)=> {
    listenSocket('dismiss-friend', cb)
}

const getDeleteFriend = (cb)=> {
    listenSocket('delete-friend', cb)
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
const { sendSocket, listenSocket } = require('./socket-connection-call')

//connect socket in incall component
const sendConnection = (callId, userId) => {
    sendSocket('join-room', {receiverId: callId, userId: userId})
}

const sendFirstConnection = (callId, userId) => {
    sendSocket('first-join', {receiverId: callId, userId: userId})
}

export {
    sendConnection,
    sendFirstConnection
}
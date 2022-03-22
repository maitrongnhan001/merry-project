const { sendSocket, listenSocket } = require("./socket-config")

const sendCall = (data) => {
    sendSocket('call', data)
}

const sendCallUp = (data) => {
    sendSocket('call-up', data)
}

const sendCallDown = (data) => {
    sendSocket('call-down', data)
}

const getCall = (cb) => {
    listenSocket('call', cb)
}

const getCallUp = (cb) => {
    listenSocket('call-up', cb)
}

const getCallDown = (cb) => {
    listenSocket('call-down', cb)
}

const getUserCallDisconnected = (cb) => {
    listenSocket('user-call-disconnected', cb)
}

export {
    sendCall,
    sendCallUp,
    sendCallDown,
    getCall,
    getCallUp,
    getCallDown,
    getUserCallDisconnected
}
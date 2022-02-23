import {connect} from 'socket.io-client'

const server = 'http://localhost:8000/'

const socket = connect(server);

const connection = ()=> {
    connect(server)
}

const sendSocket = (event, data)=> {
    socket.emit(event, data)  
}

const listenSocketOneTime = (event)=> {
    return new Promise ((resolve, reject)=> {
        socket.on(event, (data, err)=> {
            if(data) resolve(data)
            reject(err)
        })
    })
}

const listenSocket = (event, Callback) => {
    /* 
    this function run every time
    and update data through callback
    */
    socket.on(event, data => {
        if (data) Callback(data)
    })
}

export  {
    sendSocket,
    listenSocketOneTime,
    listenSocket
}

export default connection
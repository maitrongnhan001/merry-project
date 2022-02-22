import {connect} from 'socket.io-client'

const server = 'http://localhost:8000/'

const socket = connect(server);

const connection = ()=> {
    connect(server)
}

const sendSocket = (event, data)=> {
    socket.emit(event, data)  
}

const listenSocket = (event)=> {
    return new Promise ((resolve, reject)=> {
        socket.on(event, (data, err)=> {
            if(data) resolve(data)
            reject(err)
        })
    })
}

export  {
    sendSocket,
    listenSocket
}

export default connection
import { io} from 'socket.io-client'

const server = 'http://localhost:8000/'

const socket = io(server);

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

export default socket
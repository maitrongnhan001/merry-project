import { connect } from 'socket.io-client'

const server = 'http://localhost:8000/'

//connect to server
const getConnection = ()=>{
    connect(server)
}

export  {
    getConnection
}
const express = require('express')
const app = express()
const { ExpressPeerServer } = require('peer');
const server = require('http').Server(app);
require('dotenv').config()
const io = require('socket.io')(server);
const port = process.env.CALL_PORT || 8001
const { isAuthSocket } = require('./middlewares/authSocket.middleware');

//----------------socket-----------------//
io.use(isAuthSocket)

io.on('connection', socket => {
    socket.on('join-room', (data) => {
        const roomId = data.roomId || null;
        const userId = data.userId || null;
        if (!roomId || !userId) {
            return socket.emit({message: "không có dữ liệu"});
        }

        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);


        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId);
        })
    })
})
//--------------end socket--------------//

//----------------peer-----------------//
const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.use('/peerjs', peerServer);
//--------------end peer-----------------//

//----------------listen-----------------//
server.listen(port , ()=> console.log('> Server is up and running on port : ' + port))
//--------------end listen-----------------//


 
//----------------require extensions-----------------//
require('dotenv').config();
const server = require("http").createServer();
const { connect } = require('./config/database.js');
const userLogin = require('./stores/UserLoginStore');
connect();

//-------------end require extensions-----------------//

//----------------require middlewares-----------------//
const { isAuthSocket } = require('./middlewares/authSocket.middleware');

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        //test socket
        //origin: "http://127.0.0.1:5500"
        //real socket
        //origin: "http://localhost:3000"
    }
});

io.use(isAuthSocket)

io.on('connection', socket => {
    console.log('Hello');
    socket.on('join-room', (data) => {
        receiverId = data.receiverId;
        userId = data.userId;

        if (!receiverId || !userId) return socket.emit('user-connected', {status: false})

        socket.join(receiverId)
        socket.to(receiverId).emit('user-connected', userId);

        console.log('join room');

        socket.on('disconnect', async () => {

            console.log('disconnect');
            const userSocket = await userLogin.getUserSocket(userId);
            console.log(userId, userSocket);
            userSocket.to(receiverId).emit('user-call-disconnected', {
                receiverId: receiverId,
                userId: userId
            });
        })
    })
})
//----------------end config socket------------------//

//--------------------build server------------------//
const CALL_PORT = process.env.CALL_PORT || 8001;

server.listen(CALL_PORT, () => {
    console.log('App socket listening on port: ' + CALL_PORT);
});
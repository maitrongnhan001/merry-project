//----------------require extensions-----------------//
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = require("http").createServer();

const { connect } = require('./config/database.js');
connect();

//-------------end require extensions-----------------//

const app = express();

//------------------ config socket------------------//
const homeSocket = require('./sockets/home.socket');
const groupSocket = require('./sockets/group.socket');
const friendSocket = require('./sockets/friend.socket');
const chatSocket = require('./sockets/chat.socket');

const onConnection = (socket) => {
    homeSocket.home(io, socket);
    groupSocket.group(io, socket);
    friendSocket.friend(io,socket);
    chatSocket.chat(io, socket);
}

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        //test socket
        //origin: "http://127.0.0.1:5500"
        //real socket
        origin: "http://localhost:3000"
    }
});

io.on("connection", onConnection);
//----------------end config socket------------------//

//------------------ use extensions------------------//
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//---------------end use extension------------------//

//-------------------use router---------------------//
const friendRouter = require('./routers/friend')
const groupRouter = require('./routers/group')
const chatRouter = require('./routers/chat')
const mediaRouter = require('./routers/contentChat')
const homeRouter = require('./routers/home')

app.use('/api/friends', friendRouter)
app.use('/api/groups', groupRouter)
app.use('/api/chat', chatRouter)
app.use('/api/content', mediaRouter)
app.use('/api',homeRouter)


//----------------end use router--------------------//


//--------------------build server------------------//
const SOCKET_PORT = process.env.SOCKET_PORT || 8000;

server.listen(SOCKET_PORT, () => {
    console.log('App socket listening on port: ' + SOCKET_PORT);
});

const APP_PORT = process.env.APP_PORT || 8080;

app.listen(APP_PORT, () => {
    console.log('App listening on port: ' + APP_PORT);
});
//----------------end build server------------------//
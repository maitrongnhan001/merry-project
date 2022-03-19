const express = require('express')
const app = express()
const { ExpressPeerServer } = require('peer');
const server = require('http').Server(app);
require('dotenv').config()
const port = process.env.CALL_PORT || 8001
const { isAuthSocket } = require('./middlewares/authSocket.middleware');

//----------------peer-----------------//
const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.use('/peerjs', peerServer);
//--------------end peer-----------------//

//----------------listen-----------------//
server.listen(port , ()=> console.log('> Server is up and running on port : ' + port))
//--------------end listen-----------------//


 
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
//const router_connect = require('./socket/handle_test');
const onConnection = (socket) => {
    
}

const io = require("socket.io")(server, {
    cors: {
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
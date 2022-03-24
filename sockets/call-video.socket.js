
const callSocket = require('../controllers/call.socket.controller')

module.exports.videoCall = (io, socket) => {
    socket.on('call', (data) => {
        callSocket.call(data, socket, io);
    });

    socket.on('call-up', (data) => {
        callSocket.callUp(data, socket, io);
    })
    
    socket.on('call-down', (data)=> {
        callSocket.callDown(data, socket, io);
    })
}
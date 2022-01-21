const chatSocket = require('../controllers/chat.socket.controller');

module.exports.chat = (io, socket) => {
    socket.on('send-text-message', (data) => {
        chatSocket.sendTextMessage(data, socket);
    });

    socket.on('send-media-message', (data) => {
        chatSocket.sendMediaMessage(data, socket);
    });

    socket.on('send-document-message', (data) => {
        chatSocket.sendDocumentMessage(data, socket);
    });

    socket.on('emotion', (data) => {
        chatSocket.emotion(data, socket);
    });

    socket.on('create-room', (data) => {
        chatSocket.createRoom(data, socket);
    })
}
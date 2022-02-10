const chatSocket = require('../controllers/chat.socket.controller');

module.exports.chat = (io, socket) => {
    socket.on('send-text-message', (data) => {
        chatSocket.sendTextMessage(data, socket, io);
    });

    socket.on('send-media-message', (data) => {
        chatSocket.sendMediaMessage(data, socket, io);
    });

    socket.on('send-document-message', (data) => {
        chatSocket.sendDocumentMessage(data, socket, io);
    });

    socket.on('send-link-message', (data) => {
        chatSocket.sendLinkMesssage(data, socket, io);
    });

    socket.on('emotion', (data) => {
        chatSocket.emotion(data, socket, io);
    });

    socket.on('create-room', (data) => {
        chatSocket.createRoom(data, socket, io);
    });
}
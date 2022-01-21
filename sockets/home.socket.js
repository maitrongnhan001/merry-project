const homeSocketController = require('../controllers/home.socket.controller');

module.exports.home = (io, socket) => {
    socket.on('user-login', (data) => {
        homeSocketController.login(data, socket, io);
    });

    socket.on('logout', (data) => {
        homeSocketController.logout(data, socket, io);
    });
} 
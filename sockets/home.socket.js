const homeSocketController = require('../controllers/home.socket.controller');

module.exports.home = (io, socket) => {
    socket.on('onlogin', (data) => {
        homeSocketController.login(data, socket);
    });

    socket.on('logout', (data) => {
        homeSocketController.logout(data, socket);
    });
} 
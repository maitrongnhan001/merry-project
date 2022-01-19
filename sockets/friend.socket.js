const friendSocketController = require('../controllers/friend.socket.controller');

module.exports.friend = (io, socket) => {
    socket.on('add-friend', (data) => {
        friendSocketController.addFriend(data, socket);
    });

    socket.on('delete-friend', (data) => {
        friendSocketController.deleteFriend(data, socket);
    });

    socket.on('accept-friend', (data) => {
        friendSocketController.acceptFriend(data, socket);
    });

    socket.on('dismiss-friend', (data) => {
        friendSocketController.dismissFriend(data, socket);
    });
}
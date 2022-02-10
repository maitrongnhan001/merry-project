const groupSocketController = require('../controllers/group.socket.controller');

module.exports.group = (io, socket) => {
    socket.on('add-group', (data) => {
        groupSocketController.addGroup(data, socket, io);
    });

    socket.on('update-group', (data) => {
        groupSocketController.updateGroup(data, socket, io);
    });

    socket.on('delete-group', (data) => {
        groupSocketController.deleteGroup(data, socket, io);
    });

    socket.on('add-member', (data) => {
        groupSocketController.addMember(data, socket, io);
    });

    socket.on('delete-member', (data) => {
        groupSocketController.deleteMember(data, socket, io);
    });
} 
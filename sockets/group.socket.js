const groupSocketController = require('../controllers/group.socket.controller');

module.exports.group = (io, socket) => {
    socket.on('add-group', (data) => {
        groupSocketController.addGroup(data, socket);
    });

    socket.on('update-group', (data) => {
        groupSocketController.updateGroup(data, socket);
    });

    socket.on('delete-group', (data) => {
        groupSocketController.deleteGroup(data, socket);
    });

    socket.on('add-member', (data) => {
        groupSocketController.addMember(data, socket);
    });

    socket.on('delete-member', (data) => {
        groupSocketController.deleteMember(data, socket);
    });
} 
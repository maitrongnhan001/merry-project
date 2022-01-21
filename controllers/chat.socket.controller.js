const groupDetail = require('../models/detailGroup.model');
const userIsOnline = require('../stores/UserLoginStore');

module.exports.sendTextMessage = (data, socket) => {
    //gui tin nhan van ban toi client
}

module.exports.sendMediaMessage = (data, socket) => {
    //gui tin nhan meida toi client
}

module.exports.sendDocumentMessage = (data, socket) => {
    //gui tin nhan document toi client 
}

module.exports.emotion = (data, socket) => {
    //thona bao toi client
}

module.exports.createRoom = async (data, socket, io) => {
    //tao room cho tat ca nguoi dungn trong list chat

    //lay id user va id receive
    const senderId = data.senderId;
    const receiverId = data.receiverId;

    //join room
    socket.join(`${receiverId}`);

    //lay tat ca user trong room
    const listMembers = groupDetail.getMembers(receiverId, 10000, 0);

    //join all member to room
    const listuser = await userIsOnline.getAll();
    
    listuser.forEach((Element) => {
        io.to(`${Element.userSocketId}`).join(`${receiverId}`);
    });
    //gui thong tin toi tat ca user trong room
    socket.to(`${receiverId}`).emit('test', {data: 'join'});
}
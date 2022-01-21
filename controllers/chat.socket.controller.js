const groupDetail = require('../models/detailGroup.model');
const userIsOnline = require('../stores/UserLoginStore');

module.exports.sendTextMessage = (data, socket, io) => {
    try {
        //gui tin nhan van ban toi client

        //lay du lieu
        const senderId = data.senderId;
        const receiverId = data.receiverId;
        const contentMessage = data.message.contentMessage;
        const time = data.message.time;

        //luu vao trong database


        //tra thong tin ve cho client
    } catch (err) {
        console.log(err);
    }
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
    try {
        //tao room cho tat ca nguoi dungn trong list chat

        //lay id user va id receive
        const receiverId = data.receiverId;

        //lay tat ca user trong room
        const listMembers = await groupDetail.getMembers(receiverId, 10000, 0);

        //join all member to room
        await listMembers.forEach(async (Element) => {
            const userId = Element.userId;
            const userSocket = await userIsOnline.getUserSocket(userId);

            if (userSocket) {
                userSocket.join(`${receiverId}`);
            }
        });
        //gui thong tin toi tat ca user trong room
        io.to(`${receiverId}`).emit('create-room', { data });
    } catch (err) {
        console.error(err);
    }
}
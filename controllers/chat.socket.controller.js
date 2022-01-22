const groupDetail = require('../models/detailGroup.model');
const chat = require('../models/chat.model');
const textMessage = require('../models/textMessage.modal');
const userIsOnline = require('../stores/UserLoginStore');

module.exports.sendTextMessage = async (data, socket, io) => {
    //gui tin nhan van ban toi client
    try {
        //lay du lieu
        const senderId = data.senderId;
        const receiverId = data.receiverId;
        const content = data.message.content;

        //luu message vao trong database message
        const message = {
            emotion: null,
            sendId: senderId,
            receiveId: receiverId,
            status: 'Đã gửi'
        }
        const dataMessage = await chat.create(message);

        //luu message vao trong database text message
        const contentMessage = {
            content: content,
            messageId: dataMessage.id
        }
        const dataContent = await textMessage.create(contentMessage);

        //tra thong tin ve cho client
        const time = await chat.getTime(dataMessage.id);

        const returnData = {
            messageId: dataMessage.id,
            senderId: dataMessage.sendId,
            receiverId: dataMessage.receiveId,
            message: {
                type: 'text',
                content: dataContent.content,
                time: time,
                status: dataMessage.status
            }
        }

        io.to(`${receiverId}`).emit('send-text-message', returnData);
    } catch (err) {
        socket.emit('send-text-message-error', { msg: 'Lỗi, không gửi tin nhắn được' });
        console.error(err);
    }
}

module.exports.sendMediaMessage = async (data, socket, io) => {
    //gui tin nhan meida toi client
    try {
        //lay du lieu
        const senderId = data.senderId;
        const receiverId = data.receiverId;
        const content = data.message.content;
        const time = data.message.time;

        //luu message vao trong database message
        const message = {
            time: time,
            emotion: null,
            sendId: senderId,
            receiveId: receiverId,
            status: 'Đã gửi'
        }
        const dataMessage = await chat.create(message);

        //luu media vao trong thu muc public

        //luu message vao trong database media message

        //tra thong tin ve cho client
        
    } catch (err) {
        console.error(err);
    }
}

module.exports.sendDocumentMessage = (data, socket) => {
    //gui tin nhan document toi client 
}

module.exports.emotion = (data, socket) => {
    //thona bao toi client
}

module.exports.createRoom = async (data, socket, io) => {
    //tao room cho tat ca nguoi dungn trong list chat
    try {
        //lay id user va id receive
        const receiverId = data.receiverId;

        //chuyen tat ca trang thai tin nhan thanh da xem

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
        socket.emit('create-room-error', { msg: 'tao phong that bai' });
        console.error(err);
    }
}
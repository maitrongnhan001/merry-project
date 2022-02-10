const groupDetail = require('../models/detailGroup.model');
const chat = require('../models/chat.model');
const textMessage = require('../models/textMessage.model');
const mediaMessage = require('../models/mediaMessage.model');
const userIsOnline = require('../stores/UserLoginStore');
const emotionMessage = require('../models/emotion.model');
const documentMessage = require('../models/document.model');
const linkMessage = require('../models/link.model');
const path = require('path');
const fs = require('fs');

module.exports.sendTextMessage = async (data, socket, io) => {
    //gui tin nhan van ban toi client
    try {
        //kiem tra du lieu co ton tai
        if (!(data.senderId && data.receiverId && data.message.content)) {
            socket.emit('send-text-message-error', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay du lieu
        const senderId = data.senderId;
        const receiverId = data.receiverId;
        const content = data.message.content;

        //luu message vao trong database message
        const message = {
            sendId: senderId,
            type: 'text',
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
                type: dataMessage.type,
                content: dataContent.content,
                time: time,
                status: dataMessage.status
            }
        }

        io.to(`${dataMessage.receiveId}`).emit('send-text-message', returnData);
    } catch (err) {
        socket.emit('send-text-message-error', { msg: 'Lỗi, không gửi tin nhắn được' });
        console.error(err);
    }
}

module.exports.sendMediaMessage = async (data, socket, io) => {
    //gui tin nhan meida toi client
    try {
        //kiem tra du lieu co ton tai
        if (!(data.senderId && data.receiverId && data.message.fileName && data.message.content)) {
            socket.emit('send-media-message-error', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay du lieu
        const senderId = data.senderId;
        const receiverId = data.receiverId;
        const fileName = data.message.fileName;
        const content = data.message.content;//file

        //luu message vao trong database message
        const message = {
            sendId: senderId,
            type: 'media',
            receiveId: receiverId,
            status: 'Đã gửi'
        }
        const dataMessage = await chat.create(message);

        //luu media vao trong thu muc public
        const time = (new Date()).getTime();
        const fileNameArr = fileName.split('.');
        const extension = fileNameArr.pop();
        const fileNameStore = `${fileNameArr.toString()}-${time}.${extension}`;
        fs.writeFile(path.resolve(__dirname, '../public/Medias/', fileNameStore), content, async (err) => {
            if (!err) {
                //luu message vao trong database media message
                const contentMessage = {
                    path: fileNameStore,
                    messageId: dataMessage.id
                }

                //tra thong tin ve cho client
                const dataContent = await mediaMessage.create(contentMessage);

                //tra thong tin ve cho client
                const time = await chat.getTime(dataMessage.id);

                const returnData = {
                    messageId: dataMessage.id,
                    senderId: dataMessage.sendId,
                    receiverId: dataMessage.receiveId,
                    message: {
                        type: dataMessage.type,
                        fileName: dataContent.path,
                        time: time,
                        status: dataMessage.status
                    }
                }

                io.to(`${dataMessage.receiveId}`).emit('send-media-message', returnData);
            }
        });
    } catch (err) {
        socket.emit('send-media-message-error', { msg: 'Lỗi, không gửi tin nhắn được' });
        console.error(err);
    }
}

module.exports.sendDocumentMessage = async (data, socket, io) => {
    //gui tin nhan document toi client 
    try {
        //kiem tra du lieu co ton tai
        if (!(data.senderId && data.receiverId && data.message.fileName && data.message.content)) {
            socket.emit('send-document-message-error', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay du lieu
        const senderId = data.senderId;
        const receiverId = data.receiverId;
        const fileName = data.message.fileName;
        const content = data.message.content;//file

        //luu message vao trong database message
        const message = {
            sendId: senderId,
            type: 'document',
            receiveId: receiverId,
            status: 'Đã gửi'
        }
        const dataMessage = await chat.create(message);

        //luu document vao trong thu muc public
        const time = (new Date()).getTime();
        const fileNameArr = fileName.split('.');
        const extension = fileNameArr.pop();
        const fileNameStore = `${fileNameArr.toString()}-${time}.${extension}`;
        fs.writeFile(path.resolve(__dirname, '../public/documents/', fileNameStore), content, async (err) => {
            if (!err) {
                //luu message vao trong database media message
                const contentMessage = {
                    fileName: fileNameStore,
                    messageId: dataMessage.id
                }

                //tra thong tin ve cho client
                const dataContent = await documentMessage.create(contentMessage);

                //tra thong tin ve cho client
                const time = await chat.getTime(dataMessage.id);

                const returnData = {
                    messageId: dataMessage.id,
                    senderId: dataMessage.sendId,
                    receiverId: dataMessage.receiveId,
                    message: {
                        type: dataMessage.type,
                        fileName: dataContent.fileName,
                        time: time,
                        status: dataMessage.status
                    }
                }

                io.to(`${dataMessage.receiveId}`).emit('send-document-message', returnData);
            }
        });
    } catch (err) {
        socket.emit('send-document-message-error', { msg: 'Lỗi, không gửi tin nhắn được' });
        console.error(err);
    }
}

module.exports.sendLinkMesssage = async (data, socket, io) => {
    //gui link
    try {
        //kiem tra du lieu co ton tai
        if (!(data.senderId && data.receiverId && data.message.content)) {
            socket.emit('send-link-message-error', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay du lieu
        const senderId = data.senderId;
        const receiverId = data.receiverId;
        const content = data.message.content;

        //luu message vao trong database message
        const message = {
            sendId: senderId,
            type: 'link',
            receiveId: receiverId,
            status: 'Đã gửi'
        }
        const dataMessage = await chat.create(message);

        //luu message vao trong database link message
        const contentMessage = {
            link: content,
            messageId: dataMessage.id
        }
        const dataContent = await linkMessage.create(contentMessage);

        //tra thong tin ve cho client
        const time = await chat.getTime(dataMessage.id);

        const returnData = {
            messageId: dataMessage.id,
            senderId: dataMessage.sendId,
            receiverId: dataMessage.receiveId,
            message: {
                type: dataMessage.type,
                content: dataContent.link,
                time: time,
                status: dataMessage.status
            }
        }

        io.to(`${dataMessage.receiveId}`).emit('send-link-message', returnData);
    } catch (err) {
        socket.emit('send-link-message-error', { msg: 'Lỗi, không gửi tin nhắn được' });
        console.error(err);
    }
}

module.exports.emotion = async (data, socket, io) => {
    //thona bao toi client
    try {
        //kiem tra du lieu co ton tai
        if (!(data.senderId && data.receiverId && data.message.messageId && (data.message.emotion || data.message.emotion === 0))) {
            socket.emit('emotion-error', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay du lieu
        const senderId = data.senderId;
        const receiverId = data.receiverId;
        const messageId = data.message.messageId;
        const emotion = data.message.emotion;

        //luu message vao trong database message
        if (emotion !== 0) {
            const emotionObj = {
                sendId: senderId,
                messageId: messageId,
                emotion: emotion
            }

            await emotionMessage.create(emotionObj);
        } else {
            await emotionMessage.delete(senderId, messageId);
        }

        //tra du lieu ve clinet
        const returnData = {
            senderId: senderId,
            receiverId: receiverId,
            message: {
                messageId: messageId,
                emotion: emotion
            }
        }
        io.to(`${receiverId}`).emit('emotion', returnData);
    } catch (err) {
        socket.emit('emotion-error', { msg: 'Lỗi, không gửi tin nhắn được' });
        console.error(err);
    }
}

module.exports.createRoom = async (data, socket, io) => {
    //tao room cho tat ca nguoi dungn trong list chat
    try {
        //kiem tra du lieu co ton tai
        if (!(data.senderId && data.receiverId)) {
            socket.emit('create-room-error', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay id user va id receive
        const receiverId = data.receiverId;

        //chuyen tat ca trang thai tin nhan thanh da xem
        const status = 'Đã xem';
        await chat.updateStatus(status, [receiverId]);

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
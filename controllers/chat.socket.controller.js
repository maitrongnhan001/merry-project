const groupDetail = require('../models/detailGroup.model');
const chat = require('../models/chat.model');
const userIsOnline = require('../stores/UserLoginStore');
const emotionMessage = require('../models/emotion.model');
const group = require('../models/group.model');
const user = require('../models/user.model');
const path = require('path');
const fs = require('fs');

const getMembers = async (groupId, userId) => {

    let id = await group.getMembers(groupId)
    var user1, user2;
    if (userId == id[0].userId) {
        user1 = await user.getUserId(id[0].userId)
        user2 = await user.getUserId(id[1].userId)
    } else {
        user1 = await user.getUserId(id[1].userId)
        user2 = await user.getUserId(id[0].userId)
    }

    

    const idMembersArray = id.map(element => {
        return element.userId
    })
    const members = {
        members: idMembersArray,
        image: id[0].AdminId ? id[0].image ? { image1: id[0].image, image2: null } :
            { image1: user1[0].image, image2: user2[0].image } : { image1: user2[0].image, image2: null },
        groupName: id[0].AdminId ? id[0].groupName ? id[0].groupName : `${user1[0].lastName} ${user1[0].firstName}, ${user2[0].lastName} ${user2[0].firstName},...` : `${user2[0].lastName} ${user2[0].firstName}`,
    }
    return members
}

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
            status: 'Đã gửi',
            content: content
        }

        //status
        //gui tin nhan toi mot nhom, kiem tra user con lai trong nhom co online khong
        //neu co online thi status la da nhan
        //neu khong co user nao online thi status la da gui
        const listOtherUsers = await groupDetail.getMembers(receiverId, 10000, 0);
        listOtherUsers.forEach(Element => {
            if (Element.userId != senderId && userIsOnline.checkUser(Element.userId)) {
                message.status = 'Đã nhận'
            }
        });

        const dataMessage = await chat.create(message);

        //tra thong tin ve cho client
        const time = await chat.getTime(dataMessage.id);
        const senderUserInfo = await user.getUserId(senderId)
        const members = await getMembers(receiverId, senderId)
        const returnData = {
            messageId: dataMessage.id,
            senderId: dataMessage.sendId,
            receiverId: dataMessage.receiveId,
            type: dataMessage.type,
            content: dataMessage.content,
            time: time,
            status: dataMessage.status,
            name: `${senderUserInfo[0].lastName} ${senderUserInfo[0].firstName}`,
            image: senderUserInfo[0].image,
            receiver: members
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

        //luu media vao trong thu muc public
        const time = (new Date()).getTime();
        const fileNameArr = fileName.split('.');
        const extension = fileNameArr.pop();
        const fileNameStore = `${fileNameArr.toString()}-${time}.${extension}`;
        fs.writeFile(path.resolve(__dirname, '../public/Medias/', fileNameStore), content, async (err) => {
            if (!err) {

                //luu message vao trong database message
                const message = {
                    sendId: senderId,
                    type: 'media',
                    receiveId: receiverId,
                    status: 'Đã gửi',
                    content: fileNameStore
                }

                //status
                //gui tin nhan toi mot nhom, kiem tra user con lai trong nhom co online khong
                //neu co online thi status la da nhan
                //neu khong co user nao online thi status la da gui
                const listOtherUsers = await groupDetail.getMembers(receiverId, 10000, 0);
                listOtherUsers.forEach(Element => {
                    if (Element.userId != senderId && userIsOnline.checkUser(Element.userId)) {
                        message.status = 'Đã nhận'
                    }
                });

                const dataMessage = await chat.create(message);

                //tra thong tin ve cho client
                const time = await chat.getTime(dataMessage.id);
                const senderUserInfo = await user.getUserId(senderId)
                const members = await getMembers(receiverId, senderId)

                const returnData = {
                    messageId: dataMessage.id,
                    senderId: dataMessage.sendId,
                    receiverId: dataMessage.receiveId,
                    type: dataMessage.type,
                    content: dataMessage.content,
                    time: time,
                    status: dataMessage.status,
                    name: `${senderUserInfo[0].lastName} ${senderUserInfo[0].firstName}`,
                    image: senderUserInfo[0].image,
                    receiver: members
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

        //luu document vao trong thu muc public
        const time = (new Date()).getTime();
        const fileNameArr = fileName.split('.');
        const extension = fileNameArr.pop();
        const fileNameStore = `${fileNameArr.toString()}-${time}.${extension}`;
        fs.writeFile(path.resolve(__dirname, '../public/documents/', fileNameStore), content, async (err) => {
            if (!err) {
                //luu message vao trong database message
                const message = {
                    sendId: senderId,
                    type: 'document',
                    receiveId: receiverId,
                    status: 'Đã gửi',
                    content: fileNameStore
                }

                //status
                //gui tin nhan toi mot nhom, kiem tra user con lai trong nhom co online khong
                //neu co online thi status la da nhan
                //neu khong co user nao online thi status la da gui
                const listOtherUsers = await groupDetail.getMembers(receiverId, 10000, 0);
                listOtherUsers.forEach(Element => {
                    if (Element.userId != senderId && userIsOnline.checkUser(Element.userId)) {
                        message.status = 'Đã nhận'
                    }
                });

                const dataMessage = await chat.create(message);

                //tra thong tin ve cho client
                const time = await chat.getTime(dataMessage.id);
                const senderUserInfo = await user.getUserId(senderId)
                const members = await getMembers(receiverId, senderId)

                const returnData = {
                    messageId: dataMessage.id,
                    senderId: dataMessage.sendId,
                    receiverId: dataMessage.receiveId,
                    type: dataMessage.type,
                    content: dataMessage.content,
                    time: time,
                    status: dataMessage.status,
                    name: `${senderUserInfo[0].lastName} ${senderUserInfo[0].firstName}`,
                    image: senderUserInfo[0].image,
                    receiver: members
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
            socket.emit('send-link-message', { msg: 'Lỗi, không đính kèm dữ liệu' });
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
            status: 'Đã gửi',
            content: content
        }
        const dataMessage = await chat.create(message);

        //tra thong tin ve cho client
        const time = await chat.getTime(dataMessage.id);
        const senderUserInfo = await user.getUserId(senderId)
        const members = await getMembers(receiverId, senderId)

        const returnData = {
            messageId: dataMessage.id,
            senderId: dataMessage.sendId,
            receiverId: dataMessage.receiveId,
            type: dataMessage.type,
            content: dataMessage.content,
            time: time,
            status: dataMessage.status,
            name: `${senderUserInfo[0].lastName} ${senderUserInfo[0].firstName}`,
            image: senderUserInfo[0].image,
            receiver: members
        }

        io.to(`${dataMessage.receiveId}`).emit('send-link-message', returnData);
    } catch (err) {
        socket.emit('send-link-message', { msg: 'Lỗi, không gửi tin nhắn được' });
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
        io.to(`${receiverId}`).emit('create-room', { ...data, status });
    } catch (err) {
        socket.emit('create-room-error', { msg: 'tao phong that bai' });
        console.error(err);
    }
}

module.exports.updateSeenMessage = async (data, socket, io) => {
    try {
        //get data
        const receiverId = data.receiveId || null;
        //check data
        if (!receiverId) socket.emit('seen-message', { message: 'Không có dữ liệu' });
        //store to database
        await chat.updateStatus('Đã xem', [receiverId]);
        //return for user
        io.to(`${receiverId}`).emit('seen-message', {
            receiverId: receiverId,
            status: 'Đã xem'
        });
    } catch (error) {
        console.log(error);
        socket.emit('seen-message', { message: 'Có lỗi xảy ra, vui lòng thử lại' });
    }
}
const waiting = require('../models/waiting.model');
const friend = require('../models/friend.model');
const userIsOnline = require('../stores/UserLoginStore');
const group = require('../models/group.model');
const detailGroup = require('../models/detailGroup.model');

module.exports.addFriend = async (data, socket) => {
    //gui loi moi ket ban
    try {
        //kiem tra du lieu
        if ( !(data.senderId && data.receiverId) ) {
            socket.emit('add-friend', {msg: 'Lỗi, không đính kèm dữ liệu', status: 404});
            return;
        }
        //lay du lieu
        const sendId = data.senderId;
        const receiveId = data.receiverId;
        //kiem tra du lieu co ton tai trong bang friend chua
        const checkFrinend = await friend.getFriend(sendId, receiveId);
        if ( checkFrinend ) {
            socket.emit('add-friend', {msg: 'Lỗi, thông tin đã tồn tại trong CSDL', status: 404});
            return;
        }

        //kiem tra du lieu trong bang waiting
        const checkWaiting = await waiting.getWaiting(sendId, receiveId);
        if ( checkWaiting ) {
            socket.emit('add-friend', {msg: 'Lỗi, thông tin đã tồn tại trong CSDL', status: 404});
            return;
        }

        //luu du lieu vao bang waiting
        const waitingObj = {
            sendId: sendId,
            receiveId: receiveId
        }
        const dataWaiting = await waiting.create(waitingObj);

        //tra du lieu ve client
        const receiveUserSocket = await userIsOnline.getUserSocket(receiveId);
        const resultData = await friend.getUserId(sendId);
        if (receiveUserSocket) {
            receiveUserSocket.emit('add-friend', {senderId: dataWaiting.sendId, receiverId: dataWaiting.receiveId, name: resultData[0].name, sex: resultData[0].sex, image: resultData[0].image});
        }
        socket.emit('add-friend', {senderId: dataWaiting.sendId, receiverId: dataWaiting.receiveId,name: resultData[0].name, sex: resultData[0].sex, image: resultData[0].image});
        
    } catch (err) {
        socket.emit('add-friend-error', {msg: 'Lỗi, xử lý dữ liệu không thành công', status: 404});
        console.error(err);
    }
}

module.exports.acceptFriend = async (data, socket) => {
    //dong y ket ban
    try {
        //kiem tra du lieu
        if ( !(data.senderId  &&  data.receiverId) ) {
            socket.emit('accept-friend-error', {msg: 'Lỗi, không đính kèm dữ liệu', status: 404});
            return;
        }

        //lay du lieu
        const sendId = data.senderId;
        const receiveId = data.receiverId

         //kiem tra du lieu trong bang waiting
         const checkWaiting = await waiting.getWaiting(sendId, receiveId);
         if ( !checkWaiting ) {
             socket.emit('accept-friend-error', {msg: 'Lỗi, chưa gửi lời mời kết bạn',status: 404});
             return;
         }

        //xoa du lieu trong ban waiting
        await waiting.delete(sendId, receiveId);

        //them du lieu vao ban friend
        const friendObj = {
            sendId: sendId,
            receiveId: receiveId
        }
        const dataFriend = await friend.create(friendObj);
        //them du lieu vao bang group
        const groupObj = {
            id : `U${(new Date()).getTime()}`,
            groupName: ''
        }
        const dataGroup = await group.create(groupObj);//
        //them du lieu vao bang detailGroup
        const users  = [
            [groupObj.id, friendObj.sendId],
            [groupObj.id, friendObj.receiveId]
        ]
        await detailGroup.create(users);

        //tra thong tin ve cho client
        const receiveUserSocket = await userIsOnline.getUserSocket(receiveId);
        if (receiveUserSocket) {
            receiveUserSocket.emit('accept-friend', {senderId: dataFriend.sendId, receiverId: dataFriend.receiveId, groupId: groupObj.id});
        }
        socket.emit('accept-friend', {senderId: dataFriend.sendId, receiverId: dataFriend.receiveId, groupId: groupObj.id});
    } catch (err) {
        socket.emit('accept-friend-error', {msg: 'Lỗi, xử lý dữ liệu không thành công',status: 404});
        console.error(err);
    }
}

module.exports.dismissFriend = async (data, socket) => {
    //khong dong y ket ban
    try {
        //kiem tra du lieu
        if ( !(data.senderId  &&  data.receiverId) ) {
            socket.emit('dismiss-friend-error', {msg: 'Lỗi, không đính kèm dữ liệu'})
            return;
        }

        //lay du lieu
        const sendId = data.senderId;
        const receiveId = data.receiverId

         //kiem tra du lieu trong bang waiting
         const checkWaiting = await waiting.getWaiting(sendId, receiveId);
         if ( !checkWaiting ) {
             socket.emit('dismiss-friend-error', {msg: 'Lỗi, chưa gửi lời mời kết bạn'});
             return;
         }

        //xoa du lieu trong ban waiting
        await waiting.delete(sendId, receiveId);

        //tra thong tin ve cho client
        const receiveUserSocket = await userIsOnline.getUserSocket(receiveId);
        if (receiveUserSocket) {
            receiveUserSocket.emit('dismiss-friend', {senderId: sendId, receiverId: receiveId});
        }
        socket.emit('dismiss-friend', {senderId: sendId, receiverId: receiveId});
    } catch (err) {
        socket.emit('dismiss-friend-error', {msg: 'Lỗi, xử lý dữ liệu không thành công'});
        console.error(err);
    }
}

module.exports.deleteFriend = async (data, socket) => {
    //xoa ket ban
    try {
        //kiem tra du lieu
        if ( !(data.senderId  &&  data.receiverId) ) {
            socket.emit('delete-friend-error', {msg: 'Lỗi, không đính kèm dữ liệu'})
            return;
        }

        //lay du lieu
        const sendId = data.senderId;
        const receiveId = data.receiverId

         //kiem tra du lieu trong bang friend
         const checkWaiting = await friend.getFriend(sendId, receiveId);
         if ( !checkWaiting ) {
             socket.emit('delete-friend-error', {msg: 'Lỗi, người này chưa phải bạn bè'});
             return;
         }

        //xoa du lieu trong ban waiting
        await friend.delete(sendId, receiveId);

        //tra thong tin ve cho client
        const receiveUserSocket = await userIsOnline.getUserSocket(receiveId);
        if (receiveUserSocket) {
            receiveUserSocket.emit('delete-friend', {senderId: sendId, receiverId: receiveId});
        }
        socket.emit('delete-friend', {senderId: sendId, receiverId: receiveId});
    } catch (err) {
        socket.emit('delete-friend-error', {msg: 'Lỗi, xử lý dữ liệu không thành công'});
        console.error(err);
    }
}
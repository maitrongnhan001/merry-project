const waiting = require('../models/waiting.model');
const friend = require('../models/friend.model');
const userIsOnline = require('../stores/UserLoginStore');

module.exports.addFriend = async (data, socket) => {
    //thong bao ket ban
    try {
        //kiem tra du lieu
        if ( !(data.senderId && data.receiverId) ) {
            socket.emit('add-friend-error', {msg: 'Lỗi, không đính kèm dữ liệu'});
            return;
        }
        //lay du lieu
        const sendId = data.senderId;
        const receiveId = data.receiverId;

        //kiem tra du lieu co ton tai trong bang friend chua
        const checkFrinend = await friend.getFriend(sendId, receiveId);
        if ( checkFrinend ) {
            socket.emit('add-friend-error', {msg: 'Lỗi, thông tin đã tồn tại trong CSDL'});
            return;
        }

        //kiem tra du lieu trong bang waiting
        const checkWaiting = await waiting.getWaiting(sendId, receiveId);
        if ( checkWaiting ) {
            socket.emit('add-friend-error', {msg: 'Lỗi, thông tin đã tồn tại trong CSDL'});
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
        if (receiveUserSocket) {
            receiveUserSocket.emit('add-friend', {senderId: dataWaiting.sendId, receiverId: dataWaiting.receiveId});
        }
        
    } catch (err) {
        socket.emit('add-friend-error', {msg: 'Lỗi, xử lý dữ liệu không thành công'});
        console.error(err);
    }
}

module.exports.acceptFriend = async (data, socket) => {
    //thong bao dong y ket ban
    try {
        //kiem tra du lieu
        if ( !(data.senderId  &&  data.receiverId) ) {
            socket.emit('accept-friend-error', {msg: 'Lỗi, không đính kèm dữ liệu'});
            return;
        }

        //lay du lieu
        const sendId = data.senderId;
        const receiveId = data.receiverId

         //kiem tra du lieu trong bang waiting
         const checkWaiting = await waiting.getWaiting(sendId, receiveId);
         if ( !checkWaiting ) {
             socket.emit('accept-friend-error', {msg: 'Lỗi, chưa gửi lời mời kết bạn'});
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

        //tra thong tin ve cho client
        const receiveUserSocket = await userIsOnline.getUserSocket(receiveId);
        if (receiveUserSocket) {
            receiveUserSocket.emit('accept-friend', {senderId: dataFriend.sendId, receiverId: dataFriend.receiveId});
        }
        socket.emit('accept-friend', {senderId: dataFriend.sendId, receiverId: dataFriend.receiveId});
    } catch (err) {
        socket.emit('accept-friend-error', {msg: 'Lỗi, xử lý dữ liệu không thành công'});
        console.error(err);
    }
}

module.exports.dismissFriend = (data, socket) => {
    //thong bao khong dong y ket ban
}

module.exports.deleteFriend = (data, socket) => {
    //thong bao dong y ket ban
}
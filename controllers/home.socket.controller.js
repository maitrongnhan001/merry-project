const bcrypt = require('bcrypt');
const userIsLogin = require('../stores/UserLoginStore');
const friend = require('../models/friend.model');
const chat = require('../models/chat.model');
const home = require('../models/home.model');
const detailGroup = require('../models/detailGroup.model');
const token_key = process.env.ACCESS_TOKEN_SECRET;
const authHelper = require('../helpers/auth.helper');
const user = require('../models/user.model');

module.exports.login = async (data, socket, io) => {
    try {
        //lay thong tin
        const email = data.email;
        let password = data.password;

        //kiem tra thong tin
        if (!email && !password) {
            socket.emit('user-login-error', {msg: 'Không có dữ liệu'});
            return;
        }

        password = await bcrypt.hash(password, 10);

        //kiem tra thong tin voi database
        const resultLogin = await home.login(email, password);
        if (resultLogin.length === 0) {
            socket.emit('user-login', {msg: 'Đăng nhập không thành công'});
            return;
        }

        //set token
        const InfoUserLogin = {
            email: email,
            firstName: resultLogin[0].firstName,
            lastName: resultLogin[0].lastName,
        }
        const token = await authHelper.createToken(InfoUserLogin, token_key, "48h");

        //luu thong tin vua dang nhap vao arr
        const userId = resultLogin[0].id;
        const result = await userIsLogin.store(userId, socket);

        if (!result) {
            //neu that bai thong bao cho nguoi dung that bai
            socket.emit('error', { message: 'login error' })
        }

        //chuyen tat ca trang thai tin nhan thanh da nhan
        const listGroupChat = await detailGroup.getGroups(userId, 10000, 0);
        let groupChatArr = [];
        if (listGroupChat) {
            for (let i = 0; i < listGroupChat.length; i++) {
                groupChatArr.push(listGroupChat[i].groupId);
            }
            const status = 'Đã nhận';
            await chat.updateStatus(status, groupChatArr);
        }

        //lay danh sach ban be
        const listFriend = await friend.listFriend(userId, 10000, 0);

        if (listFriend) {
            //thong bao den tat ca nguoi dung trong danh sach ban minh vua dang nhap
            listFriend.forEach(async (Element) => {
                let receiveId;
                //tim ban
                receiveId = (Element.sendId == userId) ? Element.receiveId : Element.sendId;

                //kiem tra co online khong
                const userSocket = (await userIsLogin.getUserSocket(receiveId));

                if (userSocket) {
                    //gui thong bao
                    io.to(`${userSocket.id}`).emit('user-login', { userId: userId });
                }
            });
        }
        socket.emit('user-login', {
            userId: userId,
            token: token
        });
    } catch (err) {
        socket.emit('user-login-error', {msg: 'socket đăng nhập không thành công'});
        console.error(err);
    }
}

module.exports.logout = async (data, socket, io) => {
    try {
        //xoa thong tin vua dang nhap vao arr
        const userId = data.userId;
        const result = await userIsLogin.remove(userId);

        if (!result) {
            //neu that bai thong bao cho nguoi dung that bai
            socket.emit('error', { message: 'logout error' })
        }

        //lay danh sach ban be
        const listFriend = await friend.listFriend(userId, 10000, 0);

        if (listFriend) {
            //thong bao den tat ca nguoi dung trong danh sach ban minh vua dang xuat
            listFriend.forEach(async (Element) => {
                let receiveId;
                //tim ban
                receiveId = (Element.sendId == userId) ? Element.receiveId : Element.sendId;

                //kiem tra co online khong
                const userSocket = (await userIsLogin.getUserSocket(receiveId));

                if (userSocket) {
                    //thong bao den tat ca nguoi dung minh vua dang xuat
                    io.to(`${userSocket.id}`).emit('logout', { userId: userId });
                }
            });
        }
    } catch (err) {
        console.error(err);
    }
}
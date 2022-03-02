const bcrypt = require('bcrypt');
const userIsLogin = require('../stores/UserLoginStore');
const chat = require('../models/chat.model');
const home = require('../models/home.model');
const detailGroup = require('../models/detailGroup.model');
const token_key = process.env.ACCESS_TOKEN_SECRET;
const authHelper = require('../helpers/auth.helper');

module.exports.login = async (data, socket) => {
    try {
        //lay thong tin
        const email = data.email;
        let password = data.password;

        //kiem tra thong tin
        if (!email && !password) {
            socket.emit('user-login-error', {msg: 'Không có dữ liệu'});
            return;
        }

        //kiem tra thong tin voi database
        const resultLogin = await home.login(email);

        if (resultLogin.length !== 1 || !(await bcrypt.compare(password, resultLogin[0].password))) {
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

        socket.emit('user-login', {
            userId: userId,
            token: token,
            userAvatar: resultLogin[0].image
        });
    } catch (err) {
        socket.emit('user-login', {msg: 'Đăng nhập không thành công'});
        console.error(err);
    }
}

module.exports.connection = async (data, socket, io) => {
    try {
        //lay thong tin
        const userId = data.userId;

        //kiem tra thong tin
        if (!userId) {
            socket.emit('connection', {msg: 'Không có dữ liệu'});
            return;
        }

        //luu thong tin vua dang nhap vao arr
        await userIsLogin.update(userId, socket);

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

        io.sockets.emit('connection', { userId: userId });

    } catch (err) {
        socket.emit('connection', {msg: 'Kết nối không thành công'});
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
            socket.emit('logout', { message: 'Đăng xuất thất bại' })
        }
        io.sockets.emit('logout', { userId: userId });
    } catch (err) {
        console.error(err);
        socket.emit('logout', { message: 'Đăng xuất thất bại' })
    }
}
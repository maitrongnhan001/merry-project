const bcrypt = require('bcrypt');
const userIsLogin = require('../stores/UserLoginStore');
const chat = require('../models/chat.model');
const home = require('../models/home.model');
const detailGroup = require('../models/detailGroup.model');
const token_key = process.env.ACCESS_TOKEN_SECRET;
const authHelper = require('../helpers/auth.helper');
const fs = require('fs');
const user = require('../models/user.model');
const group = require('../models/group.model');
const path = require('path');

module.exports.login = async (data, socket) => {
    try {
        //lay thong tin
        const email = data.email;
        let password = data.password;

        //kiem tra thong tin
        if (!email && !password) {
            socket.emit('user-login-error', { msg: 'Không có dữ liệu' });
            return;
        }

        //kiem tra thong tin voi database
        const resultLogin = await home.login(email);

        if (resultLogin.length !== 1 || !(await bcrypt.compare(password, resultLogin[0].password))) {
            socket.emit('user-login', { msg: 'Đăng nhập không thành công' });
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
        socket.emit('user-login', { msg: 'Đăng nhập không thành công' });
        console.error(err);
    }
}

module.exports.connection = async (data, socket, io) => {
    try {
        //lay thong tin
        const userId = data.userId;

        //kiem tra thong tin
        if (!userId) {
            socket.emit('connection', { msg: 'Không có dữ liệu' });
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
        socket.emit('connection', { msg: 'Kết nối không thành công' });
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

module.exports.updateProfile = async (data, socket, io) => {
    try {
        //get data
        const userId = data.userId || null;
        const firstName = data.firstName || null;
        const lastName = data.lastName || null;
        const image = data.image || null;
        const DOB = data.DOB || null;
        const sex = data.sex || null;

        //check data
        if (!userId) return socket.emit('update-profile', { msg: "Không đính kèm dữ liệu" });

        const UserUpdateObj = {}
        //set data will update
        if (firstName) UserUpdateObj.firstName = firstName;
        if (lastName) UserUpdateObj.lastName = lastName;
        if (DOB) UserUpdateObj.DOB = DOB;
        if (sex) UserUpdateObj.sex = sex;
        console.log(image);
        if (image) {
            //kiem tra hinh anh da luu truoc do, neu anh ton tai thi xoa
            let getImage = (await user.get(userId))[0].image;
            if (getImage) {
                fs.unlink(path.resolve(__dirname, '../public/avatarUser/', getImage), (error) => {
                    if (error) {
                        socket.emit('update-profile', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
                        console.error(error);
                    }
                });
            }

            //random ten anh
            const fileName = image.fileName;
            const fileNameArr = fileName.split('.');
            const extension = fileNameArr.pop();
            const imageName = `avatar-${(new Date()).getTime()}.${extension}`;
            UserUpdateObj.image = imageName;

            //luu hinh anh vao server
            fs.writeFile(path.resolve(__dirname, '../public/avatarUser/', UserUpdateObj.image), image.file, (error) => {
                if (error) {
                    socket.emit('update-profile', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
                    console.error(error);
                }
            });
        }

        //update data to database
        await user.updateProfile(UserUpdateObj, userId);

        //return to all client
        const resultGroups = await group.getGroup(userId, 10000, 0);
        const groupIdArr = resultGroups.map(Element => {
            return Element.groupId;
        });
        UserUpdateObj.groupId = groupIdArr;
        UserUpdateObj.name = `${UserUpdateObj.lastName} ${UserUpdateObj.firstName}`;
        UserUpdateObj.userId = userId;
        io.emit('update-profile', UserUpdateObj);
    } catch (error) {
        console.log(error);
        socket.emit('update-profile', {msg: 'Lỗi, xữ lý dữ liệu không thành công'});
    }
}
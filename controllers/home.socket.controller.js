const userIsLogin = require('../stores/UserLoginStore');

module.exports.login = async (data, socket) => {
    //luu thong tin vua dang nhap vao arr
    const userId = data.userId;
    const userSocketId = socket.id;
    const result = await userIsLogin.store(userId, userSocketId);

    if (!result) {
        //neu that bai thong bao cho nguoi dung that bai
        socket.to(userSocketId).emit('userlogin', {message: 'error'})
    }
    //thong bao den tat ca nguoi dung trong danh sach ban minh vua dang nhap
    socket.emit('userlogin', {userId: userId});
}

module.exports.logout = async (data, socket) => {
    //xoa thong tin vua dang nhap vao arr
    const userId = data.userId;
    const result = await userIsLogin.remove(userId);

    if (!result) {
        const userSocketId = socket.id;
        socket.to(userSocketId).emit('logout', {message: 'error'})
    }
    //thong bao den tat ca nguoi dung minh vua dang xuat
    socket.emit('logout', {userId: userId});
}
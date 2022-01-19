//file nay luu thong tin dang nhap cua cac user
//{userId, userSocketId}

let initialData = [];

module.exports.store = (userId, userSocketId) => {
    return new Promise((resolve, reject) => {
        //kiem tra loi
        if (!(userId && userSocketId)) reject('data is invaild');

        //luu thong tin user
        userElement = new Object();

        userElement.userId = userId;
        userElement.userSocketId = userSocketId;

        resolve(initialData.push(userElement)); s
    });
}

module.exports.get = () => {
    return new Promise((resolve, reject) => {
        //lay tat ca user dang online trong mang
        resolve(initialData);
    });
}

module.exports.checkUser = (userId) => {
    return new Promise((resolve, reject) => {
        //kiem tra user co trong mang
        if (initialData.find(Element => { return Element.userId === userId })) {
            resolve(true);
        }

        reject(false);
    });
}

module.exports.remove = (userId) => {
    //xoa user trong mang theo id
}
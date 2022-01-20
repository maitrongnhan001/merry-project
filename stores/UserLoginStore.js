//file nay luu thong tin dang nhap cua cac user
//{userId, userSocketId}

let initialData = [
    {userId: 1, userSocketId:1},
    {userId: 2, userSocketId:1},
    {userId: 3, userSocketId:1},
    {userId: 4, userSocketId:1},
    {userId: 5, userSocketId:1},
    {userId: 6, userSocketId:1}
];

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
    return new Promise ((resolve, reject) => {
        //xoa user trong mang theo id user
        const index = initialData.findIndex((Element) => {return userId === Element.userId});

        initialData.splice(index, 1);

        resolve(index);
    });
}
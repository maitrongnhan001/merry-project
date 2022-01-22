//file nay luu thong tin dang nhap cua cac user
//{userId, userSocketId}

let initialData = [];

module.exports.store = (userId, userSocket) => {
    return new Promise((resolve, reject) => {
        //kiem tra loi
        if (!(userId && userSocket)) resolve('data is invaild');

        //luu thong tin user
        userElement = new Object();

        userElement.userId = userId;
        userElement.userSocket = userSocket;
        initialData = [...initialData, userElement];

        resolve(1);
    });
}

module.exports.getAll = () => {
    return new Promise((resolve, reject) => {
        //lay tat ca user dang online trong mang
        resolve(initialData);
    });
}

module.exports.getUserSocket = (userId) => {
    return new Promise((resolve, reject) => {
        //lay id socket theo id user

        //lay vi tri cua user theo id user
        const index = [...initialData].findIndex((Element) => {
            return Element.userId == userId;
        });

        //kiem tra vi tri
        if (index === -1) {
            resolve(null);
        }

        //tra ve user socket id
        const userSocket = initialData[index].userSocket;
        resolve(userSocket);
    });
}

module.exports.checkUser = (userId) => {
    return new Promise((resolve, reject) => {
        //kiem tra user co trong mang
        if (initialData.find(Element => { return Element.userId === userId })) {
            resolve(true);
        }

        resolve(false);
    });
}

module.exports.remove = (userId) => {
    return new Promise ((resolve, reject) => {
        //xoa user trong mang theo id user
        const index = initialData.findIndex((Element) => {return userId === Element.userId});

        //kiem tra vi tri
        if (index === -1) {
            resolve(false);
        }
        initialData.splice(index, 1);

        resolve(true);
    });
}
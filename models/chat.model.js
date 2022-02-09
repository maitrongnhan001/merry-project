const { connection } = require("../config/database");

//them mot tin nhan van ban moi
module.exports.create = (message) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO message SET ?', message, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result));
                let res = {
                    ...message,
                    'id': result.insertId
                }
                resolve(res);
            }
        });
    });
}

//lay time theo id
module.exports.getTime = (messageId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT time FROM message WHERE id=${messageId}`;
        connection.query(sql, function (error, result) {
            if (error) {
                reject(error);
            } else {
                //vi day la ham lay 1 phan tu nen chi can tra ve gia tri phan tu do
                const endResult = JSON.parse(JSON.stringify(result));
                resolve(endResult[0].time);
            }
        });
    });
}

//cap nhat trang thai tin nhan theo mang groupid
//tai sao dung mang group id??
//vi de tranh mat thoi gian update for each item, khi dung mang, chi can update 1 lan duy nhat
//mang groupid co dang [id1, id2, id3]. eg: [1, 2, 3]
module.exports.updateStatus = (status, listGroup) => {
    return new Promise((resolve, reject) => {
        const currentStatus = (status === 'Đã nhận') ? 'Đã gửi' : 'Đã nhận';
        let sql = "UPDATE message SET status = ? where status = ? AND receiveId IN (?)";
        connection.query(sql, [status, currentStatus, listGroup], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(status);
            }
        });
    })
}

//cap nhat trang thai cam xuc cua tin nhan 
module.exports.updateEmotion = (emotion, id) => {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE message SET ? where id = ?";
        connection.query(sql, [emotion, id], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(status);
            }
        });
    })
}
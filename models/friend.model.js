const { connection } = require("../config/database");

//them mot cap du lieu ban moi
module.exports.create = (friendObj) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO friend SET ?', friendObj, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result));
                let res = {
                    ...friendObj,
                    'id': result.insertId
                }
                resolve(res);
            }
        });
    });
}

//xoa thong tin ban
module.exports.delete = (sendId, receiveId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM friend WHERE (sendId=${sendId} AND receiveId=${receiveId})
        OR (sendId=${receiveId} AND receiveId=${sendId})`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

//lay danh sach ban be cua 1 user
module.exports.listFriend = (userId ,limit, offset) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM friend WHERE sendId=${userId} OR receiveId=${userId} LIMIT ${limit} OFFSET ${offset}`;
        connection.query(sql, function (error, result) {
            if (error) {
                reject(error);
            } else {
                if (result.length > 0) {
                    const endResult = JSON.parse(JSON.stringify(result));
                    resolve(endResult);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

//kiem tra thong tin ban theo receive id va send id
module.exports.getFriend = (sendId, receiveId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM friend WHERE (sendId=${sendId} AND receiveId=${receiveId})
        OR (sendId=${receiveId} AND receiveId=${sendId})`;
        connection.query(sql, function (error, result) {
            if (error) {
                reject(error);
            } else {
                if (result.length > 0) {
                    const endResult = JSON.parse(JSON.stringify(result));
                    resolve(endResult);
                } else {
                    resolve(null);
                }
            }
        });
    });
}
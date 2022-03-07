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

//lay ho, ten , anh cua ban be
module.exports.getUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT user.id, concat(lastName,' ', firstName) as name, user.image, user.sex FROM user WHERE id=${userId} `
        connection.query(sql, function (error, result) {
            if(error){
                reject(error)
            }else{
                if(result.length > 0){
                    resolve(result)
                }else{
                    resolve(null)
                }
            }
        })
    })
}

//lay id cua request ban be
module.exports.getRequestFriend = (userId ,limit, offset) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM waitingresquest WHERE sendId = ${userId} OR receiveId = ${userId} LIMIT ${limit} OFFSET ${offset}`;
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

module.exports.isFriend = (userId1, userId2) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from friend where (sendId = ? and receiveId = ? ) or (sendId = ? and receiveId = ?)'
        connection.query(sql, [userId1, userId2, userId2, userId1], (err, result) => {
            if(err)
                reject(err);
            else {
                if(result.length > 0) {
                    resolve(1)
                }else{
                    resolve(0)
                }
            }
        })
    })
}

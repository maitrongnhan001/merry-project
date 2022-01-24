const { connection } = require("../config/database");

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
        const sql = `SELECT user.id, user.firstName, user.lastName, user.image FROM user WHERE id=${userId} `
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

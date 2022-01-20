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
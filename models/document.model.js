const { connection } = require("../config/database");

module.exports.get = async (receiverId, limit, offset) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT *FROM message WHERE type = "document" AND receiveId = ? LIMIT ? OFFSET ?`
        connection.query(sql,[receiverId, limit, offset], function (error, result) {
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
    })
}


//them mot tin nhan document
module.exports.create = (documentMessage) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO documentmessage SET ?', documentMessage, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result))
                let res = {
                    ...documentMessage,
                    'id': result.insertId
                }
                resolve(res);
            }
        });
    })
}
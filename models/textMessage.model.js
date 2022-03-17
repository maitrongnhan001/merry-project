const { connection } = require("../config/database");

//them mot tin nhan van ban moi
module.exports.create = (textMessage) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO textmessage SET ?', textMessage, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result))
                let res = {
                    ...textMessage,
                    'id': result.insertId
                }
                resolve(res);
            }
        });
    })
}

module.exports.get = async (userId, messageId) =>{
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM message WHERE type = "text" AND receiveId = ? AND id = ?`
        connection.query(sql,[userId, messageId], (err, result) =>{
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    const endResult = JSON.parse(JSON.stringify(result));
                    resolve(endResult[0].content);
                } else {
                    resolve(null);
                }
            }
        })
    })
}

module.exports.getStatus = async (userId, messageId) =>{
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM message WHERE receiveId = ? AND id = ?`
        connection.query(sql,[userId, messageId], (err, result) =>{
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    const endResult = JSON.parse(JSON.stringify(result));
                    resolve(endResult[0].status);
                } else {
                    resolve(null);
                }
            }
            
        })
    })
}

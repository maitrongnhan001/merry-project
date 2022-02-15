const { connection } = require("../config/database");

module.exports.get = async (receiverId, limit, offset) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT message.id, link FROM message JOIN linkmessage ON message.id = linkmessage.messageId and message.type = "link" WHERE message.receiveId = ?`
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


//them mot tin nhan link
module.exports.create = (linkMessage) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO linkmessage SET ?', linkMessage, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result))
                let res = {
                    ...linkMessage,
                    'id': result.insertId
                }
                resolve(res);
            }
        });
    })
}
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
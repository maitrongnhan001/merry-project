const { connection } = require("../config/database");

//them mot tin nhan da phuong tien moi
module.exports.create = (mediaMessage) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO mediamessage SET ?', mediaMessage, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result))
                let res = {
                    ...mediaMessage,
                    'id': result.insertId
                }
                resolve(res);
            }
        });
    })
}
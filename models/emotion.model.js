const { connection } = require("../config/database");

//them mot tin nhan van ban moi
module.exports.create = (emotionObj) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO emotion SET ?', emotionObj, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result));
                let res = {
                    ...emotionObj,
                    'id': result.insertId
                }
                resolve(res);
            }
        });
    });
}
const { connection } = require("../config/database");

//them mot cam xuc ung voi mot tin nhan
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

//xoa mot cam xuc ung voi mot tin nhan
module.exports.delete = (sendId, messageId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM emotion WHERE sendId = ${sendId} AND messageId = ${messageId}`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result));
                resolve(result);
            }
        });
    });
}
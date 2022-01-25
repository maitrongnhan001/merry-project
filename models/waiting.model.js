const { connection } = require("../config/database");

//them mot yeu cau ket ban moi
module.exports.create = (waitingObj) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO waitingresquest SET ?', waitingObj, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result));
                let res = {
                    ...waitingObj,
                    'id': result.insertId
                }
                resolve(res);
            }
        });
    });
}
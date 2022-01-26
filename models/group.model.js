const { connection } = require("../config/database");

//them mot group moi
module.exports.create = (groupObj) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO groupuser SET ?', groupObj, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result));
                let res = {
                    ...groupObj
                }
                resolve(res);
            }
        });
    });
}
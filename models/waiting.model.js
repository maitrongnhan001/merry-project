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

//xoa mot yeu cau ket ban
module.exports.delete = (sendId, receiveId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM waitingresquest WHERE (sendId=${sendId} AND receiveId=${receiveId})`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

//lay mot waiting request
module.exports.getWaiting = (sendId, receiveId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM waitingresquest WHERE (sendId=${sendId} AND receiveId=${receiveId})
        OR (sendId=${receiveId} AND receiveId=${sendId})`;
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
const { connection } = require("../config/database");

//lay danh sach cac thanh vien trong nhom theo group user
module.exports.getMembers = (groupId ,limit, offset) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT userId FROM detailgroup WHERE groupId='${groupId}' LIMIT ${limit} OFFSET ${offset}`;
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

//lay danh sach group chat theo user id
module.exports.getGroups = (userId, limit, offset) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT groupId FROM detailgroup WHERE userId ='${userId}' LIMIT ${limit} OFFSET ${offset}`;
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

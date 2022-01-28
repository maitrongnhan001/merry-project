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

//them mot thanh vien moi
module.exports.create = (detailObj) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO detailgroup (groupId, userId) VALUES ?', [detailObj], (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result));
                let res = {
                    ...detailObj
                }
                resolve(res);
            }
        });
    });
}

//xoa du lieu bang detail theo group id
module.exports.deleteByGroupId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM detailgroup WHERE groupId = '${id}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

//kiem tra mot group chat thuong co ton tai chua
module.exports.checkSingleGroup = (userId1, userId2) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT COUNT(detailgroup.userId) AS amount
                     FROM detailgroup 
                     WHERE (detailgroup.userId = ${userId1}
                        OR detailgroup.userId = ${userId2})
                        AND detailgroup.groupId LIKE 'U%'
                        GROUP BY detailgroup.groupId`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result));
                if (result.length != 0) {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].amount == 2) resolve(true);
                    }
                    resolve(false);

                } else {
                    resolve(false);
                }
            }
        })

    })
}
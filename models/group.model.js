const { connection } = require("../config/database");

module.exports.getGroup = (userId ,limit, offset) =>{
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM detailgroup JOIN groupuser WHERE detailgroup.groupId = groupuser.id and detailgroup.userId = ${userId} LIMIT ${limit} OFFSET ${offset}`
        connection.query(sql, function (error, result) {
            if (error) {
                reject(error)
            } else {
                if (result.length > 0) {
                    const endResult = JSON.parse(JSON.stringify(result))
                    resolve(endResult)
                } else {
                    resolve(null)
                }
            }
        })
    })
}

module.exports.getGroupQuery = (userId ,groupId) =>{
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM detailgroup JOIN groupuser WHERE detailgroup.groupId = groupuser.id AND detailgroup.userId = ? AND detailgroup.groupId = ?`
        connection.query(sql,[userId, groupId] ,function (error, result) {
            if (error) {
                reject(error)
            } else {
                if (result.length > 0) {
                    const endResult = JSON.parse(JSON.stringify(result))
                    resolve(endResult)
                } else {
                    resolve(null)
                }
            }
        })
    })
}

module.exports.getMembers = (groupID) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM detailgroup join groupuser on detailgroup.groupId = groupuser.id WHERE detailgroup.groupId = "${groupID}"`
        connection.query(sql, function (error, result) {
            if (error) {
                reject(error)
            } else {
                if (result.length > 0) {
                    const endResult = JSON.parse(JSON.stringify(result))
                    resolve(endResult)
                } else {
                    resolve(null)
                }
            }
        })
    })
}

module.exports.getAdminId = (groupID) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT AdminId FROM groupuser WHERE id = '${groupID}'`
        connection.query(sql, function (error, result) {
            if (error) {
                reject(error)
            } else {
                if (result.length > 0) {
                    const endResult = JSON.parse(JSON.stringify(result))
                    resolve(endResult)
                } else {
                    resolve(null)
                }
            }
        })
    })
}

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

//cap nhat thong tin nhom
module.exports.update = (updateGroupObj, id) => {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE groupuser SET ? where id=?";
        connection.query(sql, [updateGroupObj, id], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(updateGroupObj);
            }
        });
    });
}

// lay id admin 
module.exports.getByGroupId = (groupId) =>{
    return new Promise((resolve, reject) => {
        const sql = `SELECT groupuser.AdminId FROM groupuser WHERE groupuser.id = ?`
        connection.query(sql,[groupId], function (error, result) {
            if (error) {
                reject(error)
            } else {
                if (result.length > 0) {
                    const endResult = JSON.parse(JSON.stringify(result))
                    resolve(endResult)
                } else {
                    resolve(null)
                }
            }
        });
    });
}

//lay thong tin cua mot nhom theo id
module.exports.get = (id) => {
    return new Promise((resolve, reject) => {
        const sql =  `SELECT * FROM groupuser WHERE id = '${id}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

//xoa du lieu trong bang bang group theo id
module.exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM groupuser WHERE id = '${id}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

//lay thanh vien trong nhom
module.exports.getMembersLimit = (groupId, limit, offset) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT user.id, user.image, concat(user.lastName, user.firstName) as name FROM detailgroup JOIN user on detailgroup.userId = user.id WHERE detailgroup.groupId = ? LIMIT ? OFFSET ?`;
        connection.query(sql, [groupId, limit, offset], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports.getDetailByGroupId = (groupId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from detailgroup join groupuser on detailgroup.groupId = groupuser.id where groupId = ?'
        connection.query(sql, [groupId], (err, result) => {
            if(err){
                reject(err)
            }else {
                resolve(result)
            }
        })
    })
}

module.exports.searchGroupByName = (groupName)=>{
    return new Promise((resolve, reject)=>{
        const sql = `SELECT * FROM groupuser WHERE groupuser.groupName LIKE ?`
        connection.query(sql, [groupName], (err, result) => {
            if(err){
                reject(err)
            }else {
                resolve(result)
            }
        })
    })
}
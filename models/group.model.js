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

module.exports.getMembers = (groupID) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM detailgroup join groupuser on detailgroup.groupId = groupuser.id WHERE detailgroup.groupId = "${groupID}" LIMIT 2`
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
        })
    })
}
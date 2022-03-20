const { connection } = require("../config/database");

module.exports.getUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE id=${userId} `
        connection.query(sql, function (error, result) {
            if(error){
                reject(error)
            }else{
                if(result.length > 0){
                    resolve(result)
                }else{
                    resolve(null)
                }
            }
        })
    })
}
//lay thong tin user theo user Id
module.exports.get = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE id='${userId}'`;
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

module.exports.findByEmail = (email) =>{
    return new Promise((resolve, reject) => {
        const sql = `SELECT password, email FROM user WHERE email = ? `
        connection.query(sql, [email], function (error, result) {
            if(error){
                reject(error)
            }else{
                if(result.length > 0){
                    resolve(result)
                }else{
                    resolve(null)
                }
            }
        });
    });
}

//search with senderid or search email
module.exports.search = (email) =>{
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE email  LIKE ?`
        connection.query(sql, [email], function (error, result) {
            if(error){
                reject(error)
            }else{
                if(result.length > 0){
                    resolve(result)
                }else{
                    resolve(null)
                }
            }
        });
    });
}
//user search friend
module.exports.searchUser = (email,userId) =>{
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE id = ? AND  email  LIKE ?`
        connection.query(sql, [userId, email], function (error, result) {
            if(error){
                reject(error)
            }else{
                if(result.length > 0){
                    resolve(result)
                }else{
                    resolve(null)
                }
            }
        });
    });
}


module.exports.searchFriend = (senderid) =>{
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM friend WHERE sendId = ? OR receiveId = ?`
        connection.query(sql, [senderid, senderid], function (error, result) {
            if(error){
                reject(error)
            }else{
                if(result.length > 0){
                    resolve(result)
                }else{
                    resolve(null)
                }
            }
        });
    });
}

//put template 
module.exports.updateTemplate = (userId, template) =>{
    return new Promise((resolve, reject) => {
        const sql = `UPDATE user SET template = ? WHERE id = ?`
        connection.query(sql, [template, userId], function (error, result) {
            if(error){
                reject(error)
            }else{
                if(result){
                    resolve(result)
                }else{
                    resolve(null)
                }
            }
        });
    });
}

// get template
module.exports.getTemplates = (userId)=>{
    return new Promise((resolve, reject) =>{
        const sql = `SELECT template FROM user WHERE id = ?`
        connection.query(sql, [userId], function (error, result) {
            if(error){
                reject(error)
            }else{
                if(result){
                    resolve(result)
                }else{
                    resolve(null)
                }
            }
        })  
    })
}

//get Other user
module.exports.getAllUser = () => {
    return new Promise((resolve, reject) =>{
        const sql = `SELECT user.id FROM user LIMIT 10`
        connection.query(sql, function (error, result) {
            if(error){
                reject(error)
            }else{
                if(result){
                    resolve(result)
                }else{
                    resolve(null)
                }
            }
        })  
    })
}

//update infomation of the user
module.exports.updateProfile = (userObj, userId) => {
    return new Promise((resolve, reject) => {
        const sql =  `UPDATE user SET ? WHERE id = ${userId}`
        connection.query(sql, userObj, (error, result) => {
            if (error) {
                reject(error)
            } else {
                if (result) {
                    resolve(result)
                } else {
                    resolve(null)
                }
            }
        })
    })
}

module.exports.searchUserByName = (searchByName, userId) =>{
    return new Promise((resolve, reject)=>{
        const sql = `SELECT * FROM user WHERE concat(lastName,' ',firstName) LIKE ? AND id = ?`
        connection.query(sql,[searchByName, userId], function (error, result) {
            if(error){
                reject(error)
            }else{
                if(result){
                    console.log(result)
                    resolve(result)
                }else{
                    resolve(null)
                }
            }
        })
    })
}
module.exports.searchUserAll = (userId) =>{
    return new Promise((resolve, reject)=>{
        const sql = `SELECT * FROM user WHERE id = ?`
        connection.query(sql,[userId], function (error, result) {
            if(error){
                reject(error)
            }else{
                if(result){
                    resolve(result)
                }else{
                    resolve(null)
                }
            }
        })
    })
}


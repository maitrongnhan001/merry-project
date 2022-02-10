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
}}

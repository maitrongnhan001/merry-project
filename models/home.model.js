const { connection } = require("../config/database")
const bcrypt = require("bcrypt")


module.exports.register = (user)=>{
    return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 10)
        .then(data=>{
            user.password = data
            const sql = `INSERT INTO user SET ?`
            connection.query(sql, user, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    result = JSON.parse(JSON.stringify(result));
                    let res = {
                        ...user,
                        'id': result.insertId
                    }
                    resolve(res);
                }
            });
        })
        .catch(error => console.error(error))
    })
}

module.exports.login = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE email='${email}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result));
                resolve(result);
            }
        })
    });
}

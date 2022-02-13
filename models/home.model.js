const { connection } = require("../config/database")
const bcrypt = require("bcrypt")


module.exports.register = (user)=>{
    return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 10)
        .then(data=>{
            user.password = data
            const sql = `INSERT INTO user( email, password, DOB, firstName, lastName, sex, image, template) SET ?`
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

module.exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, firstName, lastName FROM user WHERE email='${email}' AND password='${password}'`;
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
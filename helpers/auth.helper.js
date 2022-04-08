const jwt = require("jsonwebtoken");

module.exports.createToken = (user, token_key, expires) => {
    return new Promise((resolve, reject) => {
        const userData = {
            email: user.email
        }
        jwt.sign(
            {data: userData},
            token_key,
            {
                algorithm: "HS256",
                expiresIn: expires, //quy dinh thoi gian
            },
            (error, token) => {
                if (error) {
                    reject(error);
                }
                resolve(token);
            }
            )
    })
}

module.exports.verifyToken = (token, token_key) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, token_key, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        })
    })
}

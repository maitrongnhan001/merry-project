const jwtHelper = require('../helpers/auth.helper');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports.isAuthSocket = async (socket, next) => {
    const tokenObjString = socket.handshake.query.joinServerParameters || null;
   
    let token = tokenObjString ? (JSON.parse(tokenObjString)).token : null;

    if (token) { 
        try {
            await jwtHelper.verifyToken(token, accessTokenSecret);
            next();
        } catch (e) {
            next(new Error('Xác thực không tồn tại'));
        }
    } else {
        next(new Error('Không có token !'));
    }
}


const jwtHelper = require('../helpers/auth.helper')
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

module.exports.isAuth = async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token){
        token = token.replace(/^Bearer\s+/, "");
        try{
            const decoded = await jwtHelper.verifyToken(token, accessTokenSecret)
            req.user = decoded;
            next();
        }catch(e){
            return res.status(401).json({
                message: 'Xác thực không tồn tại',
            });
        }
    }else{
        return res.status(403).send({
            message: 'Không có token !',
        });
    }
}


let isRole = (roles) => {
    return function (req, res, next) {
        if (!roles.includes(req.user.data.role)) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        next()
    }
}
module.exports = {
    isRole: isRole,
};
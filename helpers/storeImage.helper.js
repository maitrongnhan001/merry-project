const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/avatarUser')
    },
    filename: (req, file, cb) => {
        cb(null, `avatar_${Date.now()}-${file.originalname}`);
    }
});

var upload = multer({storage: storage}).single('file');

module.exports = upload;
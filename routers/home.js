// xy ly register, check token
const express = require('express')
const router = express.Router()
const { isAuth } = require('../middlewares/auth.middleware')
const homeController = require('../controllers/home.controller')

// api register
router.post('/register', isAuth, homeController.register)

//check token
router.get('/check-token', isAuth, homeController.checkToken)

//api login
router.get('/login', homeController.login)

//check gmail
router.post('/check-email', homeController.verifyEmail)

//search
//router.get('/search/:name', homeController);


module.exports = router
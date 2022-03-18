// xy ly register, check token
const express = require('express')

const router = express.Router()

const homeController = require('../controllers/home.controller')

// api register
router.post('/register', homeController.register)

//api login
// router.get('/login', homeController.login)

//check gmail
router.post('/check-email', homeController.verifyEmail)

//search
//router.get('/search/:name', homeController);


module.exports = router
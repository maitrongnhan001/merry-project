// xy ly register, check token
const express = require('express')

const router = express.Router()

const homeController = require('../controllers/home.controller')

router.get('/', homeController);

// api register
router.post('/register', homeController.register)
//api login

router.post('/login', homeController.login)

//check gmail
router.post('/checkgmail', homeController.checkgmail)


module.exports = router
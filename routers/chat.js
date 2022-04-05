const express = require('express')
const { isAuth } = require('../middlewares/auth.middleware')
const chatController = require('../controllers/chat.controller')
const router = express.Router()

//get list chat 
router.get('/list-chat/:userId', isAuth, chatController.getListChat)

//get content chat
router.get('/content', isAuth, chatController.getContent)

//search message
router.get('/search-message', isAuth, chatController.searchMessage)

module.exports = router
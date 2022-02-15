const express = require('express')

const chatController = require('../controllers/chat.controller')

const router = express.Router()

//get list chat 
router.get('/list-chat/:userId', chatController.getListChat)

//get content chat
// router.get('/content-chat', chatController.contentChat)

//search message
router.get('/search-message', chatController.searchMessage)

module.exports = router
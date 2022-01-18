const express = require('express')

const chatController = require('../controllers/chat.controller')

const router = express.Router()

//get list chat 
router.get('/list-chat', chatController.listChat)

//get content chat
router.get('/content-chat', chatController.contentChat)

//search message
router.get('/search-message/:content', chatController.search)

module.exports = router
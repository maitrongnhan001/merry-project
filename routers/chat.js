const express = require('express')

const chatController = require('../controllers/chat.controller')

const router = express.Router()

//get list chat 
router.get('/listChat', chatController.listChat)

//get content chat
router.get('/contentChat', chatController.contentChat)

//co hay khong viec nen them xoa chat

module.exports = router
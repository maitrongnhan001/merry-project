const express = require('express')
const { isAuth } = require('../middlewares/auth.middleware')
const friendController = require('../controllers/friend.controller')
const router = express.Router()

//search friend and group by name
router.get('/search', isAuth, friendController.searchFriendAndGroupByName)

//check friend
router.get('/check-friend', isAuth, friendController.checkFriend)

//get friend
router.get('/:userId', isAuth, friendController.getFriend)

//get request friend
router.get('/friends-request/:userId', isAuth, friendController.requestFriend)

//search friend
router.get('/', isAuth, friendController.search)

module.exports = router
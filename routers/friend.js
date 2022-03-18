// friend, waiting request
//put accept add friend ( socket ) 
//api get user ( my user: send socket to all user )
//get friend

const express = require('express')

const friendController = require('../controllers/friend.controller')

const router = express.Router()

//search friend and group by name
router.get('/search', friendController.searchFriendAndGroupByName)

//check friend
router.get('/check-friend', friendController.checkFriend)

//get friend
router.get('/:userId', friendController.getFriend)

//get request friend
router.get('/friends-request/:userId', friendController.requestFriend)

//search friend
router.get('/', friendController.search)

module.exports = router
// friend, waiting request
//put accept add friend ( socket ) 
//api get user ( my user: send socket to all user )
//get friend

const express = require('express')

const friendController = require('../controllers/friend.controller')

const router = express.Router()

//get friend
router.get('/friend', friendController.getFriend)

//post friend
router.post('/addfriend', friendController.addFriend)

//accept friend
router.put('/accept', friendController.accept)

//delete friend
router.delete('/deletefriend', friendController.deleteFriend)

module.exports = router
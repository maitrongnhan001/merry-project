const express = require('express')

const userController = require('../controllers/user.controller')

const router = express.Router()

//get user 
router.get('/', userController.search);
router.get('/getUserByGroupIdAndUserId', userController.getUserByGroupIdAndUserId)

//searchid
router.get('/:id', userController.searchById);

// template
router.put('/template', userController.setTemplate);
router.get('/template/:userId', userController.getTemplate);
router.get('/others-users/:userId', userController.getOtherUsers)


//search user
// router.get('/search-user/:email', userController.searchUser);//search

// put user 
// router.put('/:id', userController.update);

module.exports = router
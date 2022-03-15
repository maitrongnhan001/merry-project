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

router.get('/users-online/:userId', userController.getUserOnline);

module.exports = router
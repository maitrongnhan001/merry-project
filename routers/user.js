const express = require('express')
const { isAuth } = require('../middlewares/auth.middleware')
const userController = require('../controllers/user.controller')
const router = express.Router()

//get user 
router.get('/', isAuth, userController.search);

router.get('/getUserByGroupIdAndUserId', isAuth, userController.getUserByGroupIdAndUserId)

router.get('/get-information-profile-user/', isAuth, userController.getUserInformation)

//searchid
router.get('/:id', isAuth, userController.searchById);

// template
router.put('/template', isAuth, userController.setTemplate);

router.get('/template/:userId', isAuth, userController.getTemplate);

router.get('/others-users/:userId', isAuth, userController.getOtherUsers)

router.get('/users-online/:userId', isAuth, userController.getUserOnline);

module.exports = router
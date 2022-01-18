const express = require('express')

const userController = require('../controllers/user.controller')

const router = express.Router()


//get user 
router.get('/', userController.viewUser);

//post template
// router.post('/template', userController.template);


//search user
router.get('/username/:search', userController.findUserName);//search

router.get('/user_id/:search', userController.findUserID);//search

// put user 

router.put('/:id', userController.update);

module.exports = router
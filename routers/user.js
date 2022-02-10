const express = require('express')

const userController = require('../controllers/user.controller')

const router = express.Router()

//register


//get user 
router.get('/', userController.viewUser);

//post template
router.put('/template/:id', userController.template);

//search user
router.get('/search-user/:email', userController.searchUser);//search

// put user 
router.put('/:id', userController.update);

module.exports = router
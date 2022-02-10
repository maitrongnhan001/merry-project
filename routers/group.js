const express = require('express')

const groupController = require('../controllers/group.controller')

const router = express.Router()

//get group(name, image), if have id then get all member

router.get('/:userId', groupController.getGroups)

//post group(add group)

// router.post('/add-group', groupController.createGroup)

//post members group

// router.post('/add-members', groupController.createMember)

// put group ()
// router.put('/update/:id', groupController.update)

//delete group()
// router.delete('/delete-group/:id', groupController.deleteGroup)

//delete members
// router.delete('/delete-member/:id', groupController.deleteMembers)

module.exports = router
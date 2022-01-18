const express = require('express')

const groupController = require('../controllers/group.controller')

const router = express.Router()

//get group(name, image)

router.get('/group', groupController.getGroups)

//get members group

router.get('/member', groupController.getMembers)

//post group(add group)

router.post('/addgroup', groupController.createGroup)

//post members group

router.post('/addmember', groupController.createMember)

// put group ()
router.put('/update/:id', groupController.update)

//delete group()
router.delete('/deletegroup', groupController.deleteGroup)

//delete members
router.delete('/deletemembers', groupController.deleteMembers)

module.exports = router
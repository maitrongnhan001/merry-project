const express = require('express')
const { isAuth } = require('../middlewares/auth.middleware')
const groupController = require('../controllers/group.controller')
const router = express.Router()

//get group(name, image), if have id then get all member
router.get('/', isAuth, groupController.getGroupQuery)

router.get('/member-list', isAuth, groupController.getMembersLimit)

router.get('/memberIds-list/', isAuth, groupController.getGroupsById)

router.get('/:userId', isAuth, groupController.getGroups)

module.exports = router
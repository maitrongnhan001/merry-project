const express = require('express')

const mediaController = require('../controllers/media.controller')

const router = express.Router()

//get media
router.get('/media', mediaController.getmedia)

// get link 
router.get('/link', mediaController.getlink)

//get document
router.get('/document', mediaController.getdocument)

module.exports = router
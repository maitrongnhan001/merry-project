const express = require('express')

const mediaController = require('../controllers/media.controller')
const linkController = require('../controllers/link.controller')
const documentController = require('../controllers/document.controller')

const router = express.Router()

//get media
router.get('/media', mediaController.getMedia)

// get link 
router.get('/link', linkController.getlink)

//get document
router.get('/document', documentController.getdocument)

module.exports = router
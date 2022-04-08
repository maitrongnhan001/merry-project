const express = require('express')
const { isAuth } = require('../middlewares/auth.middleware')
const mediaController = require('../controllers/media.controller')
const linkController = require('../controllers/link.controller')
const documentController = require('../controllers/document.controller')

const router = express.Router()

//get media
router.get('/media', isAuth, mediaController.getMedia)

// get link 
router.get('/link', isAuth, linkController.getlink)

//get document
router.get('/document', isAuth, documentController.getdocument)

module.exports = router
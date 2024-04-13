const express = require('express')
const router = express.Router()

const { updateProfile } = require('../controllers/profileController.js')
const { requireAuth } = require('../middleware/requireAuth.js')


router.post('/update', requireAuth, updateProfile)

module.exports = router
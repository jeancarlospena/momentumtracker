const express = require('express')
const router = express.Router()

const { requireAuth, requireAdmin } = require('../middleware/requireAuth.js')

// const { loginUser, signupUser, logoutUser, verifyUser } = require('../controllers/authController.js')
const { loginUser, signupUser, logoutUser, verifyUser } = require('../controllers/authController.js')

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.post('/logout', logoutUser)

router.post('/verify', requireAuth, verifyUser)



module.exports = router
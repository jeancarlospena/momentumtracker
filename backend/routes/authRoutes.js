import express from 'express'
const router = express.Router()

import { requireAuth, requireAdmin } from '../middleware/requireAuth.js'

// import { loginUser, signupUser, logoutUser, verifyUser }from '../controllers/authController.js'
import { loginUser, signupUser, logoutUser, verifyUser } from '../controllers/authController.js'

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.post('/logout', logoutUser)

router.post('/verify', requireAuth, verifyUser)



export default router
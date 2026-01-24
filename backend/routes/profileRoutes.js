import express from 'express'
const router = express.Router()

import { updateProfile } from '../controllers/profileController.js'
import { requireAuth } from '../middleware/requireAuth.js'


router.post('/update', requireAuth, updateProfile)

export default router
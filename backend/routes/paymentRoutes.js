import express from 'express'
const router = express.Router()
import { createOrder, captureOrder } from '../controllers/paymentController.js'
import { requireAuth } from '../middleware/requireAuth.js'

router.post('/create-order', requireAuth, createOrder)
router.post('/capture-order', requireAuth, captureOrder)

export default router
import express from 'express'
const router = express.Router()

import { saveData, getData } from '../controllers/stockDataController.js'

router.post('/', saveData)

router.get('/:ticker', getData)

export default router
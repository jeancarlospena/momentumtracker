const express = require('express')
const router = express.Router()

const { saveData, getData } = require('../controllers/stockDataController.js')

router.post('/', saveData)

router.get('/:ticker', getData)

module.exports = router
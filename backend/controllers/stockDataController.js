const Stock = require('../models/StockData.js')
const asyncHandler = require("../middleware/asyncHandler.js")

const saveData = asyncHandler(async (req, res) => {
  const { ticker, candles } = req.body
  const savedData = Stock.create({ ticker, candles })
  res.status(200).json(savedData)
})

const getData = asyncHandler(async (req, res) => {
  const { ticker } = req.params
  const foundData = await Stock.findOne({ ticker: ticker })
  res.status(200).json(foundData)
})

module.exports = { saveData, getData }
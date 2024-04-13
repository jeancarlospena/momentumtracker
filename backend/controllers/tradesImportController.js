const Import = require('../models/TradesImportModel.js')
const asyncHandler = require("../middleware/asyncHandler.js")

const saveData = asyncHandler(async (req, res) => {
  const { ticker, candles } = req.body
  const savedData = Stock.create({ ticker, candles })
  res.status(200).json(savedData)
})

const getData = asyncHandler(async (req, res) => {
  const { ticker } = req.params
  const foundData = await Stock.findOne({ ticker: ticker })
  if (foundData) {
    res.status(200).json(foundData)

  }
  else {
    throw new Error('Stock data not found')
  }
})
//
module.exports = { saveData, getData }
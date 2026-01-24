import Import from '../models/TradesImportModel.js'
import asyncHandler from "../middleware/asyncHandler.js"

export const saveData = asyncHandler(async (req, res) => {
  const { ticker, candles } = req.body
  const savedData = Stock.create({ ticker, candles })
  res.status(200).json(savedData)
})

export const getData = asyncHandler(async (req, res) => {
  const { ticker } = req.params
  const foundData = await Stock.findOne({ ticker: ticker })
  if (foundData) {
    res.status(200).json(foundData)

  }
  else {
    throw new Error('Stock data not found')
  }
})
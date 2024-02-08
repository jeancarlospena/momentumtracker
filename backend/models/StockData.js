const mongoose = require('mongoose')

const StockSchema = new mongoose.Schema({
  ticker: String,
  candles: Array
})


module.exports = mongoose.model('Stock', StockSchema)
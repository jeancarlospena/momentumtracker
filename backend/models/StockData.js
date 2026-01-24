import mongoose from 'mongoose'


const StockSchema = new mongoose.Schema({
  ticker: String,
  candles: Array
})


const Stock = mongoose.model('Stock', StockSchema)
export default Stock
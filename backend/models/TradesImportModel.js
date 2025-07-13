const mongoose = require('mongoose')

// const ImportSchema = new mongoose.Schema({
//   // accountName: { type: String, required: true, unique: true },
//   earliestDate: { type: Date, required: true },
//   latestDate: { type: Date, required: true },
//   ordersWithMetrics: [],
//   metrics: { winPercentage: Number, cumulativePNL: Number, averageGains: Number, averageLosses: Number, wins: Number, losses: Number }
// }, { timestamps: true })

const TradesImportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  importAccounts: {}
}, { timestamps: true })




module.exports = mongoose.model('Import', TradesImportSchema)
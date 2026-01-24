
import 'dotenv/config'
import express from "express"
import path from 'path'
const port = process.env.PORT || 3000;
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import errorHandler from './middleware/errorHandler.js'



import accountsRoutes from './routes/accountsRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import stockDataRoutes from './routes/stockDataRoutes.js'
import authRoutes from './routes/authRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import tradeRoutes from './routes/tradeRoutes.js'
import tradeAccountRoutes from './routes/tradeAccountRoutes.js'



const app = express();
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(cors())


const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`)
  next()
}

app.use(logRequestStart)



app.use('/api/accounts', accountsRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/stocks', stockDataRoutes)
app.use('/api/paypal', paymentRoutes)
app.use('/api/trade', tradeRoutes)
app.use('/api/trade-account', tradeAccountRoutes)


const __dirname2 = path.resolve()


// set react dist folder
app.use(express.static(path.join(__dirname2, '/frontend/dist')))

// redirect non /api routes to index.html
app.get('/*path', (req, res) => {
  res.sendFile(path.resolve(__dirname2, 'frontend', 'dist', 'index.html'))
})



app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => { console.log(`server running on port ${port}`) })
}).catch((error) => {
  console.log(error)
})

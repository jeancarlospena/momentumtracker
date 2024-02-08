require('dotenv').config()
const path = require('path')
const express = require("express")
const port = process.env.PORT || 3000;
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const errorHandler = require('./middleware/errorHandler.js')
const tradesRoutes = require("./routes/tradesRoutes.js")
const userRoutes = require('./routes/userRoutes.js')
const stockDataRoutes = require('./routes/stockDataRoutes.js')

const app = express();
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(cors())


const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`)
  next()
}

app.use(logRequestStart)

// app.use('/api/trades', tradesRoutes)
app.use('/api/user', userRoutes)
app.use('/api/stocks', stockDataRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => { console.log(`server running on port ${port}`) })
}).catch((error) => {
  console.log(error)
})

const __dirname2 = path.resolve()

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  // set react dist folder
  app.use(express.static(path.join(__dirname2, '/frontend/dist')))

  // redirect non /api routes to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname2, 'frontend', 'dist', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })

}



app.use(errorHandler)


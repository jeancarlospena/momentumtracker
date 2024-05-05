require('dotenv').config()
const path = require('path')
const express = require("express")
const port = process.env.PORT || 3000;
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const errorHandler = require('./middleware/errorHandler.js')
const tradesRoutes = require("./routes/tradesRoutes.js")


const accountsRoutes = require('./routes/accountsRoutes.js')
const profileRoutes = require('./routes/profileRoutes.js')
const stockDataRoutes = require('./routes/stockDataRoutes.js')
const authRoutes = require('./routes/authRoutes.js')

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


const __dirname2 = path.resolve()


// set react dist folder
app.use(express.static(path.join(__dirname2, '/frontend/dist')))

// redirect non /api routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname2, 'frontend', 'dist', 'index.html'))
})



app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => { console.log(`server running on port ${port}`) })
}).catch((error) => {
  console.log(error)
})

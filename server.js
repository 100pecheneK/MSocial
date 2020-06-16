const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const cors = require('cors')

// Create Server
const app = express()

// Connect to DataBase
connectDB()

// Init Middleware
app.use(express.json({extended: false}))
// TODO: Если не сработает CORS, то настроить OPTIONS https://expressjs.com/en/resources/middleware/cors.html
app.use(cors())

// Define Routes
app.use('/uploads', express.static('uploads'))
app.use('/api/test', require('./routes/api/test'))
app.use('/api/users', require('./routes/api/user'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server started on port ', PORT))

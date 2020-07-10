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
app.use(cors())

// Define Routes
app.use('/uploads', express.static('uploads'))
app.use('/api/test', require('./routes/api/test'))
app.use('/api/user', require('./routes/api/user/index'))
app.use('/api/profile', require('./routes/api/profile'))

// Define Errors catchers
app.use(function (req, res) {
  res.status(404).send('Sorry cant find that!')
})


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server started on port ', PORT))

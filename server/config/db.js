const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

/**
 * Connect to Mongo DB from config
 */
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log('Mongo DB Connected to ', db)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}

module.exports = connectDB

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema

/**
 * User rofile schema
 */
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  avatar: {
    type: String,
    default: 'uploads/default/default.jpg',
  },
  // User bio info
  bio: {
    type: String,
  },
  // Profile created date
  createdDate: {
    type: Date,
    default: Date.now,
  },
})

// Add paginate to Profile Schema
ProfileSchema.plugin(mongoosePaginate)

module.exports = Profile = mongoose.model('profile', ProfileSchema)

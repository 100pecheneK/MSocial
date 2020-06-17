const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  avatar: {
    type: String,
    default: 'uploads/default/default.jpg'
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})
ProfileSchema.plugin(mongoosePaginate)

module.exports = Profile = mongoose.model('profile', ProfileSchema)
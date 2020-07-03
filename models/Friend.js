const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema

const FriendSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  whiteList:{
    type: Array,
    default: []
  },
  inComingList:{
    type: Array,
    default: []
  },
  outComingList:{
    type: Array,
    default: []
  },
  blackList:{
    type: Array,
    default: []
  }
})

// Add paginate to User Schema
FriendSchema.plugin(mongoosePaginate)

module.exports = Friend = mongoose.model('friend', FriendSchema)
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

/**
 * User schema
 */
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // User`s tokens from all his devices
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  // User created date
  createdDate: {
    type: Date,
    default: Date.now,
  },
})

/**
 * Middleware
 * Hash password before user being created
 */
UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

/**
 * Method
 * Generating new auth token and save him to user`s tokens array
 * @returns token string
 */
UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id }, config.get('jwtSecret'))
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

/**
 * Static User model method witch finding user by email and password.
 * Throwing Error if user hasnt being founded or password is not matched
 * else returnig user obj
 */
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Неверные данные')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error('Неверные данные')
  }
  return user
}

// Add paginate to User Schema
UserSchema.plugin(mongoosePaginate)

module.exports = User = mongoose.model('user', UserSchema)

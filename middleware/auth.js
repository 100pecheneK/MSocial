const config = require('config')
const jwt = require('jsonwebtoken')
const errorsMsgs = require('../utils/errorsMsgs')
const sendUnauthorized = require('../utils/sendUnauthorized')
const User = require('../models/User')

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return sendUnauthorized(res, 'Нет токена')
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    sendUnauthorized(res, 'Нет авторизации')
  }

}
module.exports = auth
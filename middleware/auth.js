const config = require('config')
const jwt = require('jsonwebtoken')
const sendUnauthorized = require('../utils/sendStatus/sendUnauthorized')
const User = require('../models/User')

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return sendUnauthorized(res, 'Нет токена')
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    const userExists = await User.exists({_id: decoded._id, 'tokens.token': token})
    if (!userExists) {
      throw new Error()
    }
    req.userId = decoded._id
    req.token = token
    next()
  } catch (error) {
    sendUnauthorized(res, 'Нет авторизации')
  }

}
module.exports = auth
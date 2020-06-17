const config = require('config')
const jwt = require('jsonwebtoken')
const sendUnauthorized = require('../utils/sendUnauthorized')

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return sendUnauthorized(res, 'Нет токена')
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.userId = decoded._id
    req.token = token
    next()
  } catch (error) {
    sendUnauthorized(res, 'Нет авторизации')
  }

}
module.exports = auth
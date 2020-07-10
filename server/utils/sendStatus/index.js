const sendBadRequest = require('../../utils/sendStatus/sendBadRequest')
const sendServerError = require('../../utils/sendStatus/sendServerError')
const sendUnauthorized = require('../../utils/sendStatus/sendUnauthorized')

module.exports = {
  sendBadRequest,
  sendServerError,
  sendUnauthorized,
}
const errorsMsgs = require('../errorsMsgs')

/**
 *  Sending Unauthorized 401 to frontend
 * @param {responce obj} res
 * @param {string} error
 */
const sendUnauthorized = (res, error) => {
  res.status(401).json(errorsMsgs(error))
}
module.exports = sendUnauthorized

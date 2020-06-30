const errorsMsgs = require('../errorsMsgs')

/**
 * Sending Bad Request 400 to frontend
 * @param {responce obj} res
 * @param {String or [String]} error
 * @param  {...string} otherErrors
 */
const sendBadRequest = (res, error, ...otherErrors) => {
  const errors = Array.isArray(error)
    ? { errors: error }
    : errorsMsgs(error, ...otherErrors)
  return res.status(400).json(jsonErrors)
}

module.exports = sendBadRequest

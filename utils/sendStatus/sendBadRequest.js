const errorsMsgs = require('../errorsMsgs')

module.exports = (res, errors, ...otherErrors) => {
  const jsonErrors = Array.isArray(errors) ? {errors: errors} : errorsMsgs(errors, ...otherErrors)
  return res.status(400).json(jsonErrors)
}
const mongoose = require('mongoose')

/**
 * Cheking String for valid ObjectId
 * @param {string} idToCheck
 */
const checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ msg: 'Invalid ID' })
  next()
}

module.exports = checkObjectId

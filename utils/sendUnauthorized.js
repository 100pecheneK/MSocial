const errorsMsgs = require('./errorsMsgs')

module.exports = (res, error)=>{
  res.status(401).json(errorsMsgs(error))
}
const fs = require('fs')
const mkdirs = (...dirs) => dirs.forEach(dir => !fs.existsSync(dir) && fs.mkdirSync(dir, err => err && true))

module.exports = mkdirs
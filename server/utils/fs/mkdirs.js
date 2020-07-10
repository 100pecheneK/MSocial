const fs = require('fs')

/**
 * Syncly create dirs
 * Accepting path strings to dirs whitch would be created
 * @param  {strings} dirs
 */
const mkdirs = (...dirs) =>
  dirs.forEach(
    (dir) => !fs.existsSync(dir) && fs.mkdirSync(dir, (err) => err && true)
  )

module.exports = mkdirs

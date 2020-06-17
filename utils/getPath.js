const path = require('path')
const BASE_DIR = path.join(__dirname, '..')
const UPLOAD_DIR = path.join(BASE_DIR, 'uploads')

module.exports = {
  getUploadsPath: () => UPLOAD_DIR,
  getAvatarPath: avatar => path.join(BASE_DIR, avatar)
}
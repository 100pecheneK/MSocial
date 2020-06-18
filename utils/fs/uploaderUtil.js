const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const BASE_DIR = path.join(__dirname, '..', '..')
const UPLOAD_DIR = path.join(BASE_DIR, 'uploads')

const uploaderUtil = {
  uploads: () => UPLOAD_DIR,
  avatar: avatar => path.join(BASE_DIR, avatar),
  isNotDefaultFile: file => path.basename(file) !== 'default.jpg',
  removeProfileAvatar: function (avatar) {
    if (this.isNotDefaultFile(avatar)) {
      const avatarPath = this.avatar(avatar)
      fs.existsSync(avatarPath) && fs.unlinkSync(avatarPath)
    }
  },
  removeProfileDir: function (userId) {
    const userProfileDir = path.join(this.uploads(), 'profiles', userId)
    console.log(userProfileDir)
    rimraf(userProfileDir, {}, () => {
    })
  }
}

module.exports = uploaderUtil
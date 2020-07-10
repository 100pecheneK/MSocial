const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const BASE_DIR = path.join(__dirname, '..', '..')
const UPLOAD_DIR = path.join(BASE_DIR, 'uploads')

/**
 * Returning path to upload dir
 */
const getUploadPath = () => UPLOAD_DIR

/**
 * Returning full path to avatar in upload dir
 * @param {string} avatar
 */
const getAvatarPath = (avatar) => path.join(BASE_DIR, avatar)

/**
 * Returning true if filePath is not has basename 'default.jpg'
 * else returning false
 * @param {string} filePath
 */
const isNotDefaultFile = (filePath) => path.basename(filePath) !== 'default.jpg'

/**
 * Accepting avatar with path in upload dir
 * then removing avatar from upload dir
 * @param {string} avatar
 */
const removeProfileAvatar = (avatar) => {
  if (isNotDefaultFile(avatar)) {
    const avatarPath = getAvatarPath(avatar)
    fs.existsSync(avatarPath) && fs.unlinkSync(avatarPath)
  }
}

/**
 * Removing user dir from upload dir
 * @param {string} userId
 */
const removeProfileDir = (userId) => {
  const userProfileDir = path.join(getUploadPath(), 'profiles', userId)
  rimraf(userProfileDir, {}, () => {})
}

// TODO: rename 'upload' and 'avatar' in all project!!!
const uploaderUtil = {
  uploads: getUploadPath,
  avatar: getAvatarPath,
  isNotDefaultFile,
  removeProfileAvatar,
  removeProfileDir,
}

module.exports = uploaderUtil

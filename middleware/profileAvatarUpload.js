const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const { mkdirs, uploaderUtil } = require('../utils/fs')

/**
 * Multer storage settings
 * for uploading user`s Avatar
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsPath = uploaderUtil.uploads()
    const profilesPath = path.join(uploadsPath, 'profiles')
    const userProfilePath = path.join(profilesPath, req.userId)
    mkdirs(uploadsPath, profilesPath, userProfilePath)
    const dest = path.join('profiles', req.userId)
    cb(null, `./uploads/${dest}`)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const filename = new Date().toISOString() + uuidv4() + ext
    cb(null, filename)
  },
})

/**
 * Multer fileFiter settings
 * for uploading user`s Avatar
 */
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

/**
 * User`s avatar multer uploader
 */
const profileAvatarUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
})

module.exports = profileAvatarUpload

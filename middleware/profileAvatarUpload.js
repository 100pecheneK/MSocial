const path = require('path')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const {mkdirs, uploaderUtil} = require('../utils/fs')


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
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const profileAvatarUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
})


module.exports = profileAvatarUpload
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')

const mkdirs = dirs => dirs.forEach(dir => !fs.existsSync(dir) && fs.mkdirSync(dir, err => err && true))

const configurableUpload = (...folders) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      mkdirs(folders)
      const dest = path.join(...folders)
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

  return multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  })
}

module.exports = configurableUpload
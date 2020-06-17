const express = require('express')
const config = require('config')
const router = express.Router()
const path = require('path')
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const sendBadRequest = require('../../utils/sendBadRequest')
const sendServerError = require('../../utils/sendServerError')
const profileAvatarUpload = require('../../middleware/profileAvatarUpload')
const {getUploadsPath, getAvatarPath} = require('../../utils/getPath')
const fs = require('fs')

router.get(
  '/me',
  auth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({user: req.userId}).populate('user', ['name'])
      res.json(profile)
    } catch (e) {
      sendServerError(res, e.message)
    }
  })

router.post(
  '/me/avatar',
  [
    auth,
    profileAvatarUpload.single('avatar')
  ],
  async (req, res) => {
    try {
      const avatar = req.file
      if (!avatar) {
        return sendBadRequest(res, 'Аватар обязателен')
      }
      const profile = await Profile.findOne({user: req.userId})
      if (path.basename(profile.avatar) !== 'default.jpg') {
        const avatarPath = getAvatarPath(profile.avatar)
        fs.existsSync(avatarPath) && fs.unlinkSync(avatarPath)
      }
      profile.avatar = avatar.path
      profile.save()
      return res.json(profile)
    } catch (e) {
      console.error(e)
      res.status(500).send('Ошибка сервера')
    }
  }
)

router.post(
  '/me',
  auth,
  async (req, res) => {
    const {bio} = req.body
    // Build profile object
    const profileFields = {}
    profileFields.user = req.userId
    if (bio) profileFields.bio = bio

    try {
      const profile = await Profile.findOneAndUpdate(
        {user: req.userId},
        profileFields,
        {new: true}
      )
      return res.json(profile)
    } catch (e) {
      console.error(e)
      res.status(500).send('Ошибка сервера')
    }
  }
)

module.exports = router
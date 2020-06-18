// Express
const express = require('express')
// Middleware
const {auth, profileAvatarUpload} = require('../../middleware')
// Utils
const {uploaderUtil} = require('../../utils/fs')
const {sendBadRequest, sendServerError} = require('../../utils/sendStatus')
// Models
const {User, Profile} = require('../../models')

const router = express.Router()

router.get(
  '/me',
  auth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({user: req.userId}).populate('user', ['name'])
      res.json(profile)
    } catch (e) {
      sendServerError(res, e)
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
      uploaderUtil.removeProfileAvatar(profile.avatar)
      profile.avatar = avatar.path
      profile.save()
      return res.json(profile)
    } catch (e) {
      sendServerError(res, e)
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
      sendServerError(res, e)
    }
  }
)

router.delete(
  '/me',
  auth,
  async (req, res) => {
    try {
      // Remove profile and avatar
      const profile = await Profile.findOne({user: req.userId})
      uploaderUtil.removeProfileDir(req.userId)
      await profile.remove()

      // Remove User
      await User.findOneAndRemove({_id: req.userId})

      res.json({msg: 'Пользователь удалён'})
    } catch (e) {
      sendServerError(res, e)
    }
  })
module.exports = router
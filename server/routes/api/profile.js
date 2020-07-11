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


/**
 * @api {get} /profile/me User info
 * @apiVersion 1.0.0
 * @apiName User me
 * @apiGroup Profile
 * @apiDescription Get info of authenticated user
 * @apiPermission user
 * @apiHeader {String} Authorization Token of User.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk"
 *    }
 * @apiSuccess (200) {ObjectId} _id ID of User Profile.
 * @apiSuccess (200) {String} avatar Relative avatar url of user.
 * @apiSuccess (200) {Object} user User object.
 * @apiSuccess (200) {ObjectId} user._id ID of User.
 * @apiSuccess (200) {String} user.name Name of User.
 * @apiSuccess (200) {String} createdDate Date when profile has been created.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 Success
 *    {
 *      "_id": "5efc31e41b1fa004b99d3c37",
 *      "avatar": "uploads/default/default.jpg",
 *      "user": {
 *          "_id": "5efc31e41b1fa004b99d3c36",
 *          "name": "Misha"
 *      },
 *      "createdDate": "2020-07-01T06:49:08.649Z",
 *    }
 */
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

/**
 * @api {post} /profile/me/avatar Change user avatar
 * @apiVersion 1.0.0
 * @apiName User avatar
 * @apiGroup Profile
 * @apiDescription Change avatar of user
 * @apiPermission user
 * @apiHeader {String} Content-Type Multipart.
 * @apiHeader {String} Authorization Token of User.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
 *      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk"
 *    }
 * @apiParam {File{..5MB}} avatar User avatar
 * @apiSuccess (201) {String} Relative avatar url of user.
 * @apiSuccessExample {json} Create-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "avatar": "uploads/profiles/5efc31e41b1fa004b99d3c36/2020-07-01T08:54:10.878Z665bd1f3-7aa4-4250-a25f-2fc4a62e6c10.jpg"
 *    }
 * @apiError (400) {Object[]} errors Array of the errors objects.
 * @apiErrorExample {json} Bad Request-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors": [
 *        {
 *          "msg": "Аватар обязателен"
 *        }
 *      ]
 *    }
 */
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
      await profile.save()
      return res.status(201).json({avatar: profile.avatar})
    } catch (e) {
      sendServerError(res, e)
    }
  }
)

/**
 * @api {post} /profile/me Update User Profile
 * @apiVersion 1.0.0
 * @apiName Update User Profile
 * @apiGroup Profile
 * @apiDescription Create or update some fields in user profile
 * @apiPermission user
 * @apiHeader {String} Content-Type application/json.
 * @apiHeader {String} Authorization Token of User.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Content-Type": "application/json",
 *      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk"
 *    }
 * @apiParam {String} bio User bio info
 * @apiSuccess (201) {Object} user Profile owner.
 * @apiSuccess (201) {String} bit User bio.
 * @apiSuccessExample {json} Create-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "_id": "5efc31e41b1fa004b99d3c37",
 *      "user": {
 *        "_id": "5efc31e41b1fa004b99d3c36",
 *        "name": "Misha"
 *      },
 *      "createdDate": "2020-07-01T06:49:08.649Z",
 *      "__v": 0,
 *      "bio": "Моё био"
 *    }
 */
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
        {new: true},
      ).populate('user', ['name']).select('-avatar')
      return res.status(201).json(profile)
    } catch (e) {
      sendServerError(res, e)
    }
  }
)

/**
 * @api {delete} /profile/me Delete user account
 * @apiVersion 1.0.0
 * @apiName Delete user account
 * @apiGroup Profile
 * @apiDescription Delete User, User folder and Profile
 * @apiPermission user
 * @apiHeader {String} Authorization Token of User.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk"
 *    }
 * @apiSuccess (200) {String} Success message.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "msg": "Пользователь удалён"
 *    }
 */
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
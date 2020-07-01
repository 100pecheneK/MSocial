// Express
const express = require('express')
const {check, validationResult} = require('express-validator')
// Middleware
const {auth} = require('../../../middleware')
// Utils
const {sendBadRequest, sendServerError} = require('../../../utils/sendStatus')
// Models
const {User, Profile} = require('../../../models')

const router = express.Router()


/**
 * @api {post} /user/auth/register Register user
 * @apiVersion 0.1.0
 * @apiName Register
 * @apiGroup Authentication
 * @apiDescription Register new user
 * @apiHeader {String} Content-Type application/json.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Content-Type": "application/json"
 *    }
 *
 * @apiParam {String} name Name of the User.
 * @apiParam {String} email Email of the User.
 * @apiParam {String{6..}} password Password of the User.
 *
 * @apiSuccess (201) {String} Token of the registered User.
 * @apiError (400) {Object[]} errors Array of the errors objects.
 * @apiSuccessExample {json} Created-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWZjMzFlNDFiMWZhMDA0Yjk5ZDNjMzYiLCJpYXQiOjE1OTM1ODYxNDh9.z81zNeJXZviRQew-LJi5W-rqCf8XcDHL6eEn37jEqy8"
 *    }
 * @apiErrorExample {json} Bad-Request-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors": [
 *        {
 *          "msg": "Имя обязательно",
 *          "param": "name",
 *          "location": "body"
 *        },
 *        {
 *          "msg": "Пожалуйста, укажите верный Email",
 *          "param": "email",
 *          "location": "body"
 *        },
 *        {
 *          "msg": "Пожалуйста, введите пароль с 6 или более символами",
 *          "param": "password",
 *          "location": "body"
 *        }
 *      ]
 *    }
 */
router.post(
  '/register',
  [
    check('name', 'Имя обязательно').not().isEmpty(),
    check('email', 'Пожалуйста, укажите верный Email').isEmail(),
    check(
      'password',
      'Пожалуйста, введите пароль с 6 или более символами'
    ).isLength({min: 6}),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    try {
      let user = await User.findOne({email: req.body.email})
      if (user) {
        return sendBadRequest(res, 'Пользователь с таким Email уже существует')
      }

      // Create user
      user = new User(req.body)
      await user.save()

      // Create profile
      const profile = new Profile({
        user: user.id,
      })
      await profile.save()

      // Generate token
      const token = await user.generateAuthToken()

      res.status(201).json({token})
    } catch (error) {
      sendBadRequest(res, error)
    }
  }
)

/**
 * @api {post} /user/auth/login Authenticate user
 * @apiVersion 0.1.0
 * @apiName Login
 * @apiGroup Authentication
 * @apiDescription Authenticate user
 * @apiHeader {String} Content-Type application/json.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Content-Type": "application/json"
 *    }
 *
 * @apiParam {String} email Email of the User.
 * @apiParam {String} password Password of the User.
 *
 * @apiSuccess (201) {String} Token of the registered User.
 * @apiError (400) {Object[]} errors Array of the errors objects.
 * @apiSuccessExample {json} Created-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWZjMzFlNDFiMWZhMDA0Yjk5ZDNjMzYiLCJpYXQiOjE1OTM1ODYxNDh9.z81zNeJXZviRQew-LJi5W-rqCf8XcDHL6eEn37jEqy8"
 *    }
 * @apiErrorExample {json} Bad-Request-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors": [
 *        {
 *          "msg": "Пожалуйста, укажите верный Email",
 *          "param": "email",
 *          "location": "body"
 *        },
 *        {
 *          "msg": "Пароль обязателен",
 *          "param": "password",
 *          "location": "body"
 *        }
 *      ]
 *    }
 * @apiErrorExample {json} Bad-Request-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors": [
 *        {
 *          "msg": "Неверные данные"
 *        }
 *      ]
 *    }
 */
router.post(
  '/login',
  [
    check('email', 'Пожалуйста, укажите верный Email').isEmail(),
    check('password', 'Пароль обязателен').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return sendBadRequest(res, errors.array())
    }

    try {
      const {email, password} = req.body

      // Authenticate or throw Error
      const user = await User.findByCredentials(email, password)
      const token = await user.generateAuthToken()
      res.json({token})
    } catch (e) {
      // catch Error('Неверные данные')
      sendBadRequest(res, e.message)
    }
  }
)

/**
 * @api {get} /user/auth/logout Logout user
 * @apiVersion 0.1.0
 * @apiName Logout
 * @apiGroup Authentication
 * @apiDescription Logout user from current device
 * @apiPermission user
 * @apiHeader {String} Content-Type application/json.
 * @apiHeader {String} Authorization Token of User.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Content-Type": "application/json",
 *      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk"
 *    }
 * @apiSuccess (200) {String} Success message.
 * @apiError (400) {Object[]} errors Array of the errors objects.
 * @apiError (401) {Object[]} errors Array of the errors objects.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "msg": "Успешный выход"
 *    }
 */
router.get('/logout', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    // Remove token from current device
    user.tokens = user.tokens.filter((token) => token.token !== req.token)
    await user.save()

    res.json({msg: 'Успешный выход'})
  } catch (e) {
    sendServerError(res, e)
  }
})

/**
 * @api {get} /user/auth/logoutall Logout user everywhere
 * @apiVersion 0.1.0
 * @apiName Logout All
 * @apiGroup Authentication
 * @apiDescription Logout user from all devices
 * @apiPermission user
 * @apiHeader {String} Content-Type application/json.
 * @apiHeader {String} Authorization Token of User.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Content-Type": "application/json",
 *      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk"
 *    }
 * @apiSuccess (200) {String} Success message.
 * @apiError (400) {Object[]} errors Array of the errors objects.
 * @apiError (401) {Object[]} errors Array of the errors objects.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "msg": "Успешный выход со всех устройств"
 *    }
 */
router.get('/logoutall', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    // Remove all tokens
    user.tokens.splice(0, user.tokens.length)

    await user.save()
    res.json({msg: 'Успешный выход со всех устройств'})
  } catch (error) {
    sendServerError(res, error)
  }
})

module.exports = router

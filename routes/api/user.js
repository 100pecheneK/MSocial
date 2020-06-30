// Express
const express = require('express')
const { check, validationResult } = require('express-validator')
// Middleware
const { auth } = require('../../middleware')
// Utils
const { sendBadRequest, sendServerError } = require('../../utils/sendStatus')
// Models
const { User, Profile } = require('../../models')

const router = express.Router()

/**
 * Register user with Email, name and password(min: 6 symb)
 * @returns {errors: [msg: 'error msg']}
 * @returns {'token': 'hlkhjk1@#*hlkjasd'}
 */
router.post(
  '/register',
  [
    check('name', 'Имя обязательно').not().isEmpty(),
    check('email', 'Пожалуйста, укажите верный Email').isEmail(),
    check(
      'password',
      'Пожалуйста, введите пароль с 6 или более символами'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      let user = await User.findOne({ email: req.body.email })
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

      res.status(201).json({ token })
    } catch (error) {
      sendBadRequest(res, error)
    }
  }
)

/**
 * Aythenticate user with email and password
 * @returns {errors: [msg: 'error msg']}
 * @returns {'token': 'hlkhjk1@#*hlkjasd'}
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
      const { email, password } = req.body

      // Authenticate or throw Error
      const user = await User.findByCredentials(email, password)
      const token = await user.generateAuthToken()
      res.json({ token })
    } catch (e) {
      // catch Error('Неверные данные')
      sendBadRequest(res, e.message)
    }
  }
)

/**
 * Logout authenticated user from current device
 * @returns {msg: 'Успешный выход'}
 */
router.post('/logout', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    // Remove token from current device
    user.tokens = user.tokens.filter((token) => token.token !== req.token)
    await user.save()

    res.json({ msg: 'Успешный выход' })
  } catch (e) {
    sendServerError(res, e)
  }
})

/**
 * Logout authenticated user from all devices
 * @returns {msg: 'Успешный выход со всех устройств'}
 */
router.post('/logoutall', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    // Remove all tokens
    user.tokens.splice(0, user.tokens.length)

    await user.save()
    res.json({ msg: 'Успешный выход со всех устройств' })
  } catch (error) {
    sendServerError(res, error)
  }
})

module.exports = router

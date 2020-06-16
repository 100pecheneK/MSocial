const express = require('express')
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')
const sendBadRequest = require('../../utils/sendBadRequest')
const sendServerError = require('../../utils/sendServerError')
const User = require('../../models/User')
const router = express.Router()

router.post(
  '/register',
  [
    check('name',
      'Имя обязательно')
      .not().isEmpty(),
    check('email',
      'Пожалуйста, укажите верный Email')
      .isEmail(),
    check('password',
      'Пожалуйста, введите пароль с 6 или более символами')
      .isLength({min: 6})
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
      // Создание пользователя
      user = new User(req.body)
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).json({user, token})
    } catch (error) {
      sendBadRequest(res, error)
    }
  })

router.post(
  '/login',
  [
    check('email',
      'Пожалуйста, укажите верный Email')
      .isEmail(),
    check('password',
      'Пароль обязателен')
      .not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return sendBadRequest(res, errors.array())
    }

    try {
      const {email, password} = req.body
      // Авторизация или throw Error('Неверные данные')
      const user = await User.findByCredentials(email, password)
      const token = await user.generateAuthToken()
      res.json({user, token})
    } catch (error) {
      // Поймает ошибку Error('Неверные данные')
      return sendBadRequest(res, error.message)
    }
  })

router.get('/me', auth, async (req, res) => {
  // TODO: перенести в отдельный файл profile.js
  res.json(req.user)
})

router.post(
  '/logout',
  auth,
  async (req, res) => {
    try {
      // Выход пользователя с одного устройства - останутся все, кроме текущего
      req.user.tokens = req.user.tokens
        .filter(token => token.token !== req.token)
      await req.user.save()
      res.send('Успешный выход')
    } catch (error) {
      sendServerError(res, error)
    }
  })

router.post(
  '/logoutall',
  auth,
  async (req, res) => {
    try {
      // Выход со всех устройств
      req.user.tokens.splice(0, req.user.tokens.length)
      await req.user.save()
      res.send('Успешный выход со всех устройств')
    } catch (error) {
      sendServerError(res, error)
    }
  })
module.exports = router
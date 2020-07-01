const express = require('express')
const router = express.Router()

/**
 * @apiDefine user Authenticated User
 * User with valid token
 */

router.use('/auth', require('./authentication'))

module.exports = router
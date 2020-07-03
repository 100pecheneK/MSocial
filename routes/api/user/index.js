const express = require('express')
const router = express.Router()

/**
 * @apiDefine user Authenticated User
 * User with valid token
 */

router.use('/auth', require('./authentication'))
router.use('/friend', require('./friend'))

module.exports = router
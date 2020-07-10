const express = require('express')
const router = express.Router()

/**
 * Test route
 * Only for check, that server are working
 */
router.get('/', (req, res) => {
  res.send('Server is working!!!')
})

module.exports = router

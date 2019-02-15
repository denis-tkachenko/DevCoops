const router = require('express').Router()
const login = require('./login')

router.post('/', login.PostLogin)

module.exports = router
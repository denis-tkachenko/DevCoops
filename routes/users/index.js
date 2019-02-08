const router = require('express').Router()
const users = require('./users')

router.get('/test', users.GetTest)
router.post('/register', users.PostRegisterUser)

module.exports = router
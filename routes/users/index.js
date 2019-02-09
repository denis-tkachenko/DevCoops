const router = require('express').Router()
const users = require('./users')
const passport = require('passport')

router.post('/register', users.PostRegisterUser)
router.post('/login', users.PostLogin)
router.get('/current', passport.authenticate('jwt', {session: false}), users.GetTest)

module.exports = router
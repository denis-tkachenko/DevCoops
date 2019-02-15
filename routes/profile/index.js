const router = require('express').Router()
const passport = require('passport')
const profile = require('./profile')

router.get('/', passport.authenticate('jwt', {session: false}), profile.GetProfile)
router.post('/', passport.authenticate('jwt', {session: false}), profile.PostUserProfile)

module.exports = router
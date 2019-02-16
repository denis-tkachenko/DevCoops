const router = require('express').Router()
const passport = require('passport')
const profile = require('./profile')

router.get('/', passport.authenticate('jwt', {session: false}), profile.GetUserProfile)
router.get('/all', profile.GetAllProfiles)
router.get('/handle/:handle', profile.GetProfileByHandle)
router.get('/:profileId', profile.GetProfileById)
router.post('/', passport.authenticate('jwt', {session: false}), profile.PostUserProfile)

module.exports = router
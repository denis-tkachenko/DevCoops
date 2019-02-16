const router = require('express').Router()
const passport = require('passport')
const profile = require('./profile')

router.get('/', passport.authenticate('jwt', {session: false}), profile.GetUserProfile)
router.delete('/:profileId', passport.authenticate('jwt', {session: false}), profile.DeleteProfile)
router.get('/all', profile.GetAllProfiles)
router.get('/:profileId', profile.GetProfileById)
router.get('/handle/:handle', profile.GetProfileByHandle)
router.post('/', passport.authenticate('jwt', {session: false}), profile.PostUserProfile)
router.post('/experiance', passport.authenticate('jwt', {session: false}), profile.PostAddExperience)
router.delete('/experience/:expId', passport.authenticate('jwt', {session: false}), profile.DeleteExperience)
router.post('/education', passport.authenticate('jwt', {session: false}), profile.PostAddEducation)
router.delete('/education/:educationId', passport.authenticate('jwt', {session: false}), profile.DeleteEducation)

module.exports = router
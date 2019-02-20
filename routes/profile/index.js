const router = require('express').Router()
const passport = require('passport')
const profile = require('./profile')

router.get('/', passport.authenticate('jwt', {session: false}), profile.GetUserProfile)
router.get('/all', profile.GetAllProfiles)
router.get('/:profileId', profile.GetProfileById)
router.get('/handle/:handle', profile.GetProfileByHandle)
router.post('/', passport.authenticate('jwt', {session: false}), profile.PostUserProfile)
router.post('/education', passport.authenticate('jwt', {session: false}), profile.PostAddEducation)
router.post('/experiance', passport.authenticate('jwt', {session: false}), profile.PostAddExperience)
router.delete('/', passport.authenticate('jwt', {session: false}), profile.SetUserProfileStatus)
router.delete('/experience/:experienceId', passport.authenticate('jwt', {session: false}), profile.DeleteExperience)
router.delete('/education/:educationId', passport.authenticate('jwt', {session: false}), profile.DeleteEducation)

module.exports = router
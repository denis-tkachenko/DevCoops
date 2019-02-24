const passport = require('passport')
const router = require('express').Router()
const posts = require('./posts')

router.get('/', passport.authenticate('jwt', {session: false}), posts.GetPostsByUserId)
router.post('/', passport.authenticate('jwt', {session: false}), posts.PostAddPost)

module.exports = router
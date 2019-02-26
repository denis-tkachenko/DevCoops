const passport = require('passport')
const router = require('express').Router()
const posts = require('./posts')

router.get('/', passport.authenticate('jwt', {session: false}), posts.GetAllPosts)
router.get('/userposts', passport.authenticate('jwt', {session: false}), posts.GetPostsByUserId)
router.get('/:postId', passport.authenticate('jwt', {session: false}), posts.GetPostsById)
router.post('/', passport.authenticate('jwt', {session: false}), posts.PostAddPost)
router.post('/edit/:postId', passport.authenticate('jwt', {session: false}), posts.PostEditPost)
router.post('/comment/:postId', passport.authenticate('jwt', {session: false}), posts.PostAddComment)
router.post('/like/:postId', passport.authenticate('jwt', {session: false}), posts.PostLike)
router.post('/dislike/:postId', passport.authenticate('jwt', {session: false}), posts.PostDislike)
router.delete('/:postId', passport.authenticate('jwt', {session: false}), posts.DeletePost)
router.delete('/comment/:postId', passport.authenticate('jwt', {session: false}), posts.DeleteComment)

module.exports = router
const postsLogic = require('../../logic/posts/posts')
const validations = require('../../validation/posts')
const utilities = require('../../utilities/utilities')
const to = utilities.to
const formatLogicError = utilities.formatLogicError

exports.PostAddPost = async (req, res) => {
  const post = req.body

  const [errors, isValid] = validations.validatePostInput(post)
  if(!isValid) return res.status(400).json(errors)
  
  const [err, addPost] = await to(postsLogic.AddPost(req.user, post))
  if(err) return res.status(500).json(formatLogicError('post', `Can't add this post`))
  
  res.status(200).json(addPost)
}

exports.GetPostsByUserId = async (req, res) => {
  const [err, posts] = await to(postsLogic.GetPostsByUserId(req.user._id))
  if(err) return res.status(500).json(formatLogicError('posts', `Can't add post`))

  res.status(200).json(posts)
}

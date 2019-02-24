const postsLogic = require('../../logic/posts/posts')
const validations = require('../../validation/posts')
const To = require('../../utilities/utilities').To

exports.PostAddPost = async (req, res) => {
  const post = req.body

  const [errors, isValid] = validations.ValidatePostInput(post)
  if(!isValid) return res.status(400).json(errors)
  
  const [err, addPost] = await To(postsLogic.AddPost(req.user, post))
  if(err) return res.status(500).json({posts: `Can't add this post`})
  
  res.status(200).json(addPost)
}

exports.GetPostsByUserId = async (req, res) => {
  const [err, posts] = await To(postsLogic.GetPostsByUserId(req.user._id))
  if(err) return res.status(500).json({posts: `Can't add post`})

  res.status(200).json(posts)
}

exports.GetPostsById = async (req, res) => {
  const {postId} = req.params
  if(!postId) return res.status(400)

  const [err, posts] = await To(postsLogic.GetPostsById(postId))
  if(err) return res.status(500).json({posts: `Can't add post`})

  res.status(200).json(posts)
}

exports.PostEditPost = async (req, res) => {
  const {postId} = req.params
  if(!postId) return res.status(400).json({posts: `Can't edit post`})
  
  const data = req.body
  const [errors, isValid] = validations.ValidatePostInput(data)
  if(!isValid) return res.status(400).json(errors)

  const [err, editedPost] = await To(postsLogic.EditPost(postId, data))
  if(err) return res.status(500).json({posts: `Can't edit post`})

  res.sendStatus(200)
}
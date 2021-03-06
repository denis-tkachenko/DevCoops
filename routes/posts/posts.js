const postsLogic = require('../../logic/posts/posts')
const validations = require('../../validation/posts')
const to = require('../../utilities/utilities').To

exports.GetAllPosts = async (req, res) => {
  const result = await to(postsLogic.GetAllPosts())
  if(!result) return res.status(500).json({posts: 'Something went wrong'})

  res.status(200).json(result)
}

exports.GetPostsByUserId = async (req, res) => {
  const result = await to(postsLogic.GetPostsByUserId(req.user._id))
  if(!result) return res.status(500).json({posts: 'No post found with that ID'})

  res.status(200).json(result)
}

exports.GetPostsById = async (req, res) => {
  const {postId} = req.params
  if(!postId) return res.status(400)

  const result = await to(postsLogic.GetPostsById(postId))
  if(!result) return res.status(500).json({posts: `Can't add post`})

  res.status(200).json(result)
}

exports.PostAddPost = async (req, res) => {
  const post = req.body

  const [errors, isValid] = validations.ValidatePostInput(post.text)
  if(!isValid) return res.status(400).json(errors)
  
  const result = await to(postsLogic.AddPost(req.user, post))
  if(!result) return res.status(500).json({posts: `Can't add this post`})
  
  res.sendStatus(200)
}

exports.PostEditPost = async (req, res) => {
  const {postId} = req.params
  if(!postId) return res.status(400).json({posts: `Can't edit post`})
  
  const {text} = req.body
  const [errors, isValid] = validations.ValidatePostInput(text)
  if(!isValid) return res.status(400).json(errors)

  const result = await to(postsLogic.EditPost(postId, text))
  if(!result) return res.status(500).json({posts: `Can't edit post`})

  res.sendStatus(200)
}

exports.PostAddComment = async (req, res) => {
  const {postId} = req.params
  if(!postId) return res.status(400).json({posts: `Can't add comment`})

  const {text} = req.body
  const [errors, isValid] = validations.ValidatePostInput(text)
  if(!isValid) return res.status(400).json(errors)

  const result = await to(postsLogic.AddPostComment(postId, text, req.user._id))
  if(!result) return res.status(500).json({posts: `Can't add comment`})

  res.sendStatus(200)
}

exports.PostLike = async (req, res) => {
  const {postId} = req.params, userId = req.user._id
  if(!postId) return res.status(400).json({posts: 'No post for that ID'})

  const result = await to(postsLogic.LikePost(postId, userId))
  if(!result) {
    return res.status(404).json(err)
  }
  else if(result.err) {
    return res.status(500).json({posts: 'Somthing went wrong!'})
  }

  res.sendStatus(200)
}

exports.PostDislike = async (req, res) => {
  const {postId} = req.params, userId = req.user._id
  if(!postId) return res.status(400).json({posts: 'No post for that ID'})

  const result = await to(postsLogic.DislikePost(postId, userId))
  if(!result) {
    return res.status(404).json(err)
  }
  else if(result.err) {
    return res.status(500).json({posts: 'Somthing went wrong!'})
  }

  res.sendStatus(200)
}

exports.DeletePost = async (req, res) => {
  const {postId} = req.params, userId = req.user._id
  if(!postId) return res.status(400).json({posts: 'No post for that ID'})

  const result = await to(postsLogic.DeletePost(postId, userId))
  if(!result) return res.status(500).json({posts: 'Somthing went wrong!'})

  res.sendStatus(200)
}

exports.DeleteComment = async (req, res) => {
  const {postId} = req.params, userId = req.user._id
  if(!postId) return res.status(400).json({posts: 'No post for that ID'})

  const result = await to(postsLogic.DeleteComment(postId, userId))
  if(!result) return res.status(500).json({posts: 'Somthing went wrong!'})

  res.sendStatus(200)
}
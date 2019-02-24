const consoleAndReject = require('../../utilities/utilities').ConsoleAndReject
const postsRepository = require('../../data/posts/posts')
const moment = require('moment')
const utilities = require('../../utilities/utilities')
const To = utilities.To
const ConsoleAndReject = utilities.ConsoleAndReject

exports.AddPost = (user, post) => {
  post.user =  user._id,
  post.name = user.name
  post.avatar = post.avatar
  post._edited = [],
  post._deleted = false

  return postsRepository.AddPost(post)
}

exports.GetPostsByUserId = userId => postsRepository.GetPostsByUserId(userId)

exports.GetPostsById = postId => postsRepository.GetPostsById(postId)

exports.EditPost = async (postId, text) => {
  const [postErr, post] = await To(postsRepository.GetPostsById(postId))
  if(postErr) return ConsoleAndReject(postErr)
  const edited = {
    date: moment().toDate(),
    previousText: post.text
  }

  const [updateErr, updatePost] = await To(postsRepository.UpdatePostText(postId, text, edited))
  if(updateErr) return ConsoleAndReject(updateErr)

  return Promise.resolve()
}

exports.AddPostComment = async (postId, text, userId) => {
  const comment = {
    user: userId,
    text: text,
    _created: moment().toDate(),
  }

  const [updateErr, updatePost] = await To(postsRepository.AddPostComment(postId, comment))
  if(updateErr) return ConsoleAndReject(updateErr)

  return Promise.resolve()
}
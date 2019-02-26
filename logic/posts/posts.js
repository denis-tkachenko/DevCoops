const consoleAndReject = require('../../utilities/utilities').ConsoleAndReject
const postsRepository = require('../../data/posts/posts')
const moment = require('moment')
const utilities = require('../../utilities/utilities')
const to = utilities.To
const ConsoleAndReject = utilities.ConsoleAndReject

exports.AddPost = async (user, post) => {
  post.user =  user._id,
  post.name = user.name
  post.avatar = post.avatar 
  post._edited = [],
  post._deleted = false

  const [err, result] = await to(postsRepository.AddPost(post))
  if(err) return ConsoleAndReject(err)

  return Promise.resolve()
}

exports.GetAllPosts = () => postsRepository.GetAllPosts()

exports.GetPostsByUserId = userId => postsRepository.GetPostsByUserId(userId)

exports.GetPostsById = postId => postsRepository.GetPostsById(postId)

exports.EditPost = async (postId, text) => {
  const [postErr, post] = await to(postsRepository.GetPostsById(postId))
  if(postErr) return ConsoleAndReject(postErr)
  const edited = {
    date: moment().toDate(),
    previousText: post.text
  }

  const [err, result] = await to(postsRepository.UpdatePostText(postId, text, edited))
  if(err) return ConsoleAndReject(err)

  return Promise.resolve()
}

exports.AddPostComment = async (postId, text, userId) => {
  const comment = {
    user: userId,
    text: text,
    _created: moment().toDate(),
  }

  const [err, result] = await to(postsRepository.AddPostComment(postId, comment))
  if(err) return ConsoleAndReject(err)

  return Promise.resolve()
}

exports.LikePost = async (postId, userId) => {
  const [postErr, post] = await to(postsRepository.GetPostsById(postId))
  if(postErr) return ConsoleAndReject(postErr)
  if(!post) return  Promise.reject({posts: `No post with this ID`})

  if(post.likes.find(like => like.toString() === userId.toString())) {
    return Promise.reject({posts: `You already liked this post`})
  }
  else if(post.dislikes.find(dislike => dislike.toString() === userId.toString())) {// remove dislike
    const [err, result] = await to(postsRepository.PullFromArrayByKey('dislikes', postId, userId))
    if(err) return ConsoleAndReject(err)
  }
  else {// add like
    const [err, result] = await to(postsRepository.PushToArrayByKey('likes', postId, userId))
    if(err) return ConsoleAndReject(err) 
  }

  return Promise.resolve()
}

exports.DislikePost = async (postId, userId) => {
  const [postErr, post] = await to(postsRepository.GetPostsById(postId))
  if(postErr) return ConsoleAndReject(postErr)
  if(!post) return  Promise.reject({posts: `No post with this ID`})
    
  if(post.dislikes.find(dislike => dislike.toString() === userId.toString())) {
    return Promise.reject({posts: `You already dislike this post`})
  }
  else if(post.likes.find(like => like.toString() === userId.toString())) {// remove like
    const [err, result] = await to(postsRepository.PullFromArrayByKey('likes', postId, userId))
    if(err) return ConsoleAndReject(err)
  }
  else {// add dislike
    const [err, result] = await to(postsRepository.PushToArrayByKey('dislikes', postId, userId))
    if(err) return ConsoleAndReject(err) 
  }

  return Promise.resolve()
}

exports.DeletePost = async (postId, userId) => {
  const [err, result] = await to(postsRepository.DeletePost(postId, userId))
  if(err) return ConsoleAndReject(err)

  return Promise.resolve()
}

exports.DeleteComment = async (postId, userId) => {
  const [err, result] = await to(postsRepository.PullFromArrayByKey('comment', postId, {use: userId}))
  if(err) return ConsoleAndReject(err)

  return Promise.resolve()
}
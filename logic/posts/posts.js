const postsRepository = require('../../data/posts/posts')
const moment = require('moment')
const to = require('../../utilities/utilities').To

exports.AddPost = async (user, post) => {
  post.user =  user._id,
  post.name = user.name
  post.avatar = post.avatar 
  post._edited = [],
  post._deleted = false

  return postsRepository.AddPost(post)
}

exports.GetAllPosts = () => postsRepository.GetAllPosts()

exports.GetPostsByUserId = userId => postsRepository.GetPostsByUserId(userId)

exports.GetPostsById = postId => postsRepository.GetPostsById(postId)

exports.EditPost = async (postId, text) => {
  const post = await to(postsRepository.GetPostsById(postId))
  if(!post) return null 

  const edited = {
    date: moment().toDate(),
    previousText: post.text
  }

  return postsRepository.UpdatePostTextAndEdited(postId, text, edited)
}

exports.AddPostComment = async (postId, text, userId) => {
  const comment = {
    user: userId,
    text: text,
    _created: moment().toDate(),
  }

  return postsRepository.AddPostComment(postId, comment)
}

exports.LikePost = async (postId, userId) => {
  const post = await to(postsRepository.GetPostsById(postId))
  if(!post) return {err: `No post with this ID`}

  if(post.likes.find(like => like.toString() === userId.toString())) {
    return {err: `You already liked this post`}
  }
  else if(post.dislikes.find(dislike => dislike.toString() === userId.toString())) {// remove dislike
    return postsRepository.PullFromArrayByKey('dislikes', postId, userId)
  }
  
  // add like
  return postsRepository.PushToArrayByKey('likes', postId, userId)
}

exports.DislikePost = async (postId, userId) => {
  const post = await to(postsRepository.GetPostsById(postId))
  if(!post) return {err: `No post with this ID`}
    
  if(post.dislikes.find(dislike => dislike.toString() === userId.toString())) {
    return {err: `You already dislike this post`}
  }
  else if(post.likes.find(like => like.toString() === userId.toString())) {// remove like
    return postsRepository.PullFromArrayByKey('likes', postId, userId)
  }
  
  // add dislike
  return postsRepository.PushToArrayByKey('dislikes', postId, userId)
}

exports.DeletePost = (postId, userId) => postsRepository.DeletePost(postId, userId)

exports.DeleteComment = (postId, userId) => postsRepository.PullFromArrayByKey('comment', postId, {use: userId})
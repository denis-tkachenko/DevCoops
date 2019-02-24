const postsRepository = require('../../data/posts/posts')
const initialiseObjectFields = require('../../utilities/utilities').initialiseObjectFields
const moment = require('moment')

exports.AddPost = (user, post) => {
  post.user =  user._id,
  post.name = user.name
  post._edited = [],
  post._deleted = false

  return postsRepository.AddPost(post)
}

exports.GetPostsByUserId = userId => postsRepository.GetPostsByUserId(userId)
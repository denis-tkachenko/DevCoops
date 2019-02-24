const postsRepository = require('../../data/posts/posts')
const initialiseObjectFields = require('../../utilities/utilities').initialiseObjectFields
const moment = require('moment')

exports.AddPost = (userId, text) => {
  return postsRepository.AddPost({
    text: text,
    user: userId,
    _edited: [],
    _deleted: false
  })
}

exports.GetPostsByUserId = userId => postsRepository.GetPostsByUserId(userId)
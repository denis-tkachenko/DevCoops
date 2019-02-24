const isEmpty = require('../utilities/utilities').isEmpty

exports.validatePostInput = post => {
  const errors = {}

  if(isEmpty(post.text)) errors.status = 'Text filed is required'
  if(isEmpty(post.avatar)) errors.avatar = 'Oops.. something went wrong!'

  return [errors, isEmpty(errors)]
}
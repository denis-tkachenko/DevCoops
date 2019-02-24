const Validator = require('validator')
const isEmpty = require('../utilities/utilities').IsEmpty

exports.ValidatePostInput = post => {
  const errors = {}

  if(isEmpty(post.text)) errors.text = 'Text filed is required'
  if(!isEmpty(post.text) && !Validator.isLength(post.text, {min: 3, max: 300})) errors.text = 'Post must be between 2 and 300 characters'

  return [errors, isEmpty(errors)]
}
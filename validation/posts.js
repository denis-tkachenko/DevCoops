const Validator = require('validator')
const isEmpty = require('../utilities/utilities').IsEmpty

exports.ValidatePostInput = text => {
  const errors = {}

  if(isEmpty(text)) errors.text = 'Text filed is required'
  if(!isEmpty(text) && !Validator.isLength(text, {min: 3, max: 300})) errors.text = 'Post must be between 2 and 300 characters'

  return [errors, isEmpty(errors)]
}
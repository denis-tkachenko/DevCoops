const Validator = require('validator')
const isEmpty = require('../utilities/utilities').isEmpty

exports.validateProfileInput = data => {
  let errors = {}
  
  data.handle = !isEmpty(data.handle)? data.handle: ''
  if(!Validator.isLength(data.handle, {min: 2, max:40})) errors.handle = 'Handel needs to be between 2 and 40 characters'
  if(Validator.isEmpty(data.handle)) errors.handle = 'Profile hendel is required'

  data.status = !isEmpty(data.status)? data.status: ''
  if(Validator.isEmpty(data.status)) errors.status = 'Stutus filed is required'

  data.skills = !isEmpty(data.skills)? data.skills: ''
  if(Validator.isEmpty(data.skills)) errors.skills = 'Skills filed is required'

  if(!isEmpty(data.website) && !Validator.isURL(data.website)) errors.website = 'Not a valid URL'

  if(!isEmpty(data.youtube) && !Validator.isURL(data.youtube)) errors.youtube = 'Not a valid URL'
  if(!isEmpty(data.twitter) && !Validator.isURL(data.twitter)) errors.twitter = 'Not a valid URL'
  if(!isEmpty(data.facebook) && !Validator.isURL(data.facebook)) errors.facebook = 'Not a valid URL'
  if(!isEmpty(data.linkdin) && !Validator.isURL(data.linkdin)) errors.linkdin = 'Not a valid URL'
  if(!isEmpty(data.instagram) && !Validator.isURL(data.instagram)) errors.instagram = 'Not a valid URL'

  return {errors, isValid: isEmpty(errors)}
}
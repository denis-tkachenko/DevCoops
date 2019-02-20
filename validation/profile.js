const Validator = require('validator')
const initialiseObjectFields = require('../utilities/utilities').initialiseObjectFields
const isEmpty = require('../utilities/utilities').isEmpty

exports.validateProfileInput = data => {
  const socialMedias = ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram']
  const errors = {}

  initialiseObjectFields(['handle', 'status', 'skills'], data, '')
  
  if(!Validator.isLength(data.handle, {min: 2, max:40})) errors.handle = 'Handel needs to be between 2 and 40 characters'
  if(Validator.isEmpty(data.handle)) errors.handle = 'Profile hendel is required'
  if(Validator.isEmpty(data.status)) errors.status = 'Stutus filed is required'
  if(Validator.isEmpty(data.skills)) errors.skills = 'Skills filed is required'
  if(!isEmpty(data.website) && !Validator.isURL(data.website)) errors.website = 'Not a valid URL'

  socialMedias.forEach(media => { if(!isEmpty(socialMedias[media]) && !Validator.isURL(socialMedias[media])) socialMedias[media] = 'Not a valid URL' })

  return [errors, isEmpty(errors)]
}

exports.ValidateExperience = data => {
  let errors = {}

  initialiseObjectFields(['title', 'company', 'from'], data)

  if(Validator.isEmpty(data.title)) errors.title = 'Job title field is required'
  if(Validator.isEmpty(data.company)) errors.company = 'Company field is required'
  if(Validator.isEmpty(data.from)) errors.from = 'From date field is required'

  return [errors, isEmpty(errors)]
}

exports.ValidateEducation = data => {
  let errors = {}

  initialiseObjectFields(['school', 'degree', 'fieldofstudy', 'from', 'to', 'current', 'description'], data)

  if(Validator.isEmpty(data.school)) errors.school = 'School field is required'
  if(Validator.isEmpty(data.degree)) errors.degree = 'Degree field is required'
  if(Validator.isEmpty(data.from)) errors.from = 'From date field is required'
  if(data.fieldofstudy && Validator.isEmpty(data.fieldofstudy)) errors.fieldofstudy = 'Fieldofstudy field is required'

  return [errors, isEmpty(errors)]
}
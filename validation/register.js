const Validator = require('validator')
const isEmpty = require('../utilities/utilities').isEmpty

module.exports = function validateRegisterInput(data) {
  let errors = {}

  // Name validations
  data.name = !isEmpty(data.name)? data.name: ''

  if(!Validator.isLength(data.name, {min: 2, max: 30})) errors.name = 'Name must be between 2 and 30 characters'
  if(Validator.isEmpty(data.name)) errors.name = 'Name field is requires'

  // Email validations
  data.email = !isEmpty(data.email)? data.email: ''

  if(Validator.isEmpty(data.email)) errors.email = 'Email field is required'
  if(!Validator.isEmail(data.email)) errors.email = 'Email is invalid'
  
  // Password validations
  data.password = !isEmpty(data.password)? data.password: ''
  data.password2 = !isEmpty(data.password2)? data.password2: ''

  if(Validator.isEmpty(data.password)) errors.password = 'Password field is required'
  if(!Validator.isLength(data.password, {min: 6, max: 30})) errors.password = 'Password must be at least 6 characters'
  if(!Validator.isLength(data.password2, {min: 6, max: 30})) errors.password2 = 'Confirm Password filed is required'
  if(!Validator.equals(data.password, data.password2)) errors.password2 = 'Password mast match'

  return {errors, isValid: isEmpty(errors)}
}
const Validator = require('validator')
const isEmpty = require('../utilities/utilities').isEmpty

module.exports = function validateLoginInput(data) {
  let errors = {}
  // Email validations
  data.email = !isEmpty(data.email)? data.email: ''

  if(!Validator.isEmail(data.email)) errors.email = 'Email is invalid'
  if(Validator.isEmpty(data.email)) errors.email = 'Email field is required'
  
  // Password validations
  data.password = !isEmpty(data.password)? data.password: ''

  if(Validator.isEmpty(data.password)) errors.password = 'Password field is required'

  return {errors, isValid: isEmpty(errors)}
}
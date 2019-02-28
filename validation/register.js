const Validator = require('validator')
const isEmpty = require('../utilities/utilities').IsEmpty
const initialiseObjectFields = require('../utilities/utilities').InitialiseObjectFields

exports.validateRegisterInput = data => {
  let errors = {}

  initialiseObjectFields(['name', 'email', 'password', 'password2'], data, '')

  if(!Validator.isLength(data.name, {min: 2, max: 30})) errors.name = 'Name must be between 2 and 30 characters'
  if(Validator.isEmpty(data.name)) errors.name = 'Name field is requires'

  if(Validator.isEmpty(data.email)) errors.email = 'Email field is required'
  if(!Validator.isEmail(data.email)) errors.email = 'Email is invalid'

  if(Validator.isEmpty(data.password)) errors.password = 'Password field is required'
  if(!Validator.isLength(data.password, {min: 6, max: 30})) errors.password = 'Password must be at least 6 characters'
  if(!Validator.isLength(data.password2, {min: 6, max: 30})) errors.password2 = 'Confirm Password filed is required'
  if(!Validator.equals(data.password, data.password2)) errors.password2 = 'Password mast match'

  return [errors, isEmpty(errors)]
}
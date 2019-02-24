const Validator = require('validator')
const isEmpty = require('../utilities/utilities').IsEmpty
const initialiseObjectFields = require('../utilities/utilities').InitialiseObjectFields

exports.validateLoginInput = data => {
  let errors = {}
  
  initialiseObjectFields(['email', 'password'], data)

  if(!Validator.isEmail(data.email)) errors.email = 'Email is invalid'
  if(Validator.isEmpty(data.email)) errors.email = 'Email field is required'

  if(Validator.isEmpty(data.password)) errors.password = 'Password field is required'

  return [errors, isEmpty(errors)]
}
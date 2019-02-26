const userLogic = require('../../logic/users/users')
const validateRegisterInput = require('../../validation/register').validateRegisterInput
const to = require('../../utilities/utilities').To

exports.GetTest = (req, res) => res.json(req.user)

exports.PostRegisterUser = async (req, res) => {
  const [errors, isValid] = validateRegisterInput(req.body)
  if(!isValid) return res.status(400).json(errors)

  const {name, email, password} = req.body

  const userExist = await userLogic.FindUserByEmail(email)
  if(userExist) {
    errors.email = 'Email already exists'
    return res.status(400).json(errors)
  }

  const [err, user] = await to(userLogic.AddUser({name, email, password}))
  if(!user) return res.status(404).json({user: 'Cant add user'})

  if(user) {
    delete user.password
    delete user._id
  }

  res.json(user)
}
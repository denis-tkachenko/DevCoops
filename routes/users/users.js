const logic = require('../../logic/users/users')
const to = require('../../utilities/utilities').to

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

exports.GetTest = (req, res) => res.json(req.user)

exports.PostRegisterUser = async (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body)
  if(!isValid) return res.status(400).json(errors)

  const {name, email, password} = req.body

  const userExist = await logic.FindUserByEmail(email)
  if(userExist) {
    errors.email = 'Email already exists'
    return res.status(400).json(errors)
  }

  const [err, user] = await to(logic.AddUser({name, email, password}))
  if(!user) return res.status(404).json({msg: 'Cant add user'})

  res.json(user)
}

exports.PostLogin = async (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body)
  if(!isValid) return res.status(400).json(errors)

  const {email, password} = req.body

  const user = await logic.FindUserByEmail(email)
  if(!user) {
    errors.email = 'User not found'
    return res.status(404).json(errors)
  }

  const [err, token] = await to(logic.AutenticatedUser(user, password))
  if(!token) {
    errors.password = 'Password incorect'
    return res.status(404).json(errors)
  }

  res.json({success: true, token: `Bearer ${token}`})
}
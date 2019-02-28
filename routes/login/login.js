const loginLogic = require('../../logic/login/login')
const userLogic = require('../../logic/users/users')
const to = require('../../utilities/utilities').To
const validateLoginInput = require('../../validation/login').validateLoginInput

exports.PostLogin = async (req, res) => {
  const [errors, isValid] = validateLoginInput(req.body)
  if(!isValid) return res.status(400).json(errors)

  const {email, password} = req.body

  const user = await to(userLogic.FindUserByEmail(email))
  if(!user || user.err) {
    errors.email = 'User not found'
    return res.status(404).json(errors)
  }

  const token = await to(loginLogic.AutenticatedUser(user, password))
  if(!token) {
    errors.password = 'Password incorect'
    return res.status(404).json(errors)
  }

  res.json({success: true, token: `Bearer ${token}`})
}
const userLogic = require('../../logic/users/users')
const validateRegisterInput = require('../../validation/register').validateRegisterInput
const to = require('../../utilities/utilities').To

exports.GetTest = (req, res) => res.json(req.user)

exports.PostRegisterUser = async (req, res) => {
  const [errors, isValid] = validateRegisterInput(req.body)
  if(!isValid) return res.status(400).json(errors)

  const {name, email, password} = req.body

  const userExist = await to(userLogic.FindUserByEmail(email))
  if(userExist) return res.status(400).json({users: 'Email already exists'})

  const addUser = await to(userLogic.AddUser({name, email, password}))
  if(!addUser) return res.status(404).json({user: 'Cant add user'})

  res.status(200).json({name: addUser.name, avatar: addUser.avatar})
}
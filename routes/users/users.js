const logic = require('../../logic/users/users')
const to = require('../../logic/utilities').to

exports.GetTest = (req, res) => res.json({msg: 'Users Works'})

exports.PostRegisterUser = async (req, res) => {
  const {name, email, password} = req.body

  const userExist = await logic.FindUserByEmail(email)
  if(userExist) return res.status(400).json({email: 'Email already exists'})

  let [err, user] = await to(logic.AddUser({name, email, password}))
  if(!user) console.log(err)

  res.json(user)
}
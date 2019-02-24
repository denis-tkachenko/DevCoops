const User = require('../../models/User')
const bcrypt = require('bcryptjs')

exports.AddUser = user => {
  const newUser = new User(user)

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) reject(err)
        newUser.password = hash
        resolve(newUser.save())
      })
    })
  })
}
exports.FindUserByEmail = email => User.findOne({email})
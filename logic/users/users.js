const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

exports.FindUserByEmail = async email => User.findOne({email})

exports.AddUser = user => {
  user.avatar = gravatar.url(user.email, {
    s: '200', // Size
    r: 'pg', // Rating
    d: 'mm' // Default
  })

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
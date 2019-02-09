const keys = require('../../config/keys')
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

exports.AutenticatedUser = async (user, password) => {
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch) return false

  const payload = {id: user.id, name: user.name, avatar: user.avatar}

  return new Promise((resolve, reject) => {
    jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
      if(err) reject(err)
      resolve(token)
    })
  })
}
const keys = require('../../config/keys')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
const secret = require('../../config/config').Secret
const {promisify} = require('util')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const to = require('../../utilities/utilities').To

exports.AutenticatedUser = async (user, password) => {
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch) return false

  const payload = {id: user.id, name: user.name, avatar: user.avatar}
  const jwtSign = promisify(jwt.sign)

  return jwtSign(payload, secret, {expiresIn: 3600})
}
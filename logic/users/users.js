const usersRepository = require('../../data/users/users')
const gravatar = require('gravatar')

exports.AddUser = user => {
  user.avatar = gravatar.url(user.email, {
    s: '200', // Size
    r: 'pg', // Rating
    d: 'mm' // Default
  })

  return usersRepository.AddUser(user)
}

exports.FindUserByEmail = email => usersRepository.FindUserByEmail(email)
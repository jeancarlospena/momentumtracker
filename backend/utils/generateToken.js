const jwt = require('jsonwebtoken')

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: '1d' })
  res.cookie('jwt', token)
  return token
}

module.exports = generateToken
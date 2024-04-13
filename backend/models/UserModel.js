const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const starterImportsData = require('../utils/starterImportsData.js')

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  primaryAccount: {
    type: String,
    required: true,
    default: "Sample Account"
  },
  importAccounts: {}
}, { timestamps: true })

UserSchema.statics.signup = async function (firstName, email, password) {
  if (!email || !password || !firstName) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if (await this.findOne({ email: email.toLowerCase() })) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(11);
  const hash = await bcrypt.hash(password, salt)

  const createdUser = await this.create({ firstName, email: email.toLowerCase(), password: hash, importAccounts: { "Sample Account": { ...starterImportsData } } })



  return createdUser
}

UserSchema.statics.login = async function (email, password) {
  if (!email, !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email: email.toLowerCase() })

  if (!user) {
    throw Error('Incorrect email or password')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect email or password')
  }
  return user
}



module.exports = mongoose.model('User', UserSchema)
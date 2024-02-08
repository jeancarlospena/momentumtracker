const User = require('../models/UserModel.js')
const generateToken = require('../utils/generateToken.js')
const asyncHandler = require("../middleware/asyncHandler.js")


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.login(email, password)
  generateToken(res, user._id)
  res.status(200).json({ firstName: user.firstName, email: user.email, imports: user.imports })
})

const signupUser = asyncHandler(async (req, res) => {
  const { firstName, email, password } = req.body
  const user = await User.signup(firstName, email, password)
  console.log(user)
  generateToken(res, user._id)
  res.status(200).json({ firstName: user.firstName, email: user.email })
})

const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expiresIn: new Date(0) })
  res.status(200).json({ message: 'Logout successful' })
}

const updateImportsData = asyncHandler(async (req, res) => {
  const { importData } = req.body
  if (!importData) {
    throw new Error('No data to import')
  }
  const updatedImport = await User.findByIdAndUpdate(req.user._id, { imports: importData }, { new: true }).select('-password')
  console.log(updatedImport)
  res.status(200).json(updatedImport)
})

const verifyUser = (req, res) => {
  res.status(200).json(req.user)
}

module.exports = { loginUser, signupUser, logoutUser, verifyUser, updateImportsData }
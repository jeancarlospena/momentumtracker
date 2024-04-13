const User = require('../models/UserModel.js')
const asyncHandler = require("../middleware/asyncHandler.js")
const bcrypt = require('bcrypt')



const updateProfile = asyncHandler(async (req, res) => {
  // const { updatedInformation } = req.body

  // const updatedImport = await User.findByIdAndUpdate(req.user._id, { importAccounts: { ...req.user.importAccounts, [primaryAccount]: importData } }, { new: true }).select('-password')
  // console.log(updatedImport)
  // res.status(200).json(updatedImport)
  const { firstName, email, password } = req.body
  const updatedProfielInfo = {}
  if (firstName) {
    updatedProfielInfo.firstName = firstName
  }
  if (email) {
    updatedProfielInfo.email = email
  }
  if (password) {
    const salt = await bcrypt.genSalt(11);
    const hash = await bcrypt.hash(password, salt)
    updatedProfielInfo.password = hash
  }
  await User.findByIdAndUpdate(req.user._id, { ...updatedProfielInfo }, { new: true })

  delete updatedProfielInfo['password']
  res.status(200).json(updatedProfielInfo)
})



module.exports = { updateProfile }
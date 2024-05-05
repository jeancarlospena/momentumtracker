const User = require('../models/UserModel.js')
const generateToken = require('../utils/generateToken.js')
const asyncHandler = require("../middleware/asyncHandler.js")

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.login(email, password)
  generateToken(res, user._id)
  res.status(200).json({ firstName: user.firstName, email: user.email, imports: user.imports, importAccounts: user.importAccounts, primaryAccount: user.primaryAccount })
})

const signupUser = asyncHandler(async (req, res) => {
  const { firstName, email, password } = req.body
  const user = await User.signup(firstName, email, password)

  // console.log(user)
  generateToken(res, user._id)
  res.status(200).json({ firstName: user.firstName, email: user.email, importAccounts: user.importAccounts, primaryAccount: user.primaryAccount })
})

const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expiresIn: new Date(0) })
  res.status(200).json({ message: 'Logout successful' })
}

const updateImportsData = asyncHandler(async (req, res) => {
  const { importData, primaryAccount } = req.body
  if (!importData) {
    throw new Error('No data to import')
  }
  const updatedImport = await User.findByIdAndUpdate(req.user._id, { importAccounts: { ...req.user.importAccounts, [primaryAccount]: importData } }, { new: true }).select('-password')
  console.log(updatedImport)
  res.status(200).json(updatedImport)
})

const createImportAccount = asyncHandler(async (req, res) => {
  const accountName = req.body.accountName
  if (!Object.keys(req.user.importAccounts).includes(accountName)) {
    const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, { importAccounts: { ...req.user.importAccounts, [accountName]: { empty: true } } })

    res.status(200).json(accountName)
  } else {
    throw new Error("Account name already exists")
  }
})

const deleteImportAccount = asyncHandler(async (req, res) => {
  const accountToDelete = req.body.accountName
  delete req.user.importAccounts[accountToDelete]


  await User.findByIdAndUpdate(req.user._id, { importAccounts: { ...req.user.importAccounts } })
  res.status(200).json(accountToDelete)
})

const changePrimaryAccount = asyncHandler(async (req, res) => {
  const newPrimaryAccount = req.body.accountName
  await User.findByIdAndUpdate(req.user._id, { primaryAccount: newPrimaryAccount })
  res.status(200).json(newPrimaryAccount)
})

const verifyUser = (req, res) => {
  res.status(200).json(req.user)
}

const testingScript = async (req, res) => {
  const foundUser = await User.findById(req.user._id)
  // console.log(foundUser)
  res.status(200).json(foundUser)
}

module.exports = { loginUser, signupUser, logoutUser, verifyUser, updateImportsData, createImportAccount, testingScript, deleteImportAccount, changePrimaryAccount }
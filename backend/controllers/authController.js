import User from '../models/UserModel.js'
import Account from '../models/AccountModel.js'
import Trade from '../models/TradeModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from "../middleware/asyncHandler.js"

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await (User.login(email, password))
  const accounts = await Account.find({ userId: user._id }).sort({ createdAt: -1 });
  if (accounts.length > 0) {
    const accountId = user.primaryAccount !== '' ? user.primaryAccount : accounts[0]._id
    const trades = await (Trade.find({ accountId }).sort({ "orders.0.date": -1 }))
    user.importAccounts = { [accountId]: trades.length ? trades : [] }
  } else {
    user.importAccounts = {}
  }
  user.accounts = accounts
  const safeUser = user.toObject();
  delete safeUser.password
  delete safeUser.paypalPayments
  generateToken(res, user._id)
  // res.status(200).json({ firstName: user.firstName, email: user.email, imports: user.imports, importAccounts: user.importAccounts, primaryAccount: user.primaryAccount })
  res.status(200).json({ user: safeUser, accounts })
})

const signupUser = asyncHandler(async (req, res) => {
  const { firstName, email, password } = req.body
  const user = await User.signup(firstName, email, password)

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

const verifyUser = async (req, res) => {
  const accounts = await Account.find({ userId: req.user._id }).sort({ createdAt: -1 });
  if (accounts.length) {
    const accountId = req.user.primaryAccount !== '' ? req.user.primaryAccount : accounts[0]._id
    const trades = await (Trade.find({ accountId }).sort({ "orders.0.date": -1 }))
    req.user.importAccounts = { [accountId]: trades.length ? trades : [] }
  } else {
    req.user.importAccounts = {}
  }

  res.status(200).json({ user: req.user, accounts })
}

const testingScript = async (req, res) => {
  const foundUser = await User.findById(req.user._id)
  // (foundUser)
  res.status(200).json(foundUser)
}

export { loginUser, signupUser, logoutUser, verifyUser, updateImportsData, createImportAccount, testingScript, deleteImportAccount, changePrimaryAccount }
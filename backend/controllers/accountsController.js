const User = require('../models/UserModel.js')
const asyncHandler = require("../middleware/asyncHandler.js")



const updateImportsData = asyncHandler(async (req, res) => {
  const { importData, primaryAccount } = req.body
  console.log(importData)
  if (!importData) {
    throw new Error('No data to import')
  }
  const updatedImport = await User.findByIdAndUpdate(req.user._id, { importAccounts: { ...req.user.importAccounts, [primaryAccount]: importData } }, { new: true }).select('-password')

  res.status(200).json(updatedImport.importAccounts[primaryAccount])
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

const renameAccount = asyncHandler(async (req, res) => {
  const nameToEdit = req.body.editName
  const currentDataValue = req.user.importAccounts[nameToEdit]
  const currentImportsData = req.user.importAccounts
  delete currentImportsData[nameToEdit]
  const primaryAccountNameChecked = req.user.primaryAccount === nameToEdit ? req.body.updatedAccountName : req.user.primaryAccount


  const updated = await User.findByIdAndUpdate(req.user._id, { primaryAccount: primaryAccountNameChecked, importAccounts: { [req.body.updatedAccountName]: currentDataValue, ...currentImportsData, } }, { new: true })


  res.status(200).json(updated)
})


module.exports = { updateImportsData, createImportAccount, deleteImportAccount, changePrimaryAccount, renameAccount }
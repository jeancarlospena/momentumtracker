const express = require('express')
const router = express.Router()

const { requireAuth, requireAdmin } = require('../middleware/requireAuth.js')

const { updateImportsData, createImportAccount, testingScript, deleteImportAccount, changePrimaryAccount } = require('../controllers/userController.js')

// router.post('/login', loginUser)

// router.post('/signup', signupUser)

// router.post('/logout', logoutUser)

// router.post('/verify', requireAuth, verifyUser)

router.post('/import', requireAuth, updateImportsData)

router.post('/createimportaccount', requireAuth, createImportAccount)

router.post('/deleteimportaccount', requireAuth, deleteImportAccount)

router.post('/changeprimaryaccount', requireAuth, changePrimaryAccount)

router.post('/testing', requireAuth, testingScript)


module.exports = router
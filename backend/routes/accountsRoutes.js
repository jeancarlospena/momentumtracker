const express = require('express')
const router = express.Router()

const { requireAuth } = require('../middleware/requireAuth.js')

const { updateImportsData, createImportAccount, deleteImportAccount, changePrimaryAccount, renameAccount } = require('../controllers/accountsController.js')



router.post('/import', requireAuth, updateImportsData)

router.post('/createimportaccount', requireAuth, createImportAccount)

router.post('/deleteimportaccount', requireAuth, deleteImportAccount)

router.post('/changeprimaryaccount', requireAuth, changePrimaryAccount)

router.post('/renameaccount', requireAuth, renameAccount)



module.exports = router
import express from 'express'
const router = express.Router()

import { requireAuth } from '../middleware/requireAuth.js'

import { updateImportsData, createImportAccount, deleteImportAccount, changePrimaryAccount, renameAccount } from '../controllers/accountsController.js'



router.post('/import', requireAuth, updateImportsData)

router.post('/createimportaccount', requireAuth, createImportAccount)

router.post('/deleteimportaccount', requireAuth, deleteImportAccount)

router.post('/changeprimaryaccount', requireAuth, changePrimaryAccount)

router.post('/renameaccount', requireAuth, renameAccount)



export default router
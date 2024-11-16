import express from 'express'
import * as controllers from '../../controllers/web/airtimeToCash.controllers.js'
import { AdminProtect, AdminRole, Protect } from '../../middleware/auth.js'

const router = express.Router()

router.post('/checkAirtime2CashAvailbe', Protect, controllers.checkAirtime2CashAvailbe)
router.post('/validateAirtimeTransfer', Protect, controllers.validateAirtimeTransfer )
router.post('/airtimeToCashWebhook', controllers.airtimeToCashWebhook) //webhook api endpoint
router.post('/updateAirtime2Cash', AdminProtect, AdminRole([ 'Manager', 'Admin']), controllers.updateStatus)
//GET
router.get('/getAllTransactions', AdminProtect, controllers.getAllTransactions)
router.get('/getATransaction/:id', AdminProtect, controllers.getATransaction)



//PUT ROUTES

export default router
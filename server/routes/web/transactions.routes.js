import express from 'express'
import * as controllers from '../../controllers/web/transactions.controllers.js'
import { AdminProtect, AdminRole, Protect } from '../../middleware/auth.js'

const router = express.Router()

//POST ROUTES
router.post('/downloadReciept', Protect, controllers.downloadReciept)
router.post('/reportTransaction', Protect, controllers.reportTransaction)
router.post('/updateTracStatus', AdminProtect, AdminRole(['Manager', 'Admin']), controllers.updateTracStatus)
router.post('/markReportTransaction', AdminProtect, AdminRole(['Staff', 'Manager', 'Admin']), controllers.markReportTransaction)




//GET ROUTES
router.get('/fetchAllUserTransactions', Protect, controllers.fetchAllUserTransactions)
router.get('/fetchAUserTransaction/:id', Protect, controllers.fetchAUserTransaction )

router.get('/fetchAllTransactions', AdminProtect, AdminRole(['Staff', 'Manager', 'Admin']), controllers.fetchAllTransactions)
router.get('/fetchATransaction/:id', AdminProtect, AdminRole(['Staff', 'Manager', 'Admin']), controllers.fetchATransaction)

router.get('/fetchAllReportTransaction', AdminProtect, AdminRole(['Staff', 'Manager', 'Admin']), controllers.fetchAllReportTransaction)
router.get('/fetchAReportTransaction/:id', AdminProtect, AdminRole(['Staff', 'Manager', 'Admin']), controllers.fetchAReportTransaction)







export default router
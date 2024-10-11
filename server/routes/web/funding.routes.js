import express from 'express'
import * as controllers from '../../controllers/web/funding.controllers.js'
import { Protect } from '../../middleware/auth.js'

const router = express.Router()

router.post('/payWithPaystack', Protect,  controllers.payWithPaystack)
router.post('/payWithMonnify', Protect,  controllers.payWithMonnify)
router.post('/verifyPaymentTransactions', Protect,  controllers.verifyPaymentTransactions)




//PUT ROUTES

export default router
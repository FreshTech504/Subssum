import express from 'express'
import * as controllers from '../../controllers/web/quickbuy.controllers.js'
import { ValidateQuickBuyPayment } from '../../middleware/auth.js'

const router = express.Router()

//POST ROUTES
router.post('/quickBuyAirtime', ValidateQuickBuyPayment, controllers.quickBuyAirtime)
router.post('/quickBuyData', ValidateQuickBuyPayment, controllers.quickBuyData)
router.post('/quickBuyCableTv', ValidateQuickBuyPayment, controllers.quickBuyCableTv)
router.post('/quickBuyElectricity', ValidateQuickBuyPayment, controllers.quickBuyElectricity)






export default router
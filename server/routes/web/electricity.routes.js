import express from 'express'
import * as controllers from '../../controllers/web/electricity.controllers.js'
import { Protect, ValidateTransactionPin } from '../../middleware/auth.js'

const router = express.Router()

//POST ROUTES
router.post('/buyElectricBill', Protect, ValidateTransactionPin, controllers.buyElectricBill )
router.post('/validateMeterNumber', controllers.validateMeterNumber)

//PUT ROUTES

export default router
import express from 'express'
import * as controllers from '../../controllers/web/airtime.controllers.js'
import { Protect, ValidateTransactionPin } from '../../middleware/auth.js'

const router = express.Router()

//POST ROUTES
router.post('/buyAirtime', Protect, ValidateTransactionPin, controllers.buyAirtime)

export default router
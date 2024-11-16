import express from 'express'
import * as controllers from '../../controllers/web/electricity.controllers.js'
import { AdminProtect, Protect, ValidateTransactionPin } from '../../middleware/auth.js'

const router = express.Router()

//POST ROUTES
router.post('/buyElectricBill', Protect, ValidateTransactionPin, controllers.buyElectricBill )
router.post('/validateMeterNumber', controllers.validateMeterNumber)

router.post('/createElectricProvider', AdminProtect, controllers.createElectricProvider)
router.post('/updateElectricProvider', AdminProtect, controllers.updateElectricProvider)
router.post('/deleteElectricProvider', AdminProtect, controllers.deleteElectricProvider)

//GET ROUTES
router.get('/getAllElectricProvider', controllers.getAllElectricProvider)
router.get('/getAElectricProvider/:id', controllers.getAElectricProvider)


export default router
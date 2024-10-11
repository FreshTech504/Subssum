import express from 'express'
import * as controllers from '../../controllers/web/data.controllers.js'
import { Protect, ValidateTransactionPin } from '../../middleware/auth.js'

const router = express.Router()

//POST ROUTES
router.post('/buyData', Protect, ValidateTransactionPin, controllers.buyData)

//add
router.post('/createDataPlans', controllers.createDataPlans)
router.post('/updateDataPlans',  controllers.updateDataPlans)
router.post('/deleteDataPlan',  controllers.deleteDataPlan)



//GET ROUTES
router.get('/fetAllDataPlans',  controllers.fetAllDataPlans)
router.get('/adminFetAllDataPlans',  controllers.adminFetAllDataPlans)





//PUT ROUTES

export default router
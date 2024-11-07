import express from 'express'
import * as controllers from '../../controllers/web/data.controllers.js'
import { AdminProtect, Protect, ValidateTransactionPin } from '../../middleware/auth.js'

const router = express.Router()

//POST ROUTES
router.post('/buyData', Protect, ValidateTransactionPin, controllers.buyData)

//add
router.post('/createDataPlans', AdminProtect, controllers.createDataPlans)
router.post('/updateDataPlans', AdminProtect, controllers.updateDataPlans)
router.post('/deleteDataPlan', AdminProtect, controllers.deleteDataPlan)



//GET ROUTES
router.get('/fetAllDataPlans',  controllers.fetAllDataPlans)
router.get('/adminFetchAllDataPlans', AdminProtect,  controllers.adminFetAllDataPlans)
router.get('/adminFetchDataPlans/:id', AdminProtect,  controllers.adminFetchDataPlans)






//PUT ROUTES

export default router
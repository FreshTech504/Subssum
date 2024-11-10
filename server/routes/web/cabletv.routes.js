import express from 'express'
import * as controllers from '../../controllers/web/cabletv.controllers.js'
import { AdminProtect, Protect, ValidateTransactionPin } from '../../middleware/auth.js'

const router = express.Router()

//TV PROVIDERS
//POST ROUTES
router.post('/createTVProvider', AdminProtect, controllers.createTVProvider)
router.post('/updateTVProvider', AdminProtect, controllers.updateTVProvider)
router.post('/deleteTVProvider', AdminProtect, controllers.deleteTVProvider)

//GET ROUTES
router.get('/getTVProvider', controllers.getTVProvider)
router.get('/getATVProvider/:id', controllers.getATVProvider)


//CABLE TV PLANS

//POST ROUTES
router.post('/buyCableTvPlan', Protect, ValidateTransactionPin, controllers.buyCableTvPlan )
router.post('/validateCardNumber', controllers.validateCardNumber)
//*
router.post('/createCableTvPlan',  controllers.createCableTvPlan )


//GET ROUTES
router.get('/getAllCableTv', controllers.getAllCableTv)
router.get('/getAllCableTv/:id', controllers.getACableTv)

router.get('/getAdminAllCableTv', AdminProtect, controllers.getAllCableTv)
router.get('/getAdminACableTv/:id', AdminProtect, controllers.getAdminACableTv)

//PUT ROUTES

export default router
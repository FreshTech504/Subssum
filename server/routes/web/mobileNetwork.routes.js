import express from 'express'
import * as controllers from '../../controllers/web/mobileNetwork.controllers.js'
import { AdminProtect } from '../../middleware/auth.js'

const router = express.Router()

//POST ROUTES
router.post('/createNetwork', AdminProtect, controllers.createNetwork)
router.post('/updateNetwork', AdminProtect, controllers.updateNetwork)
router.post('/deleteNetwork', AdminProtect, controllers.deleteNetwork)

//GET ROUTES
router.get('/getAllNetwork', controllers.getAllNetwork)
router.get('/getANetwork/:id', controllers.getANetwork)


export default router
import express from 'express'
import * as controllers from '../../controllers/web/webstiteStatistics.controllers.js'
import { AdminProtect, Protect } from '../../middleware/auth.js'

const router = express.Router()


//GET ROUTES
router.get('/websiteStatistics', AdminProtect, controllers.websiteStatistics )
router.get('/servicesStatistics', AdminProtect, controllers.servicesStatistics )


router.get('/salesAnalysis/:period', AdminProtect, controllers.salesAnalysis)


export default router
import express from 'express'
import * as controllers from '../../controllers/web/webstiteStatistics.controllers.js'
import { Protect } from '../../middleware/auth.js'

const router = express.Router()


//GET ROUTES
router.post('/websiteStatistics', controllers.websiteStatistics )
router.post('/servicesStatistics', controllers.servicesStatistics )



export default router
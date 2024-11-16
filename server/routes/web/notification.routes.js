import express from 'express'
import * as controllers from '../../controllers/web/notifications.controllers.js'
import { AdminProtect, Protect } from '../../middleware/auth.js'

const router = express.Router()

//POST ROUTES
router.post('/createNotification', AdminProtect, controllers.createNotification)
router.post('/updateNotification', AdminProtect, controllers.updateNotification)
router.post('/deleteNotification', AdminProtect, controllers.deleteNotification)

//GET ROUTES
router.get('/getAllNotification', controllers.getAllNotification)
router.get('/getANotification/:id', AdminProtect, controllers.getANotification)


router.get('/getAllUserNotification', Protect, controllers.getAllUserNotification)
router.get('/getAllAdminNotification', AdminProtect, controllers.getAllAdminNotification)


export default router
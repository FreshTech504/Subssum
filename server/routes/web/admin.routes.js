import express from 'express'
import * as controllers from '../../controllers/web/admin.controllers.js'
import { AdminProtect, AdminRole } from '../../middleware/auth.js'

const router = express.Router()

router.post('/makeAdmin', AdminProtect, AdminRole(['Admin']), controllers.makeAdmin)
router.post('/login', controllers.login)
router.post('/siteSettings', AdminProtect, AdminRole(['Admin']), controllers.siteSettings)
router.post('/validatePasscode', controllers.verifyPasscode)
router.post('/signout', controllers.signout)

router.post('/blockAdmin', AdminProtect, AdminRole(['Admin']), controllers.blockAdmin)
router.post('/deleteAdmin', AdminProtect, AdminRole(['Admin']), controllers.deleteAdmin)
router.post('/updateAdmin', AdminProtect, AdminRole(['Admin']), controllers.updateAdmin)
router.post('/adminUserUpdateProfile', AdminProtect, controllers.adminUserUpdateProfile)


//GET
router.get('/getSiteSettings', AdminProtect, controllers.getSiteSettings)
router.get('/getAllAdmin', AdminProtect, controllers.getAllAdmin)
router.get('/getAdmin/:id', AdminProtect, AdminRole(['Admin']), controllers.getAdmin)
router.get('/getAllActivities', AdminProtect, controllers.getAllActivities)


export default router
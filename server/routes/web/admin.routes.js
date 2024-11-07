import express from 'express'
import * as controllers from '../../controllers/web/admin.controllers.js'
import { AdminProtect, AdminRole } from '../../middleware/auth.js'

const router = express.Router()

router.post('/makeAdmin', AdminProtect, AdminRole(['Admin']), controllers.makeAdmin)
router.post('/login', controllers.login)
router.post('/validatePasscode', controllers.verifyPasscode)
router.post('/signout', controllers.signout)



export default router
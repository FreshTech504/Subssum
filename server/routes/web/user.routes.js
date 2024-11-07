import express from 'express'
import * as controllers from '../../controllers/web/user.controllers.js'
import { AdminProtect, AdminRole, Protect } from '../../middleware/auth.js'

const router = express.Router()

router.post('/createPin', Protect, controllers.createPin )
router.post('/updatePin', Protect, controllers.updatePin )
router.post('/cashoutBonus', Protect, controllers.cashoutBonus)
router.post('/updateUser', Protect, controllers.updateUser)
router.post('/adminUpdateUser', AdminProtect, AdminRole(['Manager', 'Admin']), controllers.adminUpdateUser)
router.post('/blockUser', AdminProtect, AdminRole(['Staff', 'Manager', 'Admin']), controllers.blockUser)
router.post('/updatePassword', Protect, controllers.updatePassword)
router.post('/updateUserProfilePicture', Protect, controllers.updateUserProfilePicture)



//PUT ROUTES
router.get('/getAllUsers', AdminProtect, controllers.getAllUsers)
router.get('/getUser/:id', AdminProtect, controllers.getUser)
router.get('/getAllUserReferrees', controllers.getAllUserReferrees)

export default router
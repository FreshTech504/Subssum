import express from 'express'
import * as controllers from '../../controllers/web/auth.controllers.js'

const router = express.Router()

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.post('/google', controllers.google)
router.post('/forgotPassword', controllers.forgotPassword)
router.post('/:id/verify/:token', controllers.verifyNewUser)
router.post('/resetPassword/:resetToken', controllers.resetPassword)
router.post('/signout', controllers.signout)

//PUT ROUTES

export default router
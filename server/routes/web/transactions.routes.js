import express from 'express'
import * as controllers from '../../controllers/web/transactions.controllers.js'
import { Protect } from '../../middleware/auth.js'

const router = express.Router()

//POST ROUTES
router.post('/downloadReciept', Protect, controllers.downloadReciept)


//GET ROUTES
router.get('/fetchAllUserTransactions', Protect, controllers.fetchAllUserTransactions)
router.get('/fetchAUserTransaction/:id', Protect, controllers.fetchAUserTransaction )




export default router
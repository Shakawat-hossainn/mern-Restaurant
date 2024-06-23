import {Router} from 'express'
import express from 'express'
import { deliveryAddress, getAllOrders, getOrders, updateOrderStatus } from '../controllers/delivery.controller.js'
import verifyToken from '../utils/verifyUser.js'

const router = express.Router()

router.post('/deliveryAddress',verifyToken,deliveryAddress)
router.get('/getOrders',verifyToken,getOrders)
router.get("/getAllOrders",getAllOrders)
router.put('/orders/updateStatus/:orderId', updateOrderStatus);
export default router
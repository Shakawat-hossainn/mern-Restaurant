import express from 'express';
import { Router } from 'express';
import { addToCart, deleteCart, getCart, updateCartItemQuantity } from '../controllers/cart.controller.js';
import verifyToken from '../utils/verifyUser.js';

const router = express.Router();

router.post('/addToCart',verifyToken,addToCart)
router.get('/getCart',verifyToken,getCart)
router.delete('/deleteCart/:cartId',deleteCart)
router.patch('/updateQuantity/:id', updateCartItemQuantity);

export default router
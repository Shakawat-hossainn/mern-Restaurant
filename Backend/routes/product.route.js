import express from 'express';
import { Router } from 'express';
// import verifyToken from '../utils/verifyUser.js';
import {  createProduct, deleteProduct, getProduct } from '../controllers/product.controller.js';





const router = express.Router();



router.post('/createProduct',createProduct)
router.get('/getProducts',getProduct)
router.delete('/deleteProduct/:productId',deleteProduct)




export default router;
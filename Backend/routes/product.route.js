import express from 'express';
import { Router } from 'express';
// import verifyToken from '../utils/verifyUser.js';
import {  createProduct, deleteProduct, getProduct } from '../controllers/product.controller.js';
import multer from 'multer'




const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}${file.originalname}`)
    }
  
})
const upload = multer({ storage: storage })

router.post('/createProduct',upload.single("image"), createProduct)
router.get('/getProducts',getProduct)
router.delete('/deleteProduct/:productId',deleteProduct)




export default router;
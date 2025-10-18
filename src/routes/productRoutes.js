import express from 'express';
import upload from '../config/upload.js';
import {addProduct,getProducts,getCreatePage,getProductByid} from '../controller/productController.js'
import authenticate from '../middleware/authMiddleware.js';
const router=express.Router();

router.post('/add',authenticate,upload.single('image'),addProduct);
router.get('/home',authenticate,getProducts);
router.get('/add-product',authenticate,getCreatePage);
router.get('/product/:id',authenticate,getProductByid);

export default router;
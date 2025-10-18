import express from 'express'
import {addCart,getCartItem,removeCart,addCartWithId} from '../controller/cartController.js'
import authenticate from '../middleware/authMiddleware.js';

const router=express.Router();
router.post('/add-cart',authenticate,addCart)
router.get('/cart',authenticate,getCartItem);
router.get('/remove-cart/:id',authenticate,removeCart);
router.get('/add-cart/:id',authenticate,addCartWithId);
export default router;
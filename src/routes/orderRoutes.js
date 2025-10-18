import express from 'express'
import {addOrder,success} from '../controller/orderController.js'
import authenticate from '../middleware/authMiddleware.js'

const router=express.Router();

router.get('/order',authenticate,addOrder);
router.get('/success',authenticate,success);

export default router;
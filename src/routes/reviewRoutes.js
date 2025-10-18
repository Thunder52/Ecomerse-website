import express from 'express';
import {addReview} from '../controller/reviewController.js'
import authenticate from '../middleware/authMiddleware.js';

const router=express();

router.post('/review',authenticate,addReview);

export default router;
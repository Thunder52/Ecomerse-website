import express from 'express'
import { register,getRegister,getLogin,login,logout } from '../controller/authController.js';

const router=express.Router();

router.get('/register',getRegister);
router.get('/login',getLogin);
router.get('/',getLogin);
router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout)

export default router;
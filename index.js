import express from 'express';
import dotenv from 'dotenv'
import authRouter from './src/routes/authRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import cartRoutes from './src/routes/cartRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js'
import reviewRoutes from './src/routes/reviewRoutes.js'
import './src/config/db.js'

dotenv.config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({resave:true,secret:process.env.MYSECRET,saveUninitialized:false}));
app.use(flash());
app.use(express.static('public'));
app.set('view engine',"ejs");


app.use(authRouter);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(reviewRoutes);

app.listen(5000,()=>{
    console.log('Server is listening on port 5000');
})
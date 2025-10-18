import Joi from "joi";
import Review from "../models/reviewsModel.js";

export const addReview=async(req,res)=>{
    try {
        const id=req.id
        const schema=Joi.object({
            title:Joi.string().min(3).max(255).required(),
            productId:Joi.string().required()
        });
        const {value,error}=schema.validate(req.body);
        if(error){
            req.flash('errors',error.message);
            return res.redirect(`/product/${productId}`);
        }
        const {title,productId}=value;
        await Review.create({title,productId,userId:id});
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something wents wrong');
    }
}
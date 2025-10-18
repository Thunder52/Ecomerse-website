import Joi from "joi";
import Review from "../models/reviewsModel.js";

export const addReview=async(req,res)=>{
    try {
        const id=req.id
        const schema=Joi.object({
            title:Joi.string().min(3).max(255).required(),
            rating:Joi.string().required(),
            productId:Joi.string().required()
        });
        const {value,error}=schema.validate(req.body);
        const {title,productId,rating}=value;
        if(error){
            req.flash('errors',error.message);
            console.log(error)
            return res.redirect(`/product/${productId}`);
        }
        await Review.create({title,productId,userId:id,rating});
        return res.redirect(`/product/${productId}`)
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something wents wrong');
    }
}
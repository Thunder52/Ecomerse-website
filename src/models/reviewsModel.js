import { DataTypes } from "sequelize";
import sequilize from "../config/db.js";
import Product from "./productModel.js";
import User from "./userModel.js";

const Review=sequilize.define('Review',{
    title:{type:DataTypes.STRING},
    rating:{type:DataTypes.INTEGER},
    productId:{type:DataTypes.INTEGER},
    userId:{type:DataTypes.INTEGER}
});

User.hasMany(Review,{foreignKey:'userId'});
Review.belongsTo(User,{foreignKey:'userId'});
Product.hasMany(Review,{foreignKey:'productId'});
Review.belongsTo(Product,{foreignKey:'productId'});

export default Review;
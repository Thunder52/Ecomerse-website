import { DataTypes } from "sequelize";
import sequilize from "../config/db.js";
import Category from "./categoryModel.js";

const Product=sequilize.define("Products",{
    id:{type:DataTypes.INTEGER,allowNull:false, autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.STRING,allowNull:false},
    image:{type:DataTypes.STRING,allowNull:false},
    price:{type:DataTypes.FLOAT,allowNull:false},
    quantity:{type:DataTypes.INTEGER,defaultValue:1},
    description:{type:DataTypes.STRING,allowNull:false},
});

Category.hasMany(Product,{foreignKey:'categoryId'});
Product.belongsTo(Category,{foreignKey:'categoryId'});

export default Product;

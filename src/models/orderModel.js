import { DataTypes } from "sequelize";
import sequilize from "../config/db.js";
import Product from "./productModel.js";

const Order=sequilize.define('order',{
    id:{type:DataTypes.INTEGER,allowNull:false,autoIncrement:true,primaryKey:true},
    amount:{type:DataTypes.INTEGER,allowNull:false},
});

Order.belongsToMany(Product,{through:'OrderItem'});
Product.belongsToMany(Order,{through:'OrderItem'});

export default Order;
import { DataTypes } from "sequelize";
import sequilize from "../config/db.js";
import User from "./userModel.js";
import Product from "./productModel.js";

const Cart=sequilize.define('Cart',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    quantity:{type:DataTypes.INTEGER,defaultValue:1},
    userId:{type:DataTypes.INTEGER,allowNull:false},
    productId:{type:DataTypes.INTEGER,allowNull:false}
});

User.hasOne(Cart,{foreignKey:'userId'});
Cart.belongsTo(User,{foreignKey:'userId'});
Product.hasMany(Cart,{foreignKey:'productId'});
Cart.belongsTo(Product,{foreignKey:'productId'});
export default Cart;
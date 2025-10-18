import sequilize from "../config/db.js";
import { DataTypes } from "sequelize";

const orderItem=sequilize.define('orderitem',{
    id:{type:DataTypes.INTEGER,allowNull:false,autoIncrement:true,primaryKey:true},
    productId:{type:DataTypes.INTEGER,allowNull:false},
    userId:{type:DataTypes.INTEGER,allowNull:false},
    quantity:{type:DataTypes.INTEGER,allowNull:false},
})

export default orderItem;
import { DataTypes } from "sequelize";
import sequilize from "../config/db.js";

const Category=sequilize.define('Category',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    title:{type:DataTypes.STRING,unique:{name:"unique_title"}}
});

export default Category;
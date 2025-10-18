import { DataTypes } from "sequelize";
import sequilize from "../config/db.js";
import bcrtpt from 'bcrypt'

const User = sequilize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: {name:'unique_email'}},
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async(User)=>{
  const hashPassword=await bcrtpt.hash(User.password,10);
  User.password=hashPassword;
})

export default User;
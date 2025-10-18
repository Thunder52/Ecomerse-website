import sequilize from "../config/db.js";
import User from "./userModel.js";
import Product from './productModel.js'
import Category from "./categoryModel.js";
import Cart from '../models/cartModels.js'
import Order from "./orderModel.js";
import Review from "./reviewsModel.js";

const db = {};
db.sequelize = sequilize;
db.user = User;
db.product=Product;
db.cart=Cart;
db.category=Category;
db.order=Order;
db.review=Review;

(async () => {
  try {
    await sequilize.sync({alter:true});
    console.log("data synced successfully");
  } catch (error) {
    console.log(error);
  }
})();

export default db;

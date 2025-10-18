import db from "../models/index.js";
import cloudinary from "../config/cloudinary.js";
import { Op } from "sequelize";
import Joi from "joi";
import Review from "../models/reviewsModel.js";
import User from "../models/userModel.js";
const Category = db.category;
const Product = db.product;
const Cart = db.cart;

export const getCreatePage = (req, res) => {
  try {
    return res.render("addProduct.ejs", { errors: req.flash("errors") });
  } catch (error) {
    console.log(error)
    return res.status(500).send('something wents wrong!');
  } 
};

export const addProduct = async (req, res) => {
  try {
    if (req.file.size / (1024 * 1024) > 5) {
      req.flash("errors", "file is too large");
      return res.redirect("/add-product");
    }
    const schema = Joi.object({
      name: Joi.string().min(2).max(100).required(),
      price: Joi.number().min(1).required(),
      category: Joi.string().required(),
      quantity: Joi.number().required(),
      description: Joi.string().required(),
    });
    const { value,error } = schema.validate(req.body);
    if (error) {
      req.flash("errors", error.message);
      return res.redirect("/add-product");
    }
    const { name, price, category, quantity, description } = value;
    const uploadRes = await cloudinary.uploader.upload(req.file.path);
    const cate = await Category.findOne({ where: { title: category } });
    await Product.create({
      name,
      price,
      quantity,
      image: uploadRes.secure_url,
      description,
      categoryId: cate.id,
    });
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    req.flash("errors", "something wents wrong");
    return res.redirect("/add-product");
  }
};

export const getProducts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const query = req.query.search;
    if (query) {
      const skip = (page - 1) * 10;
      const limit = 8;
      const products = await Product.findAll({
        where: { name: {[Op.substring]:query} },
        include: { model: Category, attributes: ["title"] },
        offset: skip,
        limit: limit,
      });
      const total = await Product.count({ where: { name: query } });
      const totalCartItems = await Cart.sum("quantity", {
        where: { userId: req.id },
      });
      return res.render("home.ejs", {
        products,
        currPage: page,
        totalPage: Math.ceil(total / limit),
        totalCartItems,
      });
    }
    const limit = 8;
    const skip = (page - 1) * limit;
    const products = await Product.findAll({
      include: { model: Category, attributes: ["title"] },
      offset: skip,
      limit: limit,
    });
    const total = await Product.count();
    const totalCartItems = await Cart.sum("quantity", {
      where: { userId: req.id },
    });

    return res.render("home.ejs", {
      products,
      currPage: page,
      totalPage: Math.ceil(total / limit),
      totalCartItems,
    });
  } catch (error) {
    console.log(error);
    return res.send("something went wrong");
  }
};

export const getProductByid = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {include:[{model:Category},{model:Review,include:[{model:User,attributes:["fullName"]}]}]});
    const cart = await Cart.findAll({ where: { userId: id } });
    if (!product) {
      return res.status(400).send("invalid id!");
    }
    const totalCartItems = await Cart.sum("quantity", {
      where: { userId: req.id },
    });
    return res.render("productDetailPage.ejs", { product, totalCartItems });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something wents wrong");
  }
};

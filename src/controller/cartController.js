import db from "../models/index.js";
import Joi from "joi";
const Cart = db.cart;
const Product = db.product;

export const addCart = async (req, res) => {
  try {
    const schema=Joi.object({
      productId:Joi.string().required()
    })
    const {value,error}=schema.validate(req.body);
    if(error){
      return res.send(error.message);
    }
    const userId = req.id;
    const { productId } = value;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send("product not found");
    }
    const cartExist = await Cart.findOne({ where: { userId, productId } });

    if (cartExist) {
      cartExist.quantity += 1;
      await cartExist.save();
      return res.redirect("/cart");
    }
    const newCart = await Cart.create({ userId, productId });
    return res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
};

export const removeCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
    if (!cart) {
      return res.status(404).send("cart item not found");
    }
    if (cart.quantity === 1) {
      await cart.destroy();
    }
    cart.quantity -= 1;
    await cart.save();
    return res.redirect("/cart");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong");
  }
};

export const addCartWithId = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
    if (!cart) {
      return res.status(404).send("cart item not found");
    }
    const pid = cart.productId;
    const product = await Product.findByPk(pid);
    if (product.quantity <= cart.quantity) {
      req.flash("message", "no more products left!");
      return res.redirect("/cart");
    }
    cart.quantity += 1;
    await cart.save();
    return res.redirect("/cart");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong");
  }
};

export const getCartItem = async (req, res) => {
  try {
    const id = req.id;
    const carts = await Cart.findAll({
      where: { userId: id },
      include: [{ model: Product, attributes: ["name", "price", "image"] }],
    });
    const totalAmount = carts.reduce((acc, curr) => {
      return acc + curr.quantity * curr.Product.price;
    }, 0);
    res.render("cart.ejs", {
      carts,
      totalAmount,
      message: req.flash("message"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong");
  }
};

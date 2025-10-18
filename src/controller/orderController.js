import db from "../models/index.js";
import Razorpay from "razorpay";
import orderItem from "../models/orderItemModel.js";
import Order from "../models/orderModel.js";

const User = db.user;
const Product = db.product;
const Cart = db.cart;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const addOrder = async (req, res) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.id },
      include: { model: Product },
    });
    const totalAmount = cart.reduce((acc, curr) => {
      return acc + curr.quantity * curr.Product.price;
    }, 0);
    const user = await User.findByPk(req.id);
    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "husainali7865253@gmail.com",
    };
    razorpay.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        return res.status(400).send("something wents wrong");
      }
      return res.status(200).send({
        success: true,
        msg: "Order Created",
        order_id: order.id,
        amount: totalAmount * 100,
        key_id: process.env.RAZORPAY_API_KEY,
        product_name: "Cart payment",
        name: user.fullName,
        email: user.email,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("something wents wrong");
  }
};

export const success = async (req, res) => {
  try {
    const id = req.id;
    const cart = await Cart.findAll({include:Product});
    const totalAmount = cart.reduce((acc, curr) => {
      return acc + curr.quantity * curr.Product.price;
    }, 0);
    await Order.create({ amount: totalAmount });
    cart.forEach(async (item) => {
      const product = await Product.findByPk(item.productId);
      await orderItem.create({
        productId: product.id,
        userId: id,
        quantity: item.quantity,
      });

      if (product.quantity <= item.quantity) {
        await product.destroy();
      } else {
        product.quantity -= item.quantity;
        await product.save();
      }
    });
    await Cart.destroy({ where: { userId: id } });
    return res.redirect('/home');
  } catch (error) {
    console.log(error);
    res.status(500).send("Something wents wrong");
  }
};

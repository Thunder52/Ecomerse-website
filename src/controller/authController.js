import db from "../models/index.js";
import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcrypt";

const User = db.user;

export const getRegister = async (req, res) => {
  try {
    return res.render("register.ejs", { errors: req.flash("errors") });
  } catch (error) {
    console.log(error);
    return res.status(500).send('something wents wrong!');
  }
  
};
export const getLogin = async (req, res) => {
  try {
    return res.render("login.ejs", { errors: req.flash("errors") });
  } catch (error) {
    console.log(error);
    return res.status(500).send('something wents wrong!');
  }
  
};
export const register = async (req, res) => {
  try {
    const scheam = Joi.object({
      fullName: Joi.string().min(3).max(255).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    });
    const { value,error } = scheam.validate(req.body);
    if (error) {
      console.log(error);
      req.flash("errors", error.message);
      return res.redirect("/register");
    }
    const { fullName, email, password } = value;
    const user = await User.findOne({ where: { email } });
    if (user) {
      req.flash("errors", "user already exist!");
      return res.redirect("/register");
    }
    const newUser = await User.create({ fullName, email, password });
    await db.cart.create({ userId: newUser.id });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/home");
  } catch (error) {
    console.log(error);
    req.flash("errors", "something wents wrong!");
    res.redirect("/register");
  }
};

export const login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required(),
    });
    const { value,error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      req.flash("errors", error.message);
      res.redirect("/login");
    }
    const { email, password } = value;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      req.flash("errors", "User not found!");
      return res.redirect("/login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("errors", "invalid credentials!");
      return res.redirect("/login");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/home");
  } catch (error) {
    console.log(error);
    req.flash("errors", "something wents wrong!");
  }
};

export const logout = async (req, res) => {
  try {
      res.clearCookie("token");
      return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.status(500).send('something wents wrong!');
  }

};

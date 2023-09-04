const express = require("express");
const { Usermodel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const userController = express.Router();
const jwt = require("jsonwebtoken");
userController.post("/signup", (req, res) => {
  const { email, password, age } = req.body;
  bcrypt.hash(password, 2, async (err, hash) => {
    if (err) {
      res.send("something went wrong");
    } else {
      const newuser = new Usermodel({
        email,
        password: hash,
        age,
      });
      await newuser.save();
      res.send({ msg: " user signed up" });
    }
  });
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Usermodel.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) res.send("something went wrong");
      else {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET);
        res.send({ msg: "sign in successful", token: token });
      }
    });
  }
});

module.exports = {
  userController,
};

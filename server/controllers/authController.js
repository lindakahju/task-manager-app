const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.json({
        error: "Username is required",
      });
    }
    if (!password) {
      return res.json({
        error: "Password is required",
      });
    }
    const exist = await User.findOne({ username });
    if (exist) {
      return res.json({
        error: "Username is already taken",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.json({
          error: "No user found",
        });
      }
  
      const match = await comparePassword(password, user.password);
      if (match) {
        jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '5000s' },
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
            res.json({ message: "Password match", token });
          }
        );
      } else {
        res.json({
          error: "Wrong password",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};

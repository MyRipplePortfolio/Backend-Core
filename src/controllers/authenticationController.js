const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    // your register logic here
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.login = async (req, res) => {
  try {
    // your login logic here
    // const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
    // res.json({ token });
    res.json({ message: "User Logged in successfully" });

  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

exports.logout = async (req, res) => {
  try {
    // your logout logic here
    res.json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
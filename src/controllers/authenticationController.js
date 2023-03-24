const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Register a new user or log in an existing user
exports.registerUser = async (req, res) => {
  try {
    const { email, address } = req.body;

    // Find if user with email already exists
    const user = await User.findOne({ email });

    let message, userExist;

    if (!user) {
      // If user with email doesn't exist, create a new user with email and address
      const newUser = new User({ email, address });

      // Save the user to the database
      const savedUser = await newUser.save();
      console.log(savedUser._id);

      // Generate an authentication token for the user
      const token = await savedUser.generateAuthToken();

      message = 'New user registered successfully.';
      userExist = false;

      res.json({ message, userToken: token, userExist });
    } else {
      // If user with email exists, generate an authentication token for the user
      const token = await user.generateAuthToken();
      console.log(token);

      message = 'User already exists.';
      userExist = true;

      res.json({ message, userToken: token, userExist });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Log in a user with email and address
exports.loginUser = async (req, res) => {
  try {
    const { email, address } = req.body;

    // Find the user with the provided email and address in the database
    const user = await User.findOne({ email, address });

    if (!user) {
      // If the user is not found, throw an error
      throw new Error('Authentication failed. Please check your credentials.');
    }

    // Generate an authentication token for the user
    const token = await user.generateAuthToken();

    res.json({ message: 'User logged in successfully.', userToken: token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// Log out a user by removing a specific authentication token from their tokens array
exports.logoutUser = async (req, res) => {
  try {
    const { email, address, token } = req.body;

    // Find the user with the provided email and address in the database
    const user = await User.findOne({ email, address });

    if (!user) {
      // If the user is not found, throw an error
      throw new Error('Authentication failed. Please check your credentials.');
    }

    // Find the index of the specified token in the tokens array
    const tokenIndex = user.tokens.findIndex((t) => t.token === token);

    if (tokenIndex === -1) {
      // If the provided token is not found, throw an error
      throw new Error('Invalid token.');
    }

    // Remove only the specified token from the tokens array
    user.tokens.splice(tokenIndex, 1);

    // Save the updated user object to the database
    await user.save();

    res.json({ message: 'User logged out successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
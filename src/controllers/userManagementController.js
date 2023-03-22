const User = require('../models/userModel');

exports.getUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    // your get user details logic here
    res.json({ message: `Details of user ${id}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getUserNotifications = async (req, res) => {
  try {
    const id = req.params.id;
    // your get user notifications logic here
    res.json({ message: `Notifications of user ${id}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    // your delete user logic here
    res.json({ message: `User ${id} deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
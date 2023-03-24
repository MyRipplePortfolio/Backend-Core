const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

// Register new user
router.post('/register', authenticationController.registerUser);

// User login
router.post('/login', authenticationController.loginUser);

// User logout
router.post('/logout', authenticationController.logoutUser);

module.exports = router;
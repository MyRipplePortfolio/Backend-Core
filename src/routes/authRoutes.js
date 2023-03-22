const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

// Register new user
router.post('/register', authenticationController.register);

// User login
router.post('/login', authenticationController.login);

// User logout
router.post('/logout', authenticationController.logout);

module.exports = router;
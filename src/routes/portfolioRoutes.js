const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Get portfolio of user with given id
router.get('/:id', portfolioController.getPortfolio);

module.exports = router;
const express = require('express');
const router = express.Router();
const marketDataController = require('../controllers/marketDataController');

// Get real-time market data of an asset using symbol
router.get('/:symbol', marketDataController.getMarketData);

module.exports = router;
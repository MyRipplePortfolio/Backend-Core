const axios = require('axios');

exports.getMarketData = async (req, res) => {
  try {
    const symbol = req.params.symbol;
    // your market data logic here
    res.json({ message: `Real-time market data of ${symbol}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const xrpl = require('xrpl');
const axios = require('axios');

// Public server to connect to XRPL
const PUBLIC_SERVER = 'wss://xrplcluster.com/';

// Create a new XRPL client
const XRPclient = new xrpl.Client(PUBLIC_SERVER);

exports.getPortfolio = async (req, res) => {
  try {
    // Get USD price of XRP from CoinGecko API
    let xrpPrice = 0;
    const coingeckoResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binance-peg-xrp&vs_currencies=USD');
    xrpPrice = coingeckoResponse.data['binance-peg-xrp'].usd;

    // Retrieve address and assets from request
    const address = req.params.address;
    let assets = [];

    // Connect to XRPL server
    await XRPclient.connect();

    // Get XRP balance of the address
    const xrplAccountInfoRequest = {
      command: 'account_info',
      account: address,
      ledger_index: 'validated',
    };
    const xrplAccountInfoResponse = await XRPclient.request(xrplAccountInfoRequest);
    const xrpBalanceInDrops = xrplAccountInfoResponse.result.account_data.Balance;

    // Initialize portfolioResponse for XRP balance
    let portfolioResponse = [{
      currency: 'XRP',
      issuer: 'https://ripple.com/xrp/',
      Token_Balance: `${(xrpBalanceInDrops / 1000000).toFixed(2)}`,
      'USD-Value': `$${((xrpBalanceInDrops * xrpPrice) / 1000000).toFixed(2)}`,
    }];

    // Initialize USDTotal for XRP balance
    let USDTotal = (xrpBalanceInDrops * xrpPrice) / 1000000;

    // Get asset balances of the address
    const xrplAccountLineRequest = {
      command: 'account_lines',
      account: address,
      ledger_index: 'validated',
    };
    const xrplAccountLineResponse = await XRPclient.request(xrplAccountLineRequest);
    assets = assets.concat(xrplAccountLineResponse.result.lines);

    if (assets.length > 0) {
      // Map promises of fetching orderbook for each asset balance
      await Promise.all(assets.map(async (element) => {
        const we_want = {
          currency: element.currency,
          issuer: element.account,
        };
        const we_spend = {
          currency: 'XRP',
        };
        const orderbook_resp = await XRPclient.request({
          command: 'book_offers',
          taker: address,
          ledger_index: 'current',
          taker_gets: we_want,
          taker_pays: we_spend,
          limit: 1,
        });

        // Update portfolioResponse and USDTotal for each asset balance
        if (orderbook_resp['result']['offers'].length > 0) {
          portfolioResponse.push({
            currency: element.currency,
            issuer: element.account,
            Token_Balance: Number(element.balance).toFixed(2),
            'USD-Value': `$${(orderbook_resp['result']['offers'][0]['quality'] *
              element.balance *
              (xrpPrice / 1000000)).toFixed(2)}`,
          });
          USDTotal += orderbook_resp['result']['offers'][0]['quality'] *
            element.balance *
            (xrpPrice / 1000000);
        }
      }));
    }

    // Return portfolio data and total USD value
    res.json({
      message: `Portfolio of address ${address}`,
      totalUSDValue: `$${USDTotal.toFixed(2)}`,
      portfolioData: portfolioResponse,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching portfolio data.' });
  }
};
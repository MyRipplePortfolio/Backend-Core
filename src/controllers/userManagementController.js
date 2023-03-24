const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const xrpl = require("xrpl");
const axios = require("axios");

// Public server to connect to XRPL
const PUBLIC_SERVER = "wss://xrplcluster.com/";

// Create a new XRPL client
const XRPclient = new xrpl.Client(PUBLIC_SERVER);

// Gets details of a user by ID, including their XRPL wallet balance in XRP and USD.
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id; // User ID from request params

    // Find the user by their ID in the database
    const user = await User.findById(userId);

    // Connect to XRPL
    await XRPclient.connect();

    let xrpPrice = 0; // USD price of XRP
    const coingeckoResponse = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=binance-peg-xrp&vs_currencies=USD");
    xrpPrice = coingeckoResponse.data["binance-peg-xrp"].usd;

    // Check the user's XRP balance on XRPL
    const xrplAccountInfoRequest = {
      command: "account_info",
      account: user.address,
      ledger_index: "validated",
    };
    const xrplAccountInfoResponse = await XRPclient.request(xrplAccountInfoRequest);
    const xrpBalanceInDrops = xrplAccountInfoResponse.result.account_data.Balance;

    res.json({
      message: `Details of user ${userId}`,
      address: user.address,
      xrpBalance: `${(xrpBalanceInDrops / 1000000).toFixed(2)}`,
      xrpBalanceDollarValue: `$${(((xrpBalanceInDrops * xrpPrice) / 1000000).toFixed(2))}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get user details" });
  } finally {
    await XRPclient.disconnect(); // Always disconnect from the XRPL client
  }
};


// Gets notifications of a user by ID.

exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.id; // User ID from request params
    
    // Find notifications for the user by their ID in the database
    const notifications = await Notification.find({ userId: userId }, "title message");

    res.json({
      message: `Notifications of user ${userId}`,
      notifications: notifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get user notifications" });
  }
};


// Deletes a user by ID, including all their associated notifications.

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // User ID from request params
    
    // Delete the user by their ID in the database
    await User.findByIdAndDelete(userId);
    // Delete all notifications for the user by their ID in the database
    await Notification.deleteMany({ userId: userId });

    res.json({ message: `User ${userId} deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
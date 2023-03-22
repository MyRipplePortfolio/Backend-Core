const Notification = require('../models/notificationModel');

exports.sendNotification = async (req, res) => {
  try {
    const id = req.params.id;
    // your notification logic here
    res.json({ message: `Notification sent to user ${id}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
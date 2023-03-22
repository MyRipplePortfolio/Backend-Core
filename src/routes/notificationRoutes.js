const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Send notification to user with given id
router.post('/:id', notificationController.sendNotification);

module.exports = router;
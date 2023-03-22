const express = require('express');
const router = express.Router();
const userManagementController = require('../controllers/userManagementController');

// Get user details by ID
router.get('/:id', userManagementController.getUserDetails);

// Get user notifications by ID
router.get('/:id/notifications', userManagementController.getUserNotifications);

// Delete user by ID
router.delete('/:id', userManagementController.deleteUser);

module.exports = router;
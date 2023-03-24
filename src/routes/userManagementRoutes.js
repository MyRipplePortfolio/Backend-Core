const express = require('express');
const router = express.Router();
const userManagementController = require('../controllers/userManagementController');
const authenticationMiddleware = require('../middlewares/authMiddleware')
// Get user details by ID
router.get('/:id', authenticationMiddleware, userManagementController.getUserDetails);

// Get user notifications by ID
router.get('/:id/notifications', authenticationMiddleware, userManagementController.getUserNotifications);

// Delete user by ID
router.delete('/:id', authenticationMiddleware, userManagementController.deleteUser);

module.exports = router;
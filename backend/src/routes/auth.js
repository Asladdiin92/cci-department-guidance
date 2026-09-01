/**
 * Authentication Routes
 * Admin login and token verification
 */

const express = require('express');
const router = express.Router();
const { login, verifyToken, getCurrentUser } = require('../controllers/authController');
const { authenticateAdmin } = require('../middleware/auth');
const { validate, schemas, validateUUID } = require('../middleware/validator');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

/**
 * @route   POST /api/auth/login
 * @desc    Admin login
 * @access  Public
 */
router.post(
  '/login',
  validate(schemas.adminLogin),
  asyncHandler(login)
);

/**
 * @route   POST /api/auth/verify
 * @desc    Verify JWT token
 * @access  Public
 */
router.post(
  '/verify',
  asyncHandler(verifyToken)
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated admin
 * @access  Private
 */
router.get(
  '/me',
  authenticateAdmin,
  asyncHandler(getCurrentUser)
);

module.exports = router;

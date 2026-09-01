/**
 * Authentication Controller
 * Handles admin login and token verification
 */

const { supabaseAdmin } = require('../config/supabase');
const { successResponse, errorResponse } = require('../utils/response');
const { AppError } = require('../middleware/errorHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Admin Login
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Fetch admin user
    const { data: admin, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .eq('is_active', true)
      .single();

    if (error || !admin) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: admin.role,
        email: admin.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Update last login
    await supabaseAdmin
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id);

    return successResponse(res, {
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role
      }
    }, 'Login successful');

  } catch (error) {
    next(error);
  }
};

/**
 * Verify Token
 * POST /api/auth/verify
 */
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new AppError('No token provided', 401);
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch admin user to ensure still active
    const { data: admin, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, username, email, full_name, role, is_active')
      .eq('id', decoded.id)
      .eq('is_active', true)
      .single();

    if (error || !admin) {
      throw new AppError('Invalid token', 401);
    }

    return successResponse(res, {
      valid: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role
      }
    }, 'Token is valid');

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired', 401));
    }
    next(error);
  }
};

/**
 * Get Current Admin User
 * GET /api/auth/me
 */
const getCurrentUser = async (req, res, next) => {
  try {
    // req.admin is set by auth middleware
    return successResponse(res, {
      admin: req.admin
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  verifyToken,
  getCurrentUser
};

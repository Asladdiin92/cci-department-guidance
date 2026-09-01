/**
 * Authentication Middleware
 * Protects routes requiring admin authentication
 */

const jwt = require('jsonwebtoken');
const { supabaseAdmin } = require('../config/supabase');
const { AppError } = require('./errorHandler');

/**
 * Verify JWT token and attach admin to request
 */
const authenticateAdmin = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new AppError('Token expired', 401);
      }
      throw new AppError('Invalid token', 401);
    }

    // Fetch admin from database
    const { data: admin, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, username, email, full_name, role, is_active')
      .eq('id', decoded.id)
      .single();

    if (error || !admin) {
      throw new AppError('Admin not found', 401);
    }

    if (!admin.is_active) {
      throw new AppError('Admin account is inactive', 403);
    }

    // Attach admin to request
    req.admin = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      full_name: admin.full_name,
      role: admin.role
    };

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Check if admin has specific role
 * @param {String|Array} roles - Required role(s)
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return next(new AppError('Authentication required', 401));
    }

    if (!roles.includes(req.admin.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }

    next();
  };
};

/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { data: admin } = await supabaseAdmin
      .from('admin_users')
      .select('id, username, email, full_name, role')
      .eq('id', decoded.id)
      .eq('is_active', true)
      .single();

    if (admin) {
      req.admin = admin;
    }

    next();
  } catch (error) {
    // Continue without auth
    next();
  }
};

module.exports = {
  authenticateAdmin,
  requireRole,
  optionalAuth
};

/**
 * CCI Department Guidance System - Backend Server
 * Express.js API server with Supabase integration
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { errorHandler, notFound } = require('../src/middleware/errorHandler');
const { testConnection } = require('../src/config/supabase');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ================================================================
// MIDDLEWARE
// ================================================================

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ================================================================
// ROUTES
// ================================================================

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const dbConnected = await testConnection();
  
  res.json({
    success: true,
    message: 'CCI Department Guidance API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: dbConnected ? 'Connected' : 'Disconnected'
  });
});

// API version info
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'CCI Department Guidance System API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      departments: 'GET /api/departments',
      assessments: 'POST /api/assessments/start',
      feedback: 'POST /api/feedback'
    }
  });
});

// Import route modules
const departmentsRoutes = require('../src/routes/departments');
const assessmentsRoutes = require('../src/routes/assessments');
const feedbackRoutes = require('../src/routes/feedback');
const authRoutes = require('../src/routes/auth');
const adminRoutes = require('../src/routes/admin');

// Mount routes
app.use('/api/departments', departmentsRoutes);
app.use('/api/assessments', assessmentsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// ================================================================
// ERROR HANDLING
// ================================================================

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Export for Vercel serverless (no server startup needed)
module.exports = app;

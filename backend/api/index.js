/**
 * CCI Department Guidance System - Vercel Serverless Entry Point
 * Express.js API server with Supabase integration
 * 
 * @version 2.2.0 - Critical CORS & Serverless Fixes
 * @description Serverless wrapper for Vercel deployment
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { errorHandler, notFound } = require('../src/middleware/errorHandler');
const { testConnection } = require('../src/config/supabase');

// ================================================================
// INITIALIZE EXPRESS APP
// ================================================================

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production'; // Vercel defaults to production
const API_VERSION = process.env.API_VERSION || 'v1';

// Trust proxy (required for Vercel)
app.set('trust proxy', 1);

// ================================================================
// SECURITY & MIDDLEWARE CONFIGURATION
// ================================================================

/**
 * Helmet - Security Headers
 */
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://*.supabase.co"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

/**
 * CORS Configuration - FIXED
 * Critical fix: Never use '*' with credentials: true
 */
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000']; // ✅ Explicit fallback

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, server-to-server)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.some(allowed => {
      // Exact match
      if (allowed === origin) return true;
      
      // Strict wildcard patterns for known platforms
      if (allowed === '*.vercel.app') {
        return /^https:\/\/[a-zA-Z0-9\-]+\.vercel\.app$/.test(origin);
      }
      if (allowed === '*.railway.app') {
        return /^https:\/\/[a-zA-Z0-9\-]+\.railway\.app$/.test(origin);
      }
      if (allowed === '*.netlify.app') {
        return /^https:\/\/[a-zA-Z0-9\-]+\.netlify\.app$/.test(origin);
      }
      
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`⚠️  CORS blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // ✅ Safe because origin is never '*'
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  maxAge: 86400
};

app.use(cors(corsOptions));

/**
 * Body Parsing - SECURED
 * Added strict: true to prevent primitive JSON attacks
 */
app.use(express.json({ 
  limit: '10mb',
  strict: true // ✅ Only parse arrays and objects
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb',
  parameterLimit: 1000
}));

/**
 * Rate Limiting
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { 
    success: false, 
    error: 'Too many requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

/**
 * Request ID & Logging - RESTORED
 * Critical for debugging and request tracing
 */
app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'] || 
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  req.id = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
});

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const emoji = res.statusCode >= 400 ? '❌' : '✅';
    
    if (NODE_ENV === 'development' || res.statusCode >= 400) {
      console.log(
        `${emoji} [${req.id}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
      );
    }
  });
  
  next();
});

// ================================================================
// API ROUTES
// ================================================================

/**
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'CCI Department Guidance System API',
    version: API_VERSION,
    environment: NODE_ENV,
    documentation: '/api',
    status: 'operational',
    serverless: true
  });
});

/**
 * Health Check - OPTIMIZED
 * Uses cached connection status to avoid DB load
 */
let cachedDbStatus = null;
let lastDbCheck = 0;
const DB_CHECK_INTERVAL = 60000; // Check every 60 seconds

app.get('/api/health', async (req, res) => {
  try {
    const now = Date.now();
    
    // Use cached status if recent
    if (cachedDbStatus !== null && (now - lastDbCheck) < DB_CHECK_INTERVAL) {
      return res.json({
        success: true,
        message: 'CCI Department Guidance API is healthy',
        timestamp: new Date().toISOString(),
        environment: NODE_ENV,
        database: {
          status: cachedDbStatus ? 'Connected' : 'Disconnected',
          provider: 'Supabase',
          cached: true
        },
        serverless: true,
        nodeVersion: process.version
      });
    }
    
    // Refresh DB status
    const dbConnected = await testConnection();
    cachedDbStatus = dbConnected;
    lastDbCheck = now;
    
    res.json({
      success: true,
      message: 'CCI Department Guidance API is healthy',
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      database: {
        status: dbConnected ? 'Connected' : 'Disconnected',
        provider: 'Supabase',
        cached: false
      },
      serverless: true,
      nodeVersion: process.version
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(503).json({
      success: false,
      message: 'Service temporarily unavailable',
      error: error.message
    });
  }
});

/**
 * API Information
 */
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'CCI Department Guidance System API',
    version: API_VERSION,
    environment: NODE_ENV,
    endpoints: {
      health: { method: 'GET', path: '/api/health', description: 'Health check' },
      departments: {
        list: { method: 'GET', path: '/api/departments', description: 'List all departments' },
        detail: { method: 'GET', path: '/api/departments/:code', description: 'Get department details' }
      },
      assessments: {
        start: { method: 'POST', path: '/api/assessments/start', description: 'Start assessment' },
        respond: { method: 'POST', path: '/api/assessments/:id/responses', description: 'Save response' },
        submit: { method: 'POST', path: '/api/assessments/:id/submit', description: 'Submit assessment' },
        results: { method: 'GET', path: '/api/assessments/:id/results', description: 'Get results' }
      },
      feedback: { 
        submit: { method: 'POST', path: '/api/feedback', description: 'Submit feedback' } 
      },
      auth: { 
        login: { method: 'POST', path: '/api/auth/login', description: 'Admin login' } 
      },
      admin: {
        stats: { method: 'GET', path: '/api/admin/stats', description: 'Dashboard stats' },
        analytics: { method: 'GET', path: '/api/admin/analytics', description: 'Analytics data' },
        submissions: { method: 'GET', path: '/api/admin/submissions', description: 'Student submissions' }
      }
    },
    support: {
      email: 'cci@haramaya.edu.et',
      website: 'https://www.haramaya.edu.et'
    }
  });
});

// ================================================================
// MOUNT API ROUTERS
// ================================================================

const departmentsRoutes = require('../src/routes/departments');
const assessmentsRoutes = require('../src/routes/assessments');
const feedbackRoutes = require('../src/routes/feedback');
const authRoutes = require('../src/routes/auth');
const adminRoutes = require('../src/routes/admin');
const databaseRoutes = require('../src/routes/databaseRoutes');

app.use('/api/departments', departmentsRoutes);
app.use('/api/assessments', assessmentsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/database', databaseRoutes);

console.log('✅ All routes mounted successfully');

// ================================================================
// ERROR HANDLING
// ================================================================

app.use(notFound);
app.use(errorHandler);

// ================================================================
// SERVER STARTUP & EXPORT
// ================================================================

/**
 * Conditional server startup - RESTORED
 * Starts HTTP server if not in serverless environment
 */
if (process.env.VERCEL !== '1' && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(PORT, () => {
    console.log('');
    console.log('═'.repeat(70));
    console.log('  🎓 CCI DEPARTMENT GUIDANCE SYSTEM - BACKEND API');
    console.log('═'.repeat(70));
    console.log('');
    console.log('  📍 Server URL:    ', `http://localhost:${PORT}`);
    console.log('  🌐 Environment:   ', NODE_ENV.toUpperCase());
    console.log('  📦 Version:       ', API_VERSION);
    console.log('  🔐 CORS Origins:  ', allowedOrigins.join(', '));
    console.log('');
    console.log('  📚 API Docs:      ', `http://localhost:${PORT}/api`);
    console.log('  🏥 Health Check:  ', `http://localhost:${PORT}/api/health`);
    console.log('');
    console.log('═'.repeat(70));
    console.log('  Ready to accept connections');
    console.log('═'.repeat(70));
    console.log('');
  });
}

/**
 * Export for Vercel serverless
 * Vercel will import this and handle requests without starting a server
 */
module.exports = app;

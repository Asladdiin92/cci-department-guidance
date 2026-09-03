/**
 * CCI Department Guidance System - Backend Server
 * Express.js API server with Supabase integration
 * 
 * @author Asladin Abdukedir
 * @version 2.1.0 - Security Hardened
 * @description Production-ready Express server with industry-standard security
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { errorHandler, notFound } = require('./middleware/errorHandler');
const { testConnection } = require('./config/supabase');

// ================================================================
// INITIALIZE EXPRESS APP
// ================================================================

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_VERSION = process.env.API_VERSION || 'v1';

// Trust proxy (required for Railway, Heroku, Vercel, etc.)
app.set('trust proxy', 1);

// ================================================================
// SECURITY & MIDDLEWARE CONFIGURATION
// ================================================================

/**
 * Helmet - Security Headers
 * Industry standard for setting secure HTTP headers
 */
app.use(helmet({
  contentSecurityPolicy: NODE_ENV === 'production' ? {
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
  } : false, // Disable strict CSP in development
  crossOriginEmbedderPolicy: false, // Allow embedding from same origin
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

/**
 * CORS Configuration
 * Strict origin validation with proper wildcard support
 */
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    
    // Production origins (from environment variable)
    const productionOrigins = process.env.CORS_ORIGIN 
      ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
      : [];
    
    // Development origins (only allowed in development mode)
    const devOrigins = NODE_ENV === 'development' 
      ? ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174']
      : [];
    
    // Combine allowed origins
    const allowedOrigins = [...productionOrigins, ...devOrigins];
    
    // Fallback if no origins configured
    if (allowedOrigins.length === 0) {
      console.warn('⚠️  No CORS origins configured! Using default localhost');
      allowedOrigins.push('http://localhost:5173');
    }
    
    // Check if origin matches allowed patterns
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed === '*') {
        console.warn('⚠️  CORS wildcard (*) is enabled - not recommended for production!');
        return true;
      }
      
      // Exact match
      if (allowed === origin) return true;
      
      // Strict wildcard patterns for known platforms
      if (allowed.includes('*')) {
        // Vercel: *.vercel.app
        if (allowed === '*.vercel.app') {
          return /^https:\/\/[a-zA-Z0-9\-]+\.vercel\.app$/.test(origin);
        }
        // Railway: *.railway.app
        if (allowed === '*.railway.app') {
          return /^https:\/\/[a-zA-Z0-9\-]+\.railway\.app$/.test(origin);
        }
        // Netlify: *.netlify.app
        if (allowed === '*.netlify.app') {
          return /^https:\/\/[a-zA-Z0-9\-]+\.netlify\.app$/.test(origin);
        }
        
        // Generic subdomain pattern (use with caution)
        const domain = allowed.replace('*.', '');
        const pattern = `^https:\\/\\/[a-zA-Z0-9\\-]+\\.${domain.replace(/\./g, '\\.')}$`;
        return new RegExp(pattern).test(origin);
      }
      
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`⚠️  CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

/**
 * Body Parsing Middleware
 * Removed dangerous verify function - let Express handle JSON errors naturally
 */
app.use(express.json({ 
  limit: '10mb',
  strict: true // Only parse arrays and objects
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb',
  parameterLimit: 1000
}));

/**
 * Rate Limiting - Production Grade
 * Uses express-rate-limit with proper headers
 */
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Limit per IP
  message: { 
    success: false, 
    error: 'Too many requests. Please try again later.',
    retryAfter: 'See Retry-After header'
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  skip: (req) => NODE_ENV === 'development', // Skip in development
  handler: (req, res) => {
    console.warn(`⚠️  Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.'
    });
  }
});

// Apply rate limiting to all requests
app.use(limiter);

/**
 * Request ID Middleware
 * Adds unique ID to each request for tracing
 */
app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'] || 
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  req.id = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
});

/**
 * Request Logging Middleware
 * Logs all incoming requests with timing
 */
app.use((req, res, next) => {
  const start = Date.now();
  
  // Log request
  if (NODE_ENV === 'development') {
    console.log(`[${req.id}] ${req.method} ${req.path}`);
  }
  
  // Log response when finished
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
 * Provides API information and available endpoints
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'CCI Department Guidance System API',
    version: API_VERSION,
    environment: NODE_ENV,
    documentation: '/api',
    status: 'operational'
  });
});

/**
 * Health Check Endpoint
 * Checks API and database connectivity
 */
app.get('/api/health', async (req, res) => {
  try {
    const dbConnected = await testConnection();
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    
    res.json({
      success: true,
      message: 'CCI Department Guidance API is healthy',
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      uptime: `${Math.floor(uptime / 60)} minutes`,
      database: {
        status: dbConnected ? 'Connected' : 'Disconnected',
        provider: 'Supabase'
      },
      memory: {
        used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`
      },
      nodeVersion: process.version
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Service temporarily unavailable',
      error: error.message
    });
  }
});

/**
 * API Information Endpoint
 * Documents all available endpoints
 */
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'CCI Department Guidance System API',
    version: API_VERSION,
    endpoints: {
      health: {
        method: 'GET',
        path: '/api/health',
        description: 'Check API health and database connectivity'
      },
      departments: {
        list: { method: 'GET', path: '/api/departments', description: 'Get all departments' },
        detail: { method: 'GET', path: '/api/departments/:code', description: 'Get department by code' },
        compare: { method: 'GET', path: '/api/departments/compare', description: 'Compare departments' }
      },
      assessments: {
        start: { method: 'POST', path: '/api/assessments/start', description: 'Start new assessment' },
        respond: { method: 'POST', path: '/api/assessments/:id/responses', description: 'Save response' },
        submit: { method: 'POST', path: '/api/assessments/:id/submit', description: 'Submit assessment' },
        results: { method: 'GET', path: '/api/assessments/:id/results', description: 'Get results' },
        progress: { method: 'GET', path: '/api/assessments/:id/progress', description: 'Get progress' }
      },
      feedback: {
        submit: { method: 'POST', path: '/api/feedback', description: 'Submit user feedback' },
        list: { method: 'GET', path: '/api/feedback', description: 'List feedback (admin)' }
      },
      admin: {
        stats: { method: 'GET', path: '/api/admin/stats', description: 'Get dashboard stats' },
        analytics: { method: 'GET', path: '/api/admin/analytics', description: 'Get analytics data' },
        submissions: { method: 'GET', path: '/api/admin/submissions', description: 'Get submissions' }
      },
      database: {
        list: { method: 'GET', path: '/api/admin/database/:table', description: 'List table rows' },
        create: { method: 'POST', path: '/api/admin/database/:table', description: 'Create row' },
        update: { method: 'PUT', path: '/api/admin/database/:table/:id', description: 'Update row' },
        delete: { method: 'DELETE', path: '/api/admin/database/:table/:id', description: 'Delete row' }
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

// Import all route modules
const departmentsRoutes = require('./routes/departments');
const assessmentsRoutes = require('./routes/assessments');
const feedbackRoutes = require('./routes/feedback');
const adminRoutes = require('./routes/admin');
const databaseRoutes = require('./routes/databaseRoutes');

// Mount routes with versioning support
app.use('/api/departments', departmentsRoutes);
app.use('/api/assessments', assessmentsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/database', databaseRoutes);

// API version aliases (future-proofing)
if (API_VERSION !== 'v1') {
  app.use(`/api/${API_VERSION}/departments`, departmentsRoutes);
  app.use(`/api/${API_VERSION}/assessments`, assessmentsRoutes);
  app.use(`/api/${API_VERSION}/feedback`, feedbackRoutes);
  app.use(`/api/${API_VERSION}/admin`, adminRoutes);
  app.use(`/api/${API_VERSION}/admin/database`, databaseRoutes);
}

console.log('✅ All routes mounted successfully');

// ================================================================
// ERROR HANDLING MIDDLEWARE
// ================================================================

/**
 * 404 Not Found Handler
 * Catches all unmatched routes
 */
app.use(notFound);

/**
 * Global Error Handler
 * Catches and formats all errors
 */
app.use(errorHandler);

// ================================================================
// GRACEFUL SHUTDOWN
// ================================================================

/**
 * Graceful Shutdown Handler
 * Properly closes connections before exiting
 */
const gracefulShutdown = (signal) => {
  console.log(`\n⚠️  Received ${signal}, starting graceful shutdown...`);
  
  server.close(() => {
    console.log('✅ HTTP server closed');
    console.log('👋 Process terminated');
    process.exit(0);
  });
  
  // Force close after 30 seconds
  setTimeout(() => {
    console.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

// Handle various shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

/**
 * Unhandled Promise Rejection Handler
 * Logs unhandled promise rejections
 */
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Promise Rejection at:', promise);
  console.error('Reason:', reason);
  
  if (NODE_ENV === 'production') {
    // In production, log to monitoring service and continue
    // TODO: Integrate with logging service (e.g., Sentry, LogRocket)
  } else {
    // In development, exit to surface the issue
    process.exit(1);
  }
});

/**
 * Uncaught Exception Handler
 * Logs uncaught exceptions and exits
 */
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  
  // Exit process as state may be inconsistent
  process.exit(1);
});

// ================================================================
// SERVER INITIALIZATION
// ================================================================

let server;

/**
 * Start Server
 * Initializes database connection and starts HTTP server
 */
const startServer = async () => {
  try {
    console.log('');
    console.log('🚀 Starting CCI Department Guidance System...');
    console.log('');
    
    // Test database connection
    console.log('📡 Testing database connection...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.warn('⚠️  WARNING: Server starting without database connection');
      console.warn('    Some features may not work correctly');
      
      if (NODE_ENV === 'production') {
        throw new Error('Database connection required in production');
      }
    }
    
    // Start HTTP server
    server = app.listen(PORT, () => {
      console.log('');
      console.log('═'.repeat(70));
      console.log('  🎓 CCI DEPARTMENT GUIDANCE SYSTEM - BACKEND API');
      console.log('═'.repeat(70));
      console.log('');
      console.log('  📍 Server URL:    ', `http://localhost:${PORT}`);
      console.log('  🌐 Environment:   ', NODE_ENV.toUpperCase());
      console.log('  📦 Version:       ', API_VERSION);
      console.log('  💾 Database:      ', dbConnected ? '✅ Connected (Supabase)' : '❌ Disconnected');
      console.log('  🔐 CORS Origin:   ', process.env.CORS_ORIGIN || 'localhost:5173');
      console.log('');
      console.log('  📚 API Docs:      ', `http://localhost:${PORT}/api`);
      console.log('  🏥 Health Check:  ', `http://localhost:${PORT}/api/health`);
      console.log('');
      console.log('═'.repeat(70));
      console.log('  Ready to accept connections');
      console.log('═'.repeat(70));
      console.log('');
      
      // Log routes in development
      if (NODE_ENV === 'development') {
        console.log('📝 Registered Routes:');
        console.log('   - GET  /api');
        console.log('   - GET  /api/health');
        console.log('   - *    /api/departments');
        console.log('   - *    /api/assessments');
        console.log('   - *    /api/feedback');
        console.log('   - *    /api/auth');
        console.log('   - *    /api/admin');
        console.log('');
      }
    });
    
    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`);
        console.error('   Try a different port or kill the process using this port');
      } else {
        console.error('❌ Server error:', error);
      }
      process.exit(1);
    });
    
  } catch (error) {
    console.error('');
    console.error('❌ Failed to start server');
    console.error('Error:', error.message);
    console.error('');
    
    if (error.stack) {
      console.error('Stack trace:');
      console.error(error.stack);
    }
    
    process.exit(1);
  }
};

// ================================================================
// EXPORT & START
// ================================================================

// Start the server (only if not in serverless environment)
if (process.env.VERCEL !== '1' && process.env.AWS_LAMBDA_FUNCTION_NAME !== 'true') {
  startServer();
} else {
  console.log('🔧 Running in serverless mode');
}

// Export app for serverless platforms (Vercel, AWS Lambda, etc.)
module.exports = app;

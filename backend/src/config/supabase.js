/**
 * Supabase Client Configuration
 * Initializes and exports Supabase client for database operations
 * 
 * @version 2.0.0 - Enhanced with proper error handling and validation
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// ================================================================
// WEBSOCKET POLYFILL (Safe Error Handling)
// ================================================================

// WebSocket polyfill for Node.js < 22
if (typeof WebSocket === 'undefined') {
  try {
    global.WebSocket = require('ws');
  } catch (error) {
    console.warn('⚠️  WebSocket (ws) package not found. Real-time features will be disabled.');
    console.warn('   Install with: npm install ws');
    // Don't crash - Supabase will work without realtime features
  }
}

// ================================================================
// ENVIRONMENT VALIDATION
// ================================================================

const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('   Please create a .env file based on .env.example');
  console.error('   Required variables:');
  console.error('   - SUPABASE_URL=https://your-project.supabase.co');
  console.error('   - SUPABASE_ANON_KEY=your-anon-key');
  process.exit(1);
}

// Validate URL format
try {
  new URL(process.env.SUPABASE_URL);
} catch (error) {
  console.error('❌ Invalid SUPABASE_URL format:', process.env.SUPABASE_URL);
  console.error('   Expected format: https://your-project.supabase.co');
  process.exit(1);
}

// ================================================================
// SUPABASE CLIENT CONFIGURATION
// ================================================================

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Public Supabase Client (with RLS)
 * Used for user-facing operations that respect Row Level Security
 */
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false, // Backend server doesn't manage user sessions
    persistSession: false,    // Don't persist sessions in backend
    detectSessionInUrl: false // Backend doesn't handle OAuth redirects
  },
  db: {
    schema: 'public' // Explicit schema
  },
  global: {
    headers: {
      'X-Client-Info': 'cci-backend/public'
    }
  }
});

/**
 * Admin Supabase Client (bypasses RLS)
 * Used for privileged operations that need full database access
 */
const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false, // Backend server doesn't manage user sessions
        persistSession: false,
        detectSessionInUrl: false
      },
      db: {
        schema: 'public'
      },
      global: {
        headers: {
          'X-Client-Info': 'cci-backend/admin'
        }
      }
    })
  : null;

// Warn if admin client not configured (optional but recommended)
if (!supabaseServiceKey) {
  console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY not configured');
  console.warn('   Admin operations will use anon client (with RLS restrictions)');
  console.warn('   For full admin capabilities, add SUPABASE_SERVICE_ROLE_KEY to .env');
}

// ================================================================
// DATABASE CONNECTION TEST
// ================================================================

/**
 * Test database connection
 * Uses proper PostgREST syntax with head-only request
 * @returns {Promise<boolean>} True if connection successful
 */
async function testConnection() {
  try {
    // Use head: true to avoid fetching actual data (just checks if table exists)
    const { error } = await supabase
      .from('departments')
      .select('id', { head: true, count: 'exact' })
      .limit(1);
    
    if (error) {
      console.warn('⚠️  Database connection test failed:', error.message);
      console.warn('   Details:', {
        code: error.code,
        hint: error.hint,
        details: error.details
      });
      return false;
    }
    
    console.log('✅ Supabase connection established successfully');
    return true;
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    if (err.stack && process.env.NODE_ENV === 'development') {
      console.error('   Stack:', err.stack);
    }
    return false;
  }
}

// ================================================================
// ADMIN CLIENT HELPERS
// ================================================================

/**
 * Get admin client with proper error handling
 * Throws error if admin client not available in production
 * @returns {import('@supabase/supabase-js').SupabaseClient} Admin client
 * @throws {Error} If admin client not configured in production
 */
function getAdminClient() {
  if (!supabaseAdmin) {
    const errorMsg = 'Admin client not available - SUPABASE_SERVICE_ROLE_KEY not configured';
    
    if (process.env.NODE_ENV === 'production') {
      // In production, this is a critical error
      console.error('❌', errorMsg);
      throw new Error(errorMsg);
    } else {
      // In development, warn and fall back to anon client
      console.warn('⚠️', errorMsg);
      console.warn('   Falling back to anon client (RLS will apply)');
      return supabase;
    }
  }
  
  return supabaseAdmin;
}

/**
 * Get appropriate client based on admin flag
 * @param {boolean} useAdmin - Whether to use admin client
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
function getClient(useAdmin = false) {
  return useAdmin ? getAdminClient() : supabase;
}

// ================================================================
// EXPORTS
// ================================================================

module.exports = {
  supabase,           // Public client (with RLS)
  supabaseAdmin,      // Admin client (bypasses RLS) or null
  testConnection,     // Connection test function
  getClient,          // Get client by admin flag
  getAdminClient,     // Get admin client with validation
  
  // Connection status
  hasAdminClient: !!supabaseAdmin,
  
  // Configuration info (for debugging)
  config: {
    url: supabaseUrl,
    hasServiceKey: !!supabaseServiceKey,
    schema: 'public',
    environment: process.env.NODE_ENV || 'development'
  }
};

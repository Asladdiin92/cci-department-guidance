/**
 * Supabase Client Configuration
 * Initializes and exports Supabase client for database operations
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('Please create a .env file based on .env.example');
  process.exit(1);
}

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create Supabase client for public operations (with RLS)
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

// Create Supabase admin client for privileged operations (bypasses RLS)
const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      db: {
        schema: 'public'
      }
    })
  : null;

// Test database connection
async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('count')
      .limit(1);
    
    if (error) {
      console.warn('⚠️  Database connection test failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection established successfully');
    return true;
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    return false;
  }
}

// Export clients and utilities
module.exports = {
  supabase,
  supabaseAdmin,
  testConnection,
  
  // Helper to get appropriate client
  getClient: (useAdmin = false) => {
    if (useAdmin && !supabaseAdmin) {
      console.warn('⚠️  Admin client requested but SUPABASE_SERVICE_ROLE_KEY not configured');
      return supabase;
    }
    return useAdmin ? supabaseAdmin : supabase;
  }
};

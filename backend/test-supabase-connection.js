/**
 * Supabase Connection Test & Diagnostics Script
 * Tests database connectivity and validates schema
 * 
 * Usage: node test-supabase-connection.js
 */

const { supabase, supabaseAdmin, config, hasAdminClient } = require('./src/config/supabase');
const chalk = require('chalk'); // Optional - will work without it

// Simple color helpers if chalk not available
const color = {
  green: (text) => chalk ? chalk.green(text) : `✓ ${text}`,
  red: (text) => chalk ? chalk.red(text) : `✗ ${text}`,
  yellow: (text) => chalk ? chalk.yellow(text) : `⚠ ${text}`,
  blue: (text) => chalk ? chalk.blue(text) : `ℹ ${text}`,
  cyan: (text) => chalk ? chalk.cyan(text) : text,
  bold: (text) => chalk ? chalk.bold(text) : text
};

console.log('\n' + color.bold('========================================'));
console.log(color.bold('  SUPABASE CONNECTION DIAGNOSTICS'));
console.log(color.bold('========================================\n'));

// Test Results Tracker
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

function logTest(name, passed, message = '', isWarning = false) {
  const status = passed ? color.green('PASS') : (isWarning ? color.yellow('WARN') : color.red('FAIL'));
  console.log(`${status} | ${name}`);
  if (message) console.log(`      ${message}`);
  
  results.tests.push({ name, passed, message });
  if (passed) results.passed++;
  else if (isWarning) results.warnings++;
  else results.failed++;
}

async function runTests() {
  // ========================================
  // 1. Environment Configuration
  // ========================================
  console.log(color.cyan('\n1. Environment Configuration\n'));
  
  logTest('SUPABASE_URL configured', !!config.url);
  logTest('SUPABASE_ANON_KEY configured', !!process.env.SUPABASE_ANON_KEY);
  logTest('SUPABASE_SERVICE_ROLE_KEY configured', config.hasServiceKey, 
    config.hasServiceKey ? '' : 'Optional but recommended for admin operations', !config.hasServiceKey);
  
  console.log(color.blue(`   URL: ${config.url}`));
  console.log(color.blue(`   Environment: ${config.environment}`));
  console.log(color.blue(`   Schema: ${config.schema}`));
  
  // ========================================
  // 2. Basic Connectivity
  // ========================================
  console.log(color.cyan('\n2. Basic Connectivity\n'));
  
  try {
    const { error } = await supabase
      .from('departments')
      .select('id', { head: true, count: 'exact' })
      .limit(1);
    
    logTest('Public client connection', !error, error?.message);
  } catch (err) {
    logTest('Public client connection', false, err.message);
  }
  
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('departments')
        .select('id', { head: true, count: 'exact' })
        .limit(1);
      
      logTest('Admin client connection', !error, error?.message);
    } catch (err) {
      logTest('Admin client connection', false, err.message);
    }
  }
  
  // ========================================
  // 3. Table Existence Checks
  // ========================================
  console.log(color.cyan('\n3. Database Tables\n'));
  
  const tables = [
    'departments',
    'questions',
    'question_options',
    'assessments',
    'assessment_responses',
    'recommendations',
    'feedback'
  ];
  
  for (const table of tables) {
    try {
      const { error, count } = await supabase
        .from(table)
        .select('*', { head: true, count: 'exact' });
      
      logTest(`Table: ${table}`, !error, error ? error.message : `${count || 0} rows`);
    } catch (err) {
      logTest(`Table: ${table}`, false, err.message);
    }
  }
  
  // ========================================
  // 4. Data Validation
  // ========================================
  console.log(color.cyan('\n4. Data Validation\n'));
  
  // Check departments
  try {
    const { data: departments, error } = await supabase
      .from('departments')
      .select('code, name');
    
    const expectedDepts = ['CS', 'SWE', 'IT', 'IS', 'ISC', 'STAT'];
    const foundCodes = (departments || []).map(d => d.code);
    const allPresent = expectedDepts.every(code => foundCodes.includes(code));
    
    logTest('All 6 departments present', allPresent, 
      `Found: ${foundCodes.join(', ')}`);
  } catch (err) {
    logTest('All 6 departments present', false, err.message);
  }
  
  // Check questions
  try {
    const { data: questions, error } = await supabase
      .from('questions')
      .select('id')
      .eq('is_active', true);
    
    const count = questions?.length || 0;
    logTest('Assessment questions loaded', count >= 20, 
      `Found ${count} active questions (expected 20)`);
  } catch (err) {
    logTest('Assessment questions loaded', false, err.message);
  }
  
  // Check question options
  try {
    const { data: options, error } = await supabase
      .from('question_options')
      .select('id, question_id');
    
    const count = options?.length || 0;
    logTest('Question options loaded', count >= 80, 
      `Found ${count} options (expected ~120)`);
  } catch (err) {
    logTest('Question options loaded', false, err.message);
  }
  
  // ========================================
  // 5. Column Schema Validation
  // ========================================
  console.log(color.cyan('\n5. Schema Validation\n'));
  
  // Check assessments columns
  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('id, student_id, student_name, status, top_match_department')
      .limit(1);
    
    logTest('assessments table schema', !error, error?.message);
  } catch (err) {
    logTest('assessments table schema', false, 
      'Missing columns: student_id, status, or top_match_department. Run FIX_DATABASE.sql');
  }
  
  // Check question_options has score columns
  try {
    const { data, error } = await supabase
      .from('question_options')
      .select('cs_score, swe_score, it_score, is_score, isc_score, stat_score')
      .limit(1);
    
    logTest('question_options score columns', !error, error?.message);
  } catch (err) {
    logTest('question_options score columns', false, 
      'Missing individual score columns (cs_score, swe_score, etc.)');
  }
  
  // ========================================
  // 6. RLS Policies Check
  // ========================================
  console.log(color.cyan('\n6. Row Level Security\n'));
  
  // Test public read access
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('code, name')
      .limit(1);
    
    logTest('Public read access (departments)', !error && data?.length > 0);
  } catch (err) {
    logTest('Public read access (departments)', false, err.message);
  }
  
  // Test public insert (assessments)
  try {
    const testId = `test-${Date.now()}`;
    const { data, error } = await supabase
      .from('assessments')
      .insert({
        student_id: testId,
        student_name: 'Connection Test',
        student_email: 'test@test.com',
        status: 'in_progress'
      })
      .select()
      .single();
    
    if (!error && data) {
      // Clean up test data
      await supabase.from('assessments').delete().eq('id', data.id);
      logTest('Public insert access (assessments)', true);
    } else {
      logTest('Public insert access (assessments)', false, error?.message);
    }
  } catch (err) {
    logTest('Public insert access (assessments)', false, err.message);
  }
  
  // ========================================
  // 7. Performance Check
  // ========================================
  console.log(color.cyan('\n7. Performance\n'));
  
  const startTime = Date.now();
  try {
    await supabase
      .from('departments')
      .select('*');
    
    const duration = Date.now() - startTime;
    logTest('Query response time', duration < 1000, 
      `${duration}ms ${duration > 500 ? '(slow)' : ''}`);
  } catch (err) {
    logTest('Query response time', false, err.message);
  }
  
  // ========================================
  // Summary
  // ========================================
  console.log(color.bold('\n========================================'));
  console.log(color.bold('  TEST SUMMARY'));
  console.log(color.bold('========================================\n'));
  
  console.log(color.green(`  ✓ Passed:   ${results.passed}`));
  console.log(color.red(`  ✗ Failed:   ${results.failed}`));
  console.log(color.yellow(`  ⚠ Warnings: ${results.warnings}`));
  console.log(color.bold(`  ─ Total:    ${results.tests.length}\n`));
  
  const percentage = Math.round((results.passed / results.tests.length) * 100);
  console.log(color.bold(`  Success Rate: ${percentage}%\n`));
  
  if (results.failed === 0) {
    console.log(color.green('🎉 All critical tests passed!\n'));
    console.log(color.blue('   Your Supabase connection is healthy and ready.\n'));
  } else {
    console.log(color.red('❌ Some tests failed!\n'));
    console.log(color.yellow('   Please review the errors above and fix configuration.\n'));
    console.log(color.yellow('   Common fixes:\n'));
    console.log(color.yellow('   1. Run FIX_DATABASE.sql in Supabase SQL Editor\n'));
    console.log(color.yellow('   2. Check .env file has correct credentials\n'));
    console.log(color.yellow('   3. Verify RLS policies are configured\n'));
  }
  
  console.log(color.bold('========================================\n'));
  
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(err => {
  console.error(color.red('\n❌ Test suite crashed:'), err);
  process.exit(1);
});

/**
 * Quick Database Test
 * Simple script to test database connectivity and basic operations
 */

require('dotenv').config();
const { supabase } = require('./src/config/supabase');

async function runQuickTests() {
  console.log('\n🧪 Running Quick Database Tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  // Test 1: Connection
  try {
    console.log('Test 1: Database Connection');
    const { data, error } = await supabase
      .from('departments')
      .select('count');
    
    if (error) throw error;
    console.log('✅ PASSED - Database connected\n');
    passed++;
  } catch (error) {
    console.log('❌ FAILED - Database connection error');
    console.log('   Error:', error.message, '\n');
    failed++;
  }
  
  // Test 2: Departments Retrieval
  try {
    console.log('Test 2: Retrieve All Departments');
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('code');
    
    if (error) throw error;
    if (data.length !== 6) throw new Error(`Expected 6 departments, got ${data.length}`);
    
    console.log('✅ PASSED - Retrieved 6 departments');
    console.log('   Codes:', data.map(d => d.code).join(', '), '\n');
    passed++;
  } catch (error) {
    console.log('❌ FAILED - Departments retrieval');
    console.log('   Error:', error.message, '\n');
    failed++;
  }
  
  // Test 3: Questions Retrieval
  try {
    console.log('Test 3: Retrieve Active Questions');
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('is_active', true)
      .order('question_order');
    
    if (error) throw error;
    if (data.length < 20) throw new Error(`Expected 20+ questions, got ${data.length}`);
    
    console.log('✅ PASSED - Retrieved', data.length, 'active questions\n');
    passed++;
  } catch (error) {
    console.log('❌ FAILED - Questions retrieval');
    console.log('   Error:', error.message, '\n');
    failed++;
  }
  
  // Test 4: Assessment Creation
  try {
    console.log('Test 4: Create Test Assessment');
    const { data, error } = await supabase
      .from('assessments')
      .insert({
        student_id: `QUICK-TEST-${Date.now()}`,
        student_name: 'Quick Test',
        student_email: 'quicktest@test.com',
        status: 'in_progress'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    console.log('✅ PASSED - Assessment created');
    console.log('   ID:', data.id, '\n');
    
    // Cleanup
    await supabase.from('assessments').delete().eq('id', data.id);
    console.log('   Cleanup: Assessment deleted\n');
    passed++;
  } catch (error) {
    console.log('❌ FAILED - Assessment creation');
    console.log('   Error:', error.message);
    
    // Check if it's a column error
    if (error.message && error.message.includes('column')) {
      console.log('\n⚠️  IMPORTANT: Missing database columns!');
      console.log('   Run this SQL in Supabase SQL Editor:');
      console.log('\n   ALTER TABLE assessments ');
      console.log('   ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT \'in_progress\',');
      console.log('   ADD COLUMN IF NOT EXISTS student_id VARCHAR(50),');
      console.log('   ADD COLUMN IF NOT EXISTS top_match_department VARCHAR(10);\n');
    }
    failed++;
  }
  
  // Test 5: Question Options with Scores
  try {
    console.log('Test 5: Check Question Options Schema');
    const { data, error } = await supabase
      .from('question_options')
      .select('cs_score, swe_score, it_score, is_score, isc_score, stat_score')
      .limit(1)
      .single();
    
    if (error) throw error;
    
    const allScoresPresent = 
      data.cs_score !== undefined &&
      data.swe_score !== undefined &&
      data.it_score !== undefined &&
      data.is_score !== undefined &&
      data.isc_score !== undefined &&
      data.stat_score !== undefined;
    
    if (!allScoresPresent) throw new Error('Missing score columns');
    
    console.log('✅ PASSED - All score columns present\n');
    passed++;
  } catch (error) {
    console.log('❌ FAILED - Question options schema');
    console.log('   Error:', error.message, '\n');
    failed++;
  }
  
  // Summary
  console.log('═'.repeat(50));
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed\n`);
  console.log('═'.repeat(50), '\n');
  
  if (failed > 0) {
    console.log('❌ Some tests failed. Check errors above.\n');
    process.exit(1);
  } else {
    console.log('✅ All tests passed! Database is ready.\n');
    process.exit(0);
  }
}

// Run tests
runQuickTests().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});

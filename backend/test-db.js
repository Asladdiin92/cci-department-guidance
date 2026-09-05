/**
 * Database Connection Test Script
 * Tests Supabase connection and fetches all tables data
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function testDatabase() {
  console.log('\n🔍 Testing Supabase Database Connection...\n');
  console.log('URL:', process.env.SUPABASE_URL);
  console.log('Key:', process.env.SUPABASE_ANON_KEY ? '✅ Present' : '❌ Missing');
  console.log('\n' + '='.repeat(70) + '\n');

  // Test 1: Fetch Departments
  console.log('📊 Fetching Departments...');
  const { data: departments, error: deptError } = await supabase
    .from('departments')
    .select('*')
    .order('name', { ascending: true });

  if (deptError) {
    console.log('❌ Error:', deptError.message);
  } else {
    console.log(`✅ Found ${departments.length} departments:`);
    departments.forEach(dept => {
      console.log(`   - ${dept.code}: ${dept.name}`);
    });
  }

  console.log('\n' + '-'.repeat(70) + '\n');

  // Test 2: Fetch Questions
  console.log('📊 Fetching Questions...');
  const { data: questions, error: qError } = await supabase
    .from('questions')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (qError) {
    console.log('❌ Error:', qError.message);
  } else {
    console.log(`✅ Found ${questions.length} active questions`);
    questions.slice(0, 3).forEach(q => {
      console.log(`   ${q.order_index}. ${q.text.substring(0, 60)}...`);
    });
  }

  console.log('\n' + '-'.repeat(70) + '\n');

  // Test 3: Fetch Question Options (first question)
  if (questions && questions.length > 0) {
    console.log('📊 Fetching Options for First Question...');
    const { data: options, error: optError } = await supabase
      .from('question_options')
      .select('*')
      .eq('question_id', questions[0].id);

    if (optError) {
      console.log('❌ Error:', optError.message);
    } else {
      console.log(`✅ Found ${options.length} options`);
      options.forEach(opt => {
        console.log(`   - ${opt.text}`);
      });
    }
  }

  console.log('\n' + '-'.repeat(70) + '\n');

  // Test 4: Count Assessments
  console.log('📊 Counting Assessments...');
  const { count: assessmentCount, error: assessError } = await supabase
    .from('assessments')
    .select('*', { count: 'exact', head: true });

  if (assessError) {
    console.log('❌ Error:', assessError.message);
  } else {
    console.log(`✅ Total assessments: ${assessmentCount}`);
  }

  console.log('\n' + '-'.repeat(70) + '\n');

  // Test 5: Count Feedback
  console.log('📊 Counting Feedback...');
  const { count: feedbackCount, error: fbError } = await supabase
    .from('feedback')
    .select('*', { count: 'exact', head: true });

  if (fbError) {
    console.log('❌ Error:', fbError.message);
  } else {
    console.log(`✅ Total feedback: ${feedbackCount}`);
  }

  console.log('\n' + '='.repeat(70) + '\n');
  console.log('✅ Database connection test completed!\n');
}

testDatabase().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});

// Quick Supabase Connection Test
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function test() {
  console.log('\n🔍 Testing Supabase Connection...\n');
  
  // Test 1: Departments
  const { data: depts, error: e1 } = await supabase
    .from('departments')
    .select('code, name')
    .limit(3);
  
  console.log(e1 ? `❌ Departments: ${e1.message}` : `✅ Departments: ${depts.length} found`);
  if (depts) depts.forEach(d => console.log(`   - ${d.code}: ${d.name}`));
  
  // Test 2: Questions
  const { data: qs, error: e2 } = await supabase
    .from('questions')
    .select('id')
    .eq('is_active', true);
  
  console.log(e2 ? `❌ Questions: ${e2.message}` : `✅ Questions: ${qs.length} active`);
  
  // Test 3: Schema check
  const { data: test, error: e3 } = await supabase
    .from('assessments')
    .select('status, student_id, top_match_department')
    .limit(1);
  
  console.log(e3 ? `❌ Schema: Missing columns - ${e3.message}` : `✅ Schema: All columns present`);
  
  console.log('\n✅ Connection test complete!\n');
  process.exit(0);
}

test().catch(err => {
  console.error('\n❌ Test failed:', err.message);
  process.exit(1);
});

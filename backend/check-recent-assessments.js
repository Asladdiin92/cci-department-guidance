const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

(async () => {
  const { data, error } = await supabase
    .from('assessments')
    .select('id, student_id, student_name, student_email, started_at')
    .order('started_at', { ascending: false })
    .limit(5);
    
  if (error) {
    console.log('❌ Error:', error.message);
  } else {
    console.log('\n✅ 5 Most recent assessments:\n');
    data.forEach((a, i) => {
      console.log(`${i + 1}. ${a.student_id || 'NO_ID'.padEnd(20)} | ${(a.student_name || 'NO_NAME').padEnd(25)} | ${new Date(a.started_at).toLocaleString()}`);
    });
  }
})();

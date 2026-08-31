# Migration Execution Checklist ✓

Follow these steps to successfully set up your database.

---

## Prerequisites

- [ ] Supabase project created
- [ ] `.env` file configured with Supabase credentials
- [ ] Access to Supabase SQL Editor

---

## Step-by-Step Execution

### Step 1: Execute Schema Migration

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project
   - Navigate to **SQL Editor**

2. **Run Migration File**
   - Click **"New query"**
   - Copy entire contents of `001_initial_schema.sql`
   - Paste into SQL Editor
   - Click **"Run"** or press `Ctrl+Enter`

3. **Verify Success**
   ```sql
   -- Check tables created
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   
   -- Expected 8 tables:
   -- admin_users, assessment_responses, assessments,
   -- departments, feedback, question_options, questions, recommendations
   ```

**Expected Output:** ✅ Success. No errors.

---

### Step 2: Seed Departments Data

1. **Open New Query**
   - Click **"New query"** in SQL Editor

2. **Run Departments Seed**
   - Copy entire contents of `002_seed_departments.sql`
   - Paste and click **"Run"**

3. **Verify Success**
   ```sql
   SELECT code, name FROM departments ORDER BY code;
   
   -- Expected 6 rows:
   -- CS   | Computer Science
   -- IS   | Information System
   -- ISC  | Information Science
   -- IT   | Information Technology
   -- STAT | Statistics
   -- SWE  | Software Engineering
   ```

**Expected Output:** ✅ 6 departments inserted.

---

### Step 3: Seed Questions Data

1. **Open New Query**

2. **Run Questions Seed**
   - Copy entire contents of `003_seed_questions.sql`
   - Paste and click **"Run"**
   - ⚠️ This takes ~5-10 seconds due to many inserts

3. **Verify Success**
   ```sql
   -- Check questions count
   SELECT COUNT(*) as question_count FROM questions;
   -- Expected: 20
   
   -- Check options count
   SELECT COUNT(*) as option_count FROM question_options;
   -- Expected: 120 (6 options × 20 questions)
   
   -- Verify scoring structure
   SELECT 
       q.text as question,
       qo.text as option,
       qo.scores
   FROM questions q
   JOIN question_options qo ON qo.question_id = q.id
   WHERE q.order_index = 1
   LIMIT 1;
   -- Should show JSONB scores for all 6 departments
   ```

**Expected Output:** ✅ 20 questions and 120 options inserted.

---

## Verification Queries

Run these to confirm everything is set up correctly:

```sql
-- 1. Count all tables
SELECT 
    'departments' as table_name, COUNT(*) as records FROM departments
UNION ALL SELECT 'questions', COUNT(*) FROM questions
UNION ALL SELECT 'question_options', COUNT(*) FROM question_options
UNION ALL SELECT 'assessments', COUNT(*) FROM assessments
UNION ALL SELECT 'assessment_responses', COUNT(*) FROM assessment_responses
UNION ALL SELECT 'recommendations', COUNT(*) FROM recommendations
UNION ALL SELECT 'feedback', COUNT(*) FROM feedback
UNION ALL SELECT 'admin_users', COUNT(*) FROM admin_users;

-- Expected:
-- departments         | 6
-- questions           | 20
-- question_options    | 120
-- assessments         | 0
-- assessment_responses| 0
-- recommendations     | 0
-- feedback            | 0
-- admin_users         | 0

-- 2. Verify indexes
SELECT schemaname, tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename, indexname;
-- Should see 20+ indexes

-- 3. Check views
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public';
-- Expected: view_assessment_statistics, view_department_popularity, view_feedback_summary

-- 4. Test a sample question
SELECT 
    q.text as question,
    q.category,
    q.difficulty,
    jsonb_array_length(jsonb_agg(qo.id)) as option_count
FROM questions q
LEFT JOIN question_options qo ON qo.question_id = q.id
WHERE q.order_index = 1
GROUP BY q.id, q.text, q.category, q.difficulty;
-- Should show 6 options
```

---

## Common Issues & Solutions

### Issue: "relation already exists"
**Solution:** Tables already created. Either:
- Skip to next step, OR
- Drop all tables and start fresh:
  ```sql
  DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;
  GRANT ALL ON SCHEMA public TO postgres;
  GRANT ALL ON SCHEMA public TO public;
  ```

### Issue: "ERROR: 42P17: functions in index expression must be marked IMMUTABLE"
**Solution:** You're using the old migration file. Download the updated `001_initial_schema.sql` from the repository.

### Issue: "FOREIGN KEY constraint violation"
**Solution:** Run migrations in order:
1. First: `001_initial_schema.sql`
2. Second: `002_seed_departments.sql`  
3. Third: `003_seed_questions.sql`

### Issue: Seed file fails partway through
**Solution:** Supabase SQL Editor has transaction support. If it fails:
1. Check the error message
2. Fix the issue
3. Delete any partially inserted data:
   ```sql
   DELETE FROM question_options;
   DELETE FROM questions;
   -- or
   DELETE FROM departments;
   ```
4. Re-run the seed file

---

## Final Checklist

- [ ] ✅ All 8 tables created
- [ ] ✅ 20+ indexes created
- [ ] ✅ 3 views created
- [ ] ✅ 6 departments seeded
- [ ] ✅ 20 questions seeded
- [ ] ✅ 120 options seeded
- [ ] ✅ All verification queries pass
- [ ] ✅ No errors in Supabase logs

---

## Next Steps

Once migration is complete:

1. **Test Backend Connection**
   ```bash
   cd backend
   npm run dev
   ```
   - Server should start without database errors
   - Health check should show "Database: Connected"

2. **Run API Tests**
   ```bash
   .\test-all-endpoints.ps1
   ```
   - All 13 tests should pass

3. **Proceed to Day 2**
   - Frontend-backend integration
   - Live API calls
   - State management

---

**Migration Complete!** 🎉  
Your database is now fully set up and ready for the application.

---

*Last Updated: August 31, 2026*  
*Issues Fixed: IMMUTABLE function error, department_id foreign key*

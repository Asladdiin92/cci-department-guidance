# Database Migrations

## ⚠️ IMPORTANT UPDATE (August 31, 2026)

**Migration file has been FIXED!** Two issues resolved:
1. ✅ Removed problematic `DATE(started_at)` index (IMMUTABLE error)
2. ✅ Fixed `recommendations.department_id` to use VARCHAR codes instead of UUID

**Action Required:** Use the updated `001_initial_schema.sql` file.  
**Details:** See [FIX-NOTES.md](./FIX-NOTES.md) and [MIGRATION-CHECKLIST.md](./MIGRATION-CHECKLIST.md)

---

## Overview

This directory contains SQL migration scripts for the CCI Department Guidance System database.

---

## Migration Files

| File | Version | Description | Status |
|------|---------|-------------|--------|
| `001_initial_schema.sql` | 1.0 | Initial database schema with all tables | ✅ Ready |

---

## How to Execute Migrations on Supabase

### Method 1: Supabase Dashboard (Recommended)

1. **Login to Supabase:**
   - Go to https://app.supabase.com
   - Sign in with your account

2. **Select Your Project:**
   - Click on your CCI Guidance project
   - Or create a new project if you haven't

3. **Open SQL Editor:**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

4. **Copy Migration SQL:**
   - Open `001_initial_schema.sql`
   - Copy the entire contents

5. **Execute:**
   - Paste the SQL into the editor
   - Click "Run" (or press Ctrl+Enter)
   - Wait for completion message

6. **Verify:**
   - Click on "Table Editor" in sidebar
   - You should see all 8 tables

### Method 2: Supabase CLI

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Initialize project (if not already done)
supabase init

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migration
supabase db push

# Or execute directly
supabase db execute -f backend/database/migrations/001_initial_schema.sql
```

### Method 3: psql Command Line

```bash
# Connect to Supabase database
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Execute migration
\i backend/database/migrations/001_initial_schema.sql

# Or in one command
psql "postgresql://..." -f backend/database/migrations/001_initial_schema.sql
```

---

## Migration Checklist

After running the migration:

- [ ] All 8 tables created successfully
- [ ] All indexes created
- [ ] All foreign key constraints working
- [ ] All views created (3 views)
- [ ] RLS policies enabled
- [ ] Triggers working (updated_at)
- [ ] Functions created (2 functions)
- [ ] No errors in Supabase logs

---

## What Gets Created

### Tables (8):
1. ✅ `departments` - Department information
2. ✅ `questions` - Assessment questions
3. ✅ `question_options` - Multiple choice options
4. ✅ `assessments` - Student sessions
5. ✅ `assessment_responses` - Individual answers
6. ✅ `recommendations` - Calculated matches
7. ✅ `feedback` - Student feedback
8. ✅ `admin_users` - Admin accounts

### Views (3):
1. ✅ `view_assessment_statistics` - Dashboard metrics
2. ✅ `view_department_popularity` - Department rankings
3. ✅ `view_feedback_summary` - Feedback aggregates

### Functions (2):
1. ✅ `update_updated_at_column()` - Auto-update timestamps
2. ✅ `calculate_match_percentage()` - Score to percentage

### Security:
- ✅ Row Level Security (RLS) enabled
- ✅ Public read for reference data
- ✅ Anonymous insert for assessments
- ✅ Admin-only access for management

---

## Verification Queries

After migration, test with these queries:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Expected result: 8 tables

-- Check views
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public';

-- Expected result: 3 views

-- Check functions
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_type = 'FUNCTION';

-- Expected result: 2+ functions

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- departments, questions, question_options should show FALSE
-- assessments, responses, recommendations, feedback, admin_users should show TRUE

-- Test empty tables (should return 0 for all)
SELECT 
  (SELECT COUNT(*) FROM departments) as departments,
  (SELECT COUNT(*) FROM questions) as questions,
  (SELECT COUNT(*) FROM question_options) as options,
  (SELECT COUNT(*) FROM assessments) as assessments,
  (SELECT COUNT(*) FROM admin_users) as admins;
```

---

## Rollback (If Needed)

If you need to undo this migration:

```sql
-- WARNING: This will delete ALL data!

-- Drop views first
DROP VIEW IF EXISTS view_assessment_statistics CASCADE;
DROP VIEW IF EXISTS view_department_popularity CASCADE;
DROP VIEW IF EXISTS view_feedback_summary CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS calculate_match_percentage(INTEGER, INTEGER) CASCADE;

-- Drop tables (cascades will handle foreign keys)
DROP TABLE IF EXISTS feedback CASCADE;
DROP TABLE IF EXISTS recommendations CASCADE;
DROP TABLE IF EXISTS assessment_responses CASCADE;
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS question_options CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Drop extension (optional)
DROP EXTENSION IF EXISTS "uuid-ossp";
```

---

## Troubleshooting

### Error: "uuid-ossp extension not found"
**Solution:** The extension should be available by default in Supabase. If not, contact Supabase support.

### Error: "permission denied"
**Solution:** Make sure you're using the service_role key, not anon key, for admin operations.

### Error: "table already exists"
**Solution:** Either drop the existing table or skip that part of the migration.

### Performance Issues
**Solution:** Make sure all indexes were created. Run `ANALYZE;` after migration.

---

## Next Steps

After successful migration:

1. ✅ Run `002_seed_departments.sql` - Add 6 departments
2. ✅ Run `003_seed_questions.sql` - Add 20 questions with options
3. ✅ Run `004_seed_admin.sql` - Create default admin user
4. ✅ Test with sample data
5. ✅ Configure backend Supabase client

---

## Migration History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-09-01 | Asladin | Initial schema with 8 tables |

---

## Notes

- Always backup your database before running migrations
- Test migrations on staging/development first
- RLS policies are strict - adjust as needed for your use case
- UUIDs are used for all primary keys for scalability
- JSONB fields (curriculum, scores) allow flexible data structures

---

**Status:** ✅ Migration file ready for execution  
**Estimated Execution Time:** ~5 seconds  
**Database Size After Migration:** ~5MB (empty tables)


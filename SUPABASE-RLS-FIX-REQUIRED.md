# 🚨 SUPABASE RLS FIX REQUIRED

## Current Issue

**Error:** `permission denied for table recommendations`

Even with the service role key, Supabase RLS (Row Level Security) is blocking inserts to the `recommendations` table.

---

## The Fix (2 Options)

### Option 1: Disable RLS (Recommended for System Tables) ✅

**Run this SQL in Supabase Dashboard:**

1. Go to: https://supabase.com/dashboard/project/dztzjfqipllddyrrfcze/sql
2. Click "New Query"
3. Paste and run:

```sql
-- Disable RLS on system-managed tables
ALTER TABLE recommendations DISABLE ROW LEVEL SECURITY;
ALTER TABLE assessments DISABLE ROW LEVEL SECURITY;
```

4. Click "Run"

**Why this is safe:**
- `recommendations` and `assessments` tables are system-managed
- Not directly exposed to users
- Protected by backend authorization
- Service role needs full access to write system data

---

### Option 2: Keep RLS, Add Service Role Policy

If you prefer to keep RLS enabled:

```sql
-- Allow service role full access
CREATE POLICY "service_role_all_recommendations"
ON recommendations
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "service_role_all_assessments"
ON assessments
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

---

## After Running the SQL

1. **Test immediately** - Go back to http://localhost:5174/assessment
2. **Start a new assessment**
3. **Answer all questions**
4. **Submit**
5. **Should succeed!** ✅

---

## Why This Happened

Supabase enables RLS by default on all tables for security. However, system tables like `recommendations` (which contain algorithm-generated data, not user input) don't need RLS because:

1. Users never directly write to them
2. Only the backend service writes to them
3. Backend has its own authorization checks

---

## Files Created

- `backend/database/migrations/002_fix_recommendations_rls.sql` - Full migration with both options

---

## Quick Command

```bash
# After fixing in Supabase, test locally:
cd frontend
npm run dev
# Navigate to http://localhost:5174/assessment and test submission
```

---

## Production Note

**Important:** After testing locally, the same SQL must be run on your production Supabase instance when you deploy!

---

**Run the SQL now and then test the assessment submission again!** 🚀

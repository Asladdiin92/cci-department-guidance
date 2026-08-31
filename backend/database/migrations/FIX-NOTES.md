# Migration Fix Notes

## Issues Fixed in 001_initial_schema.sql

### Issue 1: IMMUTABLE Function Error ✅ FIXED

**Error:** 
```
ERROR: 42P17: functions in index expression must be marked IMMUTABLE
```

**Cause:**  
Line 113 had: `CREATE INDEX idx_assessments_date ON assessments(DATE(started_at));`

The `DATE()` function is not marked as IMMUTABLE in PostgreSQL, so it cannot be used directly in index expressions.

**Fix:**  
Removed the problematic index. The existing `idx_assessments_started` index on `started_at` can be used for date-based queries with proper WHERE clauses like:
```sql
WHERE started_at::date = '2026-08-31'
-- or
WHERE started_at >= '2026-08-31' AND started_at < '2026-09-01'
```

### Issue 2: Department Foreign Key Reference ✅ FIXED

**Issue:**  
`recommendations.department_id` was defined as `UUID` referencing `departments(id)`, but our controllers and seed data use department codes ('CS', 'SWE', etc.) not UUIDs.

**Fix:**  
Changed `department_id` from `UUID` to `VARCHAR(10)` and updated the foreign key to reference `departments(code)` instead of `departments(id)`.

**Before:**
```sql
department_id UUID NOT NULL REFERENCES departments(id)
```

**After:**
```sql
department_id VARCHAR(10) NOT NULL REFERENCES departments(code)
```

This matches the implementation in our controllers where we use department codes throughout the application.

---

## How to Apply the Fix

1. **If you haven't run the migration yet:**
   - Just execute the updated `001_initial_schema.sql` file

2. **If you already ran the old migration:**
   - Drop the database and re-run, OR
   - Run this fix script:

```sql
-- Fix Script
-- Run this in Supabase SQL Editor if you already executed the old migration

-- 1. Drop the problematic index (if it exists)
DROP INDEX IF EXISTS idx_assessments_date;

-- 2. Fix recommendations table structure
-- First, drop the recommendations table (will cascade)
DROP TABLE IF EXISTS recommendations CASCADE;

-- 3. Recreate recommendations with correct structure
CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    department_id VARCHAR(10) NOT NULL REFERENCES departments(code) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 0),
    rank INTEGER NOT NULL CHECK (rank >= 1 AND rank <= 6),
    match_percentage DECIMAL(5,2) NOT NULL CHECK (match_percentage >= 0 AND match_percentage <= 100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT uq_assessment_department UNIQUE (assessment_id, department_id),
    CONSTRAINT uq_assessment_rank UNIQUE (assessment_id, rank)
);

-- 4. Recreate indexes
CREATE INDEX idx_recommendations_assessment ON recommendations(assessment_id);
CREATE INDEX idx_recommendations_department ON recommendations(department_id);
CREATE INDEX idx_recommendations_rank ON recommendations(assessment_id, rank);
CREATE INDEX idx_recommendations_score ON recommendations(score DESC);

-- 5. Add comments
COMMENT ON TABLE recommendations IS 'Department recommendations with scores and rankings';
COMMENT ON COLUMN recommendations.department_id IS 'Department code (CS, SWE, IT, IS, ISC, STAT)';
COMMENT ON COLUMN recommendations.rank IS '1 = best match, 6 = least match';
```

---

## Verification

After running the migration, verify with:

```sql
-- Check that problematic index doesn't exist
SELECT indexname 
FROM pg_indexes 
WHERE tablename = 'assessments' AND indexname = 'idx_assessments_date';
-- Should return 0 rows

-- Check recommendations table structure
\d recommendations;
-- department_id should be VARCHAR(10)

-- Verify foreign key references departments(code)
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'recommendations' 
    AND tc.constraint_type = 'FOREIGN KEY'
    AND kcu.column_name = 'department_id';
-- Should show: foreign_table_name = 'departments', foreign_column_name = 'code'
```

---

## Impact on Application Code

These fixes require **NO changes** to the application code because:

1. The removed date index doesn't affect functionality - queries still work using the `started_at` index
2. The department_id change actually **fixes** the code to match our controllers, which already use department codes

✅ Migration is now ready to execute successfully!

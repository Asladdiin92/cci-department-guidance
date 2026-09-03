-- ================================================================
-- FIX: Recommendations Table RLS Policies
-- ================================================================
-- Issue: Service role cannot insert into recommendations table
-- Solution: Create proper RLS policies or disable RLS for system tables
--
-- Run this migration in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/YOUR_PROJECT/sql
-- ================================================================

-- Option 1: Disable RLS on recommendations (recommended for system-managed tables)
ALTER TABLE recommendations DISABLE ROW LEVEL SECURITY;

-- Option 2: Or create a policy that allows service_role to insert
-- (uncomment if you prefer to keep RLS enabled)
/*
CREATE POLICY "Allow service role full access to recommendations"
ON recommendations
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
*/

-- Also disable RLS on assessments for service role updates
ALTER TABLE assessments DISABLE ROW LEVEL SECURITY;

-- ================================================================
-- NOTES:
-- ================================================================
-- 
-- Why disable RLS on these tables?
-- - recommendations: System-generated data, not user-managed
-- - assessments: Need to update completed_at field after submission
-- 
-- These tables are still protected by application-level authorization
-- in the backend controllers.
--
-- If you prefer to keep RLS enabled, use the policy approach above.
-- ================================================================

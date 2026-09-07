-- Fix RLS DELETE permissions
-- Run this if you still get "permission denied" errors

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Drop any existing delete policies
DROP POLICY IF EXISTS "Enable delete for all users" ON assessments;
DROP POLICY IF EXISTS "Enable delete for all users" ON assessment_responses;
DROP POLICY IF EXISTS "Enable delete for all users" ON feedback;
DROP POLICY IF EXISTS "Allow delete own assessments" ON assessments;
DROP POLICY IF EXISTS "Allow delete own responses" ON assessment_responses;
DROP POLICY IF EXISTS "Allow delete own feedback" ON feedback;

-- Create permissive DELETE policies
CREATE POLICY "Enable delete for all users" ON assessments
FOR DELETE TO public USING (true);

CREATE POLICY "Enable delete for all users" ON assessment_responses
FOR DELETE TO public USING (true);

CREATE POLICY "Enable delete for all users" ON feedback
FOR DELETE TO public USING (true);

-- Verify policies
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('assessments', 'assessment_responses', 'feedback')
ORDER BY tablename, policyname;

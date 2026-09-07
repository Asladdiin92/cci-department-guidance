-- ============================================================================
-- MINIMAL DATABASE FIX - Just add missing columns
-- Run this entire script at once in Supabase SQL Editor
-- ============================================================================

-- Add question_order to questions table
ALTER TABLE questions ADD COLUMN IF NOT EXISTS question_order INTEGER DEFAULT 1;

-- Add columns to question_options table
ALTER TABLE question_options ADD COLUMN IF NOT EXISTS option_order INTEGER DEFAULT 1;
ALTER TABLE question_options ADD COLUMN IF NOT EXISTS cs_score INTEGER DEFAULT 0;
ALTER TABLE question_options ADD COLUMN IF NOT EXISTS swe_score INTEGER DEFAULT 0;
ALTER TABLE question_options ADD COLUMN IF NOT EXISTS it_score INTEGER DEFAULT 0;
ALTER TABLE question_options ADD COLUMN IF NOT EXISTS is_score INTEGER DEFAULT 0;
ALTER TABLE question_options ADD COLUMN IF NOT EXISTS isc_score INTEGER DEFAULT 0;
ALTER TABLE question_options ADD COLUMN IF NOT EXISTS stat_score INTEGER DEFAULT 0;

-- Add core_courses to departments table
ALTER TABLE departments ADD COLUMN IF NOT EXISTS core_courses TEXT[];

-- Add columns to assessments table
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'in_progress';
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS student_id VARCHAR(50);
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS top_match_department VARCHAR(10);

-- Enable RLS and add delete policies
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow delete assessments" ON assessments;
DROP POLICY IF EXISTS "Allow delete responses" ON assessment_responses;
DROP POLICY IF EXISTS "Allow delete feedback" ON feedback;

CREATE POLICY "Allow delete assessments" ON assessments FOR DELETE TO public USING (true);
CREATE POLICY "Allow delete responses" ON assessment_responses FOR DELETE TO public USING (true);
CREATE POLICY "Allow delete feedback" ON feedback FOR DELETE TO public USING (true);

-- Quick verification
SELECT 'DONE! Check results below:' as status;

SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('questions', 'question_options', 'assessments', 'departments')
  AND column_name IN ('question_order', 'option_order', 'cs_score', 'swe_score', 'it_score', 
                      'is_score', 'isc_score', 'stat_score', 'status', 'student_id', 
                      'top_match_department', 'core_courses')
ORDER BY table_name, column_name;

-- ============================================================================
-- STEP-BY-STEP DATABASE FIX
-- Run each section separately if needed
-- ============================================================================

-- ============================================================================
-- STEP 1: Add columns to QUESTIONS table
-- ============================================================================

ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS question_order INTEGER;

-- Set default values for question_order
UPDATE questions SET question_order = 1 WHERE id IN (
  SELECT id FROM questions ORDER BY created_at LIMIT 1
);

UPDATE questions SET question_order = 2 WHERE id IN (
  SELECT id FROM questions ORDER BY created_at OFFSET 1 LIMIT 1
);

-- For all remaining, set a sequential number
DO $$
DECLARE
  rec RECORD;
  counter INTEGER := 1;
BEGIN
  FOR rec IN SELECT id FROM questions ORDER BY created_at
  LOOP
    UPDATE questions SET question_order = counter WHERE id = rec.id;
    counter := counter + 1;
  END LOOP;
END $$;

-- ============================================================================
-- STEP 2: Add columns to QUESTION_OPTIONS table
-- ============================================================================

ALTER TABLE question_options 
ADD COLUMN IF NOT EXISTS option_order INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS cs_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS swe_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS it_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS isc_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS stat_score INTEGER DEFAULT 0;

-- Set option_order for all rows
DO $$
DECLARE
  rec RECORD;
  counter INTEGER;
  current_q UUID;
BEGIN
  current_q := NULL;
  counter := 1;
  
  FOR rec IN SELECT id, question_id FROM question_options ORDER BY question_id, created_at
  LOOP
    IF current_q IS NULL OR current_q != rec.question_id THEN
      current_q := rec.question_id;
      counter := 1;
    END IF;
    
    UPDATE question_options SET option_order = counter WHERE id = rec.id;
    counter := counter + 1;
  END LOOP;
END $$;

-- ============================================================================
-- STEP 3: Add columns to DEPARTMENTS table
-- ============================================================================

ALTER TABLE departments 
ADD COLUMN IF NOT EXISTS core_courses TEXT[] DEFAULT '{}';

-- ============================================================================
-- STEP 4: Add columns to ASSESSMENTS table
-- ============================================================================

ALTER TABLE assessments 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'in_progress',
ADD COLUMN IF NOT EXISTS student_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS top_match_department VARCHAR(10);

-- ============================================================================
-- STEP 5: Add RLS policies for DELETE operations
-- ============================================================================

-- Enable RLS if not already enabled
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Drop existing delete policies
DROP POLICY IF EXISTS "Allow delete own assessments" ON assessments;
DROP POLICY IF EXISTS "Allow delete own responses" ON assessment_responses;
DROP POLICY IF EXISTS "Allow delete own feedback" ON feedback;

-- Create permissive delete policies (allows anyone to delete - adjust for production)
CREATE POLICY "Allow delete own assessments" ON assessments
FOR DELETE
TO public
USING (true);

CREATE POLICY "Allow delete own responses" ON assessment_responses
FOR DELETE
TO public
USING (true);

CREATE POLICY "Allow delete own feedback" ON feedback
FOR DELETE
TO public
USING (true);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check questions columns
SELECT 'questions' as table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'questions' 
  AND column_name IN ('question_order', 'question_text');

-- Check question_options columns
SELECT 'question_options' as table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'question_options' 
  AND column_name IN ('option_order', 'cs_score', 'swe_score');

-- Check assessments columns
SELECT 'assessments' as table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'assessments' 
  AND column_name IN ('status', 'student_id', 'top_match_department');

-- Check departments columns
SELECT 'departments' as table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'departments' 
  AND column_name IN ('core_courses', 'name');

-- Sample data check
SELECT COUNT(*) as total_questions, 
       COUNT(CASE WHEN question_order IS NOT NULL THEN 1 END) as with_order
FROM questions;

SELECT COUNT(*) as total_options,
       COUNT(CASE WHEN option_order IS NOT NULL THEN 1 END) as with_order,
       COUNT(CASE WHEN cs_score IS NOT NULL THEN 1 END) as with_scores
FROM question_options;

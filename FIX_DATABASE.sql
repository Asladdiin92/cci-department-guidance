-- ========================================
-- FIX DATABASE SCHEMA FOR DEPLOYED APP
-- Run this in Supabase SQL Editor
-- ========================================

-- 1. Fix assessments table - add missing columns
ALTER TABLE assessments 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'in_progress',
ADD COLUMN IF NOT EXISTS student_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS top_match_department VARCHAR(10);

-- 2. Create indexes
CREATE INDEX IF NOT EXISTS idx_assessments_status ON assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessments_student_id ON assessments(student_id);

-- 3. Add check constraint for status
ALTER TABLE assessments 
DROP CONSTRAINT IF EXISTS chk_status;

ALTER TABLE assessments 
ADD CONSTRAINT chk_status CHECK (status IN ('in_progress', 'completed', 'abandoned'));

-- Done!
SELECT 'Database schema fixed successfully!' as message;

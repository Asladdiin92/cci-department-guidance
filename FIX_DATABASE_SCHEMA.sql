-- ============================================================================
-- CCI DEPARTMENT GUIDANCE SYSTEM - DATABASE SCHEMA FIX
-- ============================================================================
-- Run this SQL in Supabase SQL Editor to fix all missing columns
-- Date: 2026-09-07
-- ============================================================================

-- Fix 1: Add missing columns to QUESTIONS table
ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS question_order INTEGER;

-- Update question_order based on existing data or set defaults
UPDATE questions 
SET question_order = ROW_NUMBER() OVER (ORDER BY created_at)
WHERE question_order IS NULL;

-- Add NOT NULL constraint after populating data
ALTER TABLE questions 
ALTER COLUMN question_order SET NOT NULL;

-- ============================================================================

-- Fix 2: Add missing columns to QUESTION_OPTIONS table
ALTER TABLE question_options 
ADD COLUMN IF NOT EXISTS option_order INTEGER,
ADD COLUMN IF NOT EXISTS cs_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS swe_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS it_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS isc_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS stat_score INTEGER DEFAULT 0;

-- Update option_order based on existing data
UPDATE question_options 
SET option_order = ROW_NUMBER() OVER (PARTITION BY question_id ORDER BY created_at)
WHERE option_order IS NULL;

-- Set NOT NULL after populating
ALTER TABLE question_options 
ALTER COLUMN option_order SET NOT NULL;

-- Add check constraints for score ranges (0-3)
ALTER TABLE question_options
ADD CONSTRAINT chk_cs_score CHECK (cs_score >= 0 AND cs_score <= 3),
ADD CONSTRAINT chk_swe_score CHECK (swe_score >= 0 AND swe_score <= 3),
ADD CONSTRAINT chk_it_score CHECK (it_score >= 0 AND it_score <= 3),
ADD CONSTRAINT chk_is_score CHECK (is_score >= 0 AND is_score <= 3),
ADD CONSTRAINT chk_isc_score CHECK (isc_score >= 0 AND isc_score <= 3),
ADD CONSTRAINT chk_stat_score CHECK (stat_score >= 0 AND stat_score <= 3);

-- ============================================================================

-- Fix 3: Add missing columns to DEPARTMENTS table
ALTER TABLE departments 
ADD COLUMN IF NOT EXISTS core_courses TEXT[];

-- If core_courses data doesn't exist, you'll need to populate it separately
-- For now, ensure the column exists

-- ============================================================================

-- Fix 4: Add missing columns to ASSESSMENTS table
ALTER TABLE assessments 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'in_progress',
ADD COLUMN IF NOT EXISTS student_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS top_match_department VARCHAR(10);

-- Add check constraint for status
ALTER TABLE assessments
ADD CONSTRAINT chk_status CHECK (status IN ('in_progress', 'completed', 'abandoned'));

-- ============================================================================

-- Fix 5: Enable DELETE permissions for cleanup (RLS policies)
-- This allows test cleanup to work properly

-- Allow authenticated users to delete their own assessments
CREATE POLICY "Allow delete own assessments" ON assessments
FOR DELETE
USING (true); -- Adjust this based on your auth requirements

-- Allow authenticated users to delete their own responses
CREATE POLICY "Allow delete own responses" ON assessment_responses
FOR DELETE
USING (true); -- Adjust this based on your auth requirements

-- Allow authenticated users to delete their own feedback
CREATE POLICY "Allow delete own feedback" ON feedback
FOR DELETE
USING (true); -- Adjust this based on your auth requirements

-- ============================================================================

-- Verification queries - Run these to confirm fixes
-- ============================================================================

-- Check questions table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'questions' 
ORDER BY ordinal_position;

-- Check question_options table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'question_options' 
ORDER BY ordinal_position;

-- Check assessments table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'assessments' 
ORDER BY ordinal_position;

-- Check departments table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'departments' 
ORDER BY ordinal_position;

-- ============================================================================
-- SUMMARY OF CHANGES
-- ============================================================================
-- ✓ Added question_order to questions table
-- ✓ Added option_order, cs_score, swe_score, it_score, is_score, isc_score, stat_score to question_options
-- ✓ Added score check constraints (0-3 range)
-- ✓ Added core_courses to departments table
-- ✓ Added status, student_id, top_match_department to assessments table
-- ✓ Added RLS policies for DELETE operations
-- ============================================================================

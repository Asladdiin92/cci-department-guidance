-- Migration: Add student_id column to assessments table
-- Description: Add student_id field to track university student IDs
-- Date: September 3, 2026
-- Author: Asladin Abdukedir

-- Add student_id column to assessments table
ALTER TABLE assessments 
ADD COLUMN IF NOT EXISTS student_id VARCHAR(50);

-- Create index on student_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_assessments_student_id ON assessments(student_id);

-- Add comment to column
COMMENT ON COLUMN assessments.student_id IS 'University student ID (e.g., HU/CS/2024/001)';

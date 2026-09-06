-- Migration: Add student_id and status columns to assessments table
-- Description: Add student_id field to track university student IDs and status to track assessment state
-- Date: September 3, 2026
-- Author: Asladin Abdukedir

-- Add student_id and status columns to assessments table
ALTER TABLE assessments 
ADD COLUMN IF NOT EXISTS student_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'in_progress',
ADD COLUMN IF NOT EXISTS top_match_department VARCHAR(10);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_assessments_student_id ON assessments(student_id);
CREATE INDEX IF NOT EXISTS idx_assessments_status ON assessments(status);

-- Add comments to columns
COMMENT ON COLUMN assessments.student_id IS 'University student ID (e.g., HU/CS/2024/001)';
COMMENT ON COLUMN assessments.status IS 'Assessment status: in_progress, completed, abandoned';
COMMENT ON COLUMN assessments.top_match_department IS 'Top matched department code after completion';

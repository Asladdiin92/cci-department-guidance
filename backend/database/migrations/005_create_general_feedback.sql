-- Migration: Create general_feedback table for non-assessment feedback
-- Description: Stores general user feedback, suggestions, and bug reports

CREATE TABLE IF NOT EXISTS general_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255),
    student_id VARCHAR(50),
    category VARCHAR(50) DEFAULT 'general',
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    subject VARCHAR(500),
    message TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add index on submitted_at for faster queries
CREATE INDEX IF NOT EXISTS idx_general_feedback_submitted_at ON general_feedback(submitted_at DESC);

-- Add index on category
CREATE INDEX IF NOT EXISTS idx_general_feedback_category ON general_feedback(category);

-- Add index on email for follow-up queries
CREATE INDEX IF NOT EXISTS idx_general_feedback_email ON general_feedback(email);

-- Enable Row Level Security
ALTER TABLE general_feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit feedback
CREATE POLICY "Anyone can submit feedback" ON general_feedback
    FOR INSERT
    WITH CHECK (true);

-- Policy: Admin can view all feedback
CREATE POLICY "Admin can view all feedback" ON general_feedback
    FOR SELECT
    USING (true);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_general_feedback_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_general_feedback_updated_at
    BEFORE UPDATE ON general_feedback
    FOR EACH ROW
    EXECUTE FUNCTION update_general_feedback_updated_at();

-- Add comments
COMMENT ON TABLE general_feedback IS 'Stores general user feedback not tied to specific assessments';
COMMENT ON COLUMN general_feedback.category IS 'Feedback category: general, assessment, results, technical, suggestion';
COMMENT ON COLUMN general_feedback.rating IS 'Overall experience rating from 1-5 stars';

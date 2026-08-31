-- ================================================================
-- CCI Department Guidance System - Initial Schema Migration
-- Version: 1.0
-- Date: September 1, 2026
-- Description: Creates all tables, indexes, and constraints
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================================
-- TABLE: departments
-- Description: Stores information about 6 CCI departments
-- ================================================================
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    strengths TEXT[] NOT NULL,
    curriculum JSONB NOT NULL,
    career_paths TEXT[],
    industry_demand VARCHAR(20),
    color VARCHAR(7),
    icon VARCHAR(10),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for departments
CREATE INDEX idx_departments_code ON departments(code);
CREATE INDEX idx_departments_name ON departments(name);
CREATE INDEX idx_departments_curriculum_gin ON departments USING GIN (curriculum);

-- Comments
COMMENT ON TABLE departments IS 'CCI department information and curriculum';
COMMENT ON COLUMN departments.code IS 'Department code: CS, SWE, IT, IS, ISC, STAT';
COMMENT ON COLUMN departments.curriculum IS 'JSONB structure of courses and requirements';

-- ================================================================
-- TABLE: questions
-- Description: Assessment questions (20 questions)
-- ================================================================
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    text TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20),
    order_index INTEGER UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT chk_category CHECK (category IN ('interests', 'skills', 'learning_style', 'career_goals', 'problem_solving')),
    CONSTRAINT chk_difficulty CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
    CONSTRAINT chk_order_index CHECK (order_index >= 1 AND order_index <= 100)
);

-- Indexes for questions
CREATE INDEX idx_questions_order ON questions(order_index);
CREATE INDEX idx_questions_active ON questions(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_questions_category ON questions(category);

-- Comments
COMMENT ON TABLE questions IS 'Assessment questions with categories';
COMMENT ON COLUMN questions.order_index IS 'Display order (1-20)';

-- ================================================================
-- TABLE: question_options
-- Description: Multiple choice options (4 per question)
-- ================================================================
CREATE TABLE question_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    scores JSONB NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT chk_option_order CHECK (order_index >= 1 AND order_index <= 10),
    CONSTRAINT uq_question_option_order UNIQUE (question_id, order_index)
);

-- Indexes for question_options
CREATE INDEX idx_options_question ON question_options(question_id);
CREATE INDEX idx_options_scores_gin ON question_options USING GIN (scores);

-- Comments
COMMENT ON TABLE question_options IS 'Multiple choice options with department scoring';
COMMENT ON COLUMN question_options.scores IS 'JSONB: {"CS": 3, "SWE": 2, "IT": 1, ...}';

-- ================================================================
-- TABLE: assessments
-- Description: Student assessment sessions
-- ================================================================
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name VARCHAR(100),
    student_email VARCHAR(255),
    started_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    completed_at TIMESTAMPTZ,
    ip_address VARCHAR(45),
    user_agent TEXT,
    session_token VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT chk_email_format CHECK (student_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$' OR student_email IS NULL)
);

-- Indexes for assessments
CREATE INDEX idx_assessments_completed ON assessments(completed_at) WHERE completed_at IS NOT NULL;
CREATE INDEX idx_assessments_started ON assessments(started_at);
-- Note: Removed DATE(started_at) index - use started_at index instead for date queries
CREATE INDEX idx_assessments_session ON assessments(session_token);

-- Comments
COMMENT ON TABLE assessments IS 'Student assessment sessions and metadata';
COMMENT ON COLUMN assessments.session_token IS 'Anonymous session identifier for resuming';

-- ================================================================
-- TABLE: assessment_responses
-- Description: Individual question responses
-- ================================================================
CREATE TABLE assessment_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_id UUID NOT NULL REFERENCES question_options(id) ON DELETE CASCADE,
    answered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    CONSTRAINT uq_assessment_question UNIQUE (assessment_id, question_id)
);

-- Indexes for assessment_responses
CREATE INDEX idx_responses_assessment ON assessment_responses(assessment_id);
CREATE INDEX idx_responses_question ON assessment_responses(question_id);
CREATE INDEX idx_responses_option ON assessment_responses(option_id);
CREATE INDEX idx_responses_answered ON assessment_responses(answered_at);

-- Comments
COMMENT ON TABLE assessment_responses IS 'Individual answers for each assessment';
COMMENT ON CONSTRAINT uq_assessment_question ON assessment_responses IS 'Prevents answering same question twice';

-- ================================================================
-- TABLE: recommendations
-- Description: Calculated department recommendations
-- ================================================================
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

-- Indexes for recommendations
CREATE INDEX idx_recommendations_assessment ON recommendations(assessment_id);
CREATE INDEX idx_recommendations_department ON recommendations(department_id);
CREATE INDEX idx_recommendations_rank ON recommendations(assessment_id, rank);
CREATE INDEX idx_recommendations_score ON recommendations(score DESC);

-- Comments
COMMENT ON TABLE recommendations IS 'Department recommendations with scores and rankings';
COMMENT ON COLUMN recommendations.rank IS '1 = best match, 6 = least match';

-- ================================================================
-- TABLE: feedback
-- Description: Student feedback after assessment
-- ================================================================
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    helpful BOOLEAN,
    would_recommend BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for feedback
CREATE INDEX idx_feedback_assessment ON feedback(assessment_id);
CREATE INDEX idx_feedback_rating ON feedback(rating);
CREATE INDEX idx_feedback_created ON feedback(created_at);

-- Comments
COMMENT ON TABLE feedback IS 'Student feedback and satisfaction ratings';
COMMENT ON COLUMN feedback.rating IS 'Star rating: 1 (poor) to 5 (excellent)';

-- ================================================================
-- TABLE: admin_users
-- Description: Admin accounts for dashboard access
-- ================================================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) NOT NULL DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT chk_role CHECK (role IN ('super_admin', 'admin', 'viewer')),
    CONSTRAINT chk_email_format_admin CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Indexes for admin_users
CREATE INDEX idx_admin_username ON admin_users(username);
CREATE INDEX idx_admin_email ON admin_users(email);
CREATE INDEX idx_admin_active ON admin_users(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_admin_role ON admin_users(role);

-- Comments
COMMENT ON TABLE admin_users IS 'Admin accounts with role-based access';
COMMENT ON COLUMN admin_users.role IS 'super_admin, admin, or viewer';

-- ================================================================
-- VIEWS: Analytics and Reporting
-- ================================================================

-- View: Assessment Statistics
CREATE OR REPLACE VIEW view_assessment_statistics AS
SELECT
    COUNT(DISTINCT id) as total_assessments,
    COUNT(DISTINCT CASE WHEN completed_at IS NOT NULL THEN id END) as completed_assessments,
    COUNT(DISTINCT CASE WHEN completed_at IS NULL THEN id END) as incomplete_assessments,
    ROUND(
        COUNT(DISTINCT CASE WHEN completed_at IS NOT NULL THEN id END)::NUMERIC / 
        NULLIF(COUNT(DISTINCT id), 0) * 100, 
        2
    ) as completion_rate_percentage,
    COUNT(DISTINCT DATE(started_at)) as unique_days,
    ROUND(
        AVG(EXTRACT(EPOCH FROM (completed_at - started_at))/60)::NUMERIC, 
        2
    ) as avg_completion_minutes,
    COUNT(DISTINCT CASE WHEN DATE(started_at) = CURRENT_DATE THEN id END) as today_count
FROM assessments;

COMMENT ON VIEW view_assessment_statistics IS 'Aggregated assessment metrics for dashboard';

-- View: Department Popularity
CREATE OR REPLACE VIEW view_department_popularity AS
SELECT
    d.id as department_id,
    d.code,
    d.name,
    d.color,
    COUNT(r.id) as total_recommendations,
    COUNT(CASE WHEN r.rank = 1 THEN 1 END) as first_rank_count,
    COUNT(CASE WHEN r.rank <= 3 THEN 1 END) as top_three_count,
    ROUND(AVG(r.match_percentage)::NUMERIC, 2) as avg_match_percentage,
    ROUND(AVG(r.score)::NUMERIC, 2) as avg_score
FROM departments d
LEFT JOIN recommendations r ON d.id = r.department_id
GROUP BY d.id, d.code, d.name, d.color
ORDER BY first_rank_count DESC, total_recommendations DESC;

COMMENT ON VIEW view_department_popularity IS 'Department recommendation distribution and rankings';

-- View: Recent Feedback Summary
CREATE OR REPLACE VIEW view_feedback_summary AS
SELECT
    COUNT(*) as total_feedback,
    ROUND(AVG(rating)::NUMERIC, 2) as avg_rating,
    COUNT(CASE WHEN rating >= 4 THEN 1 END) as positive_count,
    COUNT(CASE WHEN rating <= 2 THEN 1 END) as negative_count,
    COUNT(CASE WHEN helpful = TRUE THEN 1 END) as helpful_count,
    COUNT(CASE WHEN would_recommend = TRUE THEN 1 END) as would_recommend_count,
    ROUND(
        COUNT(CASE WHEN would_recommend = TRUE THEN 1 END)::NUMERIC / 
        NULLIF(COUNT(*), 0) * 100, 
        2
    ) as recommend_percentage
FROM feedback;

COMMENT ON VIEW view_feedback_summary IS 'Aggregated feedback metrics';

-- ================================================================
-- FUNCTIONS: Utility functions
-- ================================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers: Auto-update updated_at
CREATE TRIGGER update_departments_updated_at
    BEFORE UPDATE ON departments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at
    BEFORE UPDATE ON questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function: Calculate match percentage
CREATE OR REPLACE FUNCTION calculate_match_percentage(
    p_score INTEGER,
    p_max_possible_score INTEGER
)
RETURNS DECIMAL(5,2) AS $$
BEGIN
    IF p_max_possible_score = 0 THEN
        RETURN 0;
    END IF;
    RETURN ROUND((p_score::NUMERIC / p_max_possible_score::NUMERIC * 100)::NUMERIC, 2);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION calculate_match_percentage IS 'Calculate percentage match from score';

-- ================================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================================

-- Enable RLS on sensitive tables
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read policies for reference data
CREATE POLICY "Public read departments" ON departments
    FOR SELECT USING (true);

CREATE POLICY "Public read active questions" ON questions
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read question options" ON question_options
    FOR SELECT USING (true);

-- Assessment policies (students can insert their own)
CREATE POLICY "Students can create assessments" ON assessments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Students can read own assessments" ON assessments
    FOR SELECT USING (true);

CREATE POLICY "Students can update own assessments" ON assessments
    FOR UPDATE USING (true);

-- Response policies
CREATE POLICY "Students can create responses" ON assessment_responses
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Students can read responses" ON assessment_responses
    FOR SELECT USING (true);

-- Recommendation policies
CREATE POLICY "Students can read recommendations" ON recommendations
    FOR SELECT USING (true);

-- Feedback policies
CREATE POLICY "Students can create feedback" ON feedback
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Students can read feedback" ON feedback
    FOR SELECT USING (true);

-- Admin policies (authenticated users only)
CREATE POLICY "Admins full access departments" ON departments
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access questions" ON questions
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access options" ON question_options
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins read all assessments" ON assessments
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins read all responses" ON assessment_responses
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins read all recommendations" ON recommendations
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins read all feedback" ON feedback
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins manage admin_users" ON admin_users
    FOR ALL USING (auth.role() = 'authenticated');

-- ================================================================
-- GRANT PERMISSIONS
-- ================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant permissions for reference tables (public read)
GRANT SELECT ON departments TO anon, authenticated;
GRANT SELECT ON questions TO anon, authenticated;
GRANT SELECT ON question_options TO anon, authenticated;

-- Grant permissions for assessment tables
GRANT SELECT, INSERT, UPDATE ON assessments TO anon, authenticated;
GRANT SELECT, INSERT ON assessment_responses TO anon, authenticated;
GRANT SELECT ON recommendations TO anon, authenticated;
GRANT SELECT, INSERT ON feedback TO anon, authenticated;

-- Grant full access to authenticated (admin) users
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ================================================================
-- COMPLETION MESSAGE
-- ================================================================

DO $$
BEGIN
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'CCI Department Guidance Database Schema Created!';
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Tables Created: 8';
    RAISE NOTICE 'Views Created: 3';
    RAISE NOTICE 'Functions Created: 2';
    RAISE NOTICE 'RLS Policies: Enabled';
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Next Steps:';
    RAISE NOTICE '1. Run seed scripts for departments';
    RAISE NOTICE '2. Run seed scripts for questions';
    RAISE NOTICE '3. Create default admin user';
    RAISE NOTICE '4. Test with sample data';
    RAISE NOTICE '==================================================';
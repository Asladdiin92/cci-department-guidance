# CCI Department Guidance System - Database Schema

**Database:** PostgreSQL (Supabase)  
**Version:** 1.0  
**Date:** September 1, 2026  
**Author:** Asladin Abdukedir

---

## Overview

This schema supports the CCI Department Guidance System with tables for departments, assessment questions, student responses, recommendations, feedback, and admin users.

---

## Entity Relationship Diagram

```
┌─────────────────┐
│   departments   │
│─────────────────│
│ id (PK)         │
│ code (UNIQUE)   │──┐
│ name            │  │
│ description     │  │
│ strengths[]     │  │
│ curriculum      │  │
└─────────────────┘  │
                     │
┌─────────────────┐  │    ┌──────────────────────┐
│   questions     │  │    │   recommendations    │
│─────────────────│  │    │──────────────────────│
│ id (PK)         │  │    │ id (PK)              │
│ text            │  │    │ assessment_id (FK)   │
│ category        │  └────│ department_id (FK)   │
│ difficulty      │       │ score                │
│ order_index     │       │ rank                 │
└─────────────────┘       │ created_at           │
         │                └──────────────────────┘
         │                          │
         │                          │
┌─────────────────────┐             │
│  question_options   │             │
│─────────────────────│             │
│ id (PK)             │             │
│ question_id (FK)    │             │
│ text                │             │
│ scores (JSONB)      │             │
│ order_index         │             │
└─────────────────────┘             │
                                    │
┌─────────────────────┐             │
│   assessments       │─────────────┘
│─────────────────────│
│ id (PK)             │
│ student_name        │
│ student_email       │
│ started_at          │
│ completed_at        │
│ ip_address          │
│ user_agent          │
└─────────────────────┘
         │
         │
┌──────────────────────────┐
│  assessment_responses    │
│──────────────────────────│
│ id (PK)                  │
│ assessment_id (FK)       │
│ question_id (FK)         │
│ option_id (FK)           │
│ answered_at              │
└──────────────────────────┘

┌─────────────────┐
│    feedback     │
│─────────────────│
│ id (PK)         │
│ assessment_id   │
│ rating          │
│ comment         │
│ helpful         │
│ created_at      │
└─────────────────┘

┌─────────────────┐
│  admin_users    │
│─────────────────│
│ id (PK)         │
│ username        │
│ password_hash   │
│ email           │
│ role            │
│ created_at      │
│ last_login      │
└─────────────────┘
```

---

## Table Definitions

### 1. **departments**

Stores information about the 6 CCI departments.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `code` | VARCHAR(10) | UNIQUE, NOT NULL | Department code (CS, SWE, IT, IS, ISC, STAT) |
| `name` | VARCHAR(100) | NOT NULL | Full department name |
| `description` | TEXT | NOT NULL | Department description |
| `strengths` | TEXT[] | NOT NULL | Array of key strengths |
| `curriculum` | JSONB | NOT NULL | Complete curriculum structure |
| `career_paths` | TEXT[] | - | Potential career opportunities |
| `industry_demand` | VARCHAR(20) | - | HIGH, MEDIUM, LOW |
| `color` | VARCHAR(7) | - | Hex color code for UI |
| `icon` | VARCHAR(10) | - | Emoji or icon identifier |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `code`
- INDEX on `name` for search

---

### 2. **questions**

Assessment questions asked to students.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `text` | TEXT | NOT NULL | Question text |
| `category` | VARCHAR(50) | NOT NULL | Question category (interests, skills, goals, etc.) |
| `difficulty` | VARCHAR(20) | - | EASY, MEDIUM, HARD |
| `order_index` | INTEGER | NOT NULL, UNIQUE | Display order (1-20) |
| `is_active` | BOOLEAN | DEFAULT TRUE | Whether question is active |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `order_index`
- INDEX on `is_active` for filtering

**Categories:**
- `interests` - What students enjoy
- `skills` - Current abilities
- `learning_style` - How they prefer to learn
- `career_goals` - Future aspirations
- `problem_solving` - Approach to challenges

---

### 3. **question_options**

Multiple choice options for each question (4 options per question).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `question_id` | UUID | FOREIGN KEY REFERENCES questions(id) ON DELETE CASCADE, NOT NULL | Parent question |
| `text` | TEXT | NOT NULL | Option text |
| `scores` | JSONB | NOT NULL | Scores for each department {"CS": 3, "SWE": 2, ...} |
| `order_index` | INTEGER | NOT NULL | Display order (1-4) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `question_id` for joins
- INDEX on `(question_id, order_index)` for sorting

**Scores JSONB Format:**
```json
{
  "CS": 3,
  "SWE": 2,
  "IT": 1,
  "IS": 0,
  "ISC": 1,
  "STAT": 0
}
```

---

### 4. **assessments**

Records of student assessment sessions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `student_name` | VARCHAR(100) | - | Optional student name |
| `student_email` | VARCHAR(255) | - | Optional email for results |
| `started_at` | TIMESTAMPTZ | DEFAULT NOW(), NOT NULL | When assessment started |
| `completed_at` | TIMESTAMPTZ | - | When assessment was submitted |
| `ip_address` | VARCHAR(45) | - | Client IP address |
| `user_agent` | TEXT | - | Browser user agent |
| `session_token` | VARCHAR(255) | UNIQUE | Anonymous session identifier |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `completed_at` for analytics
- INDEX on `created_at` for sorting
- UNIQUE INDEX on `session_token`

---

### 5. **assessment_responses**

Individual question responses for each assessment.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `assessment_id` | UUID | FOREIGN KEY REFERENCES assessments(id) ON DELETE CASCADE, NOT NULL | Parent assessment |
| `question_id` | UUID | FOREIGN KEY REFERENCES questions(id) ON DELETE CASCADE, NOT NULL | Question answered |
| `option_id` | UUID | FOREIGN KEY REFERENCES question_options(id) ON DELETE CASCADE, NOT NULL | Selected option |
| `answered_at` | TIMESTAMPTZ | DEFAULT NOW(), NOT NULL | When question was answered |

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `assessment_id` for joins
- UNIQUE INDEX on `(assessment_id, question_id)` to prevent duplicates
- INDEX on `answered_at` for analytics

---

### 6. **recommendations**

Calculated department recommendations for each assessment.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `assessment_id` | UUID | FOREIGN KEY REFERENCES assessments(id) ON DELETE CASCADE, NOT NULL | Parent assessment |
| `department_id` | UUID | FOREIGN KEY REFERENCES departments(id) ON DELETE CASCADE, NOT NULL | Recommended department |
| `score` | INTEGER | NOT NULL, CHECK (score >= 0) | Calculated match score |
| `rank` | INTEGER | NOT NULL, CHECK (rank >= 1 AND rank <= 6) | Ranking (1=best match) |
| `match_percentage` | DECIMAL(5,2) | NOT NULL | Percentage match (0.00-100.00) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `assessment_id` for joins
- INDEX on `(assessment_id, rank)` for sorting
- UNIQUE INDEX on `(assessment_id, department_id)` to prevent duplicates

---

### 7. **feedback**

Student feedback after completing assessment.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `assessment_id` | UUID | FOREIGN KEY REFERENCES assessments(id) ON DELETE CASCADE | Related assessment |
| `rating` | INTEGER | NOT NULL, CHECK (rating >= 1 AND rating <= 5) | Star rating (1-5) |
| `comment` | TEXT | - | Optional feedback comment |
| `helpful` | BOOLEAN | - | Was the assessment helpful? |
| `would_recommend` | BOOLEAN | - | Would recommend to others? |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `assessment_id` for joins
- INDEX on `rating` for analytics
- INDEX on `created_at` for sorting

---

### 8. **admin_users**

Admin accounts for dashboard access.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `username` | VARCHAR(50) | UNIQUE, NOT NULL | Login username |
| `password_hash` | VARCHAR(255) | NOT NULL | Bcrypt password hash |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Admin email |
| `full_name` | VARCHAR(100) | - | Admin full name |
| `role` | VARCHAR(20) | NOT NULL, DEFAULT 'admin' | Role (admin, super_admin, viewer) |
| `is_active` | BOOLEAN | DEFAULT TRUE | Account status |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Account creation |
| `last_login` | TIMESTAMPTZ | - | Last login timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `username`
- UNIQUE INDEX on `email`
- INDEX on `is_active` for filtering

**Roles:**
- `super_admin` - Full access (manage users, questions, departments)
- `admin` - View analytics, manage questions
- `viewer` - Read-only access

---

## Views (Optional - For Analytics)

### **view_assessment_statistics**

Aggregated statistics for admin dashboard.

```sql
CREATE VIEW view_assessment_statistics AS
SELECT
  COUNT(DISTINCT id) as total_assessments,
  COUNT(DISTINCT CASE WHEN completed_at IS NOT NULL THEN id END) as completed_assessments,
  COUNT(DISTINCT CASE WHEN completed_at IS NULL THEN id END) as incomplete_assessments,
  COUNT(DISTINCT DATE(started_at)) as unique_days,
  AVG(EXTRACT(EPOCH FROM (completed_at - started_at))/60) as avg_completion_minutes
FROM assessments;
```

### **view_department_popularity**

Department recommendation distribution.

```sql
CREATE VIEW view_department_popularity AS
SELECT
  d.code,
  d.name,
  COUNT(r.id) as recommendation_count,
  COUNT(CASE WHEN r.rank = 1 THEN 1 END) as first_rank_count,
  AVG(r.match_percentage) as avg_match_percentage
FROM departments d
LEFT JOIN recommendations r ON d.id = r.department_id
GROUP BY d.id, d.code, d.name
ORDER BY recommendation_count DESC;
```

---

## Data Retention Policy

- **Assessments:** Keep for 90 days (auto-delete incomplete after 7 days)
- **Responses:** Keep with assessment
- **Recommendations:** Keep with assessment
- **Feedback:** Keep indefinitely (anonymized)
- **Admin Logs:** Keep for 1 year

---

## Security Considerations

### Row Level Security (RLS)

Enable RLS on sensitive tables:

```sql
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

### Policies

**Public Read (departments, questions):**
```sql
CREATE POLICY "Public read access" ON departments
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON questions
  FOR SELECT USING (is_active = true);
```

**Authenticated Admin Only:**
```sql
CREATE POLICY "Admin full access" ON admin_users
  FOR ALL USING (auth.role() = 'authenticated');
```

---

## Performance Optimization

### Recommended Indexes

```sql
-- Frequently queried foreign keys
CREATE INDEX idx_responses_assessment ON assessment_responses(assessment_id);
CREATE INDEX idx_responses_question ON assessment_responses(question_id);
CREATE INDEX idx_recommendations_assessment ON recommendations(assessment_id);

-- Analytics queries
CREATE INDEX idx_assessments_completed ON assessments(completed_at) WHERE completed_at IS NOT NULL;
CREATE INDEX idx_assessments_date ON assessments(DATE(started_at));

-- JSONB indexes for curriculum search
CREATE INDEX idx_departments_curriculum ON departments USING GIN (curriculum);
CREATE INDEX idx_options_scores ON question_options USING GIN (scores);
```

---

## Backup Strategy

- **Automatic:** Daily snapshots (Supabase feature)
- **Manual:** Weekly exports to CSV
- **Point-in-Time Recovery:** 7 days retention

---

## Migration Strategy

1. Create base schema (tables, indexes)
2. Seed reference data (departments, questions)
3. Enable RLS policies
4. Create views for analytics
5. Set up scheduled cleanup jobs

---

## Summary

**Total Tables:** 8  
**Total Indexes:** ~20  
**Total Views:** 2  
**Estimated Storage:** < 100MB for 10,000 assessments

This schema supports:
- ✅ Complete assessment workflow
- ✅ Multi-department scoring
- ✅ Analytics and reporting
- ✅ Feedback collection
- ✅ Admin management
- ✅ Data privacy (RLS)
- ✅ Performance (indexes)
- ✅ Scalability (UUIDs, JSONB)

---

**Next Steps:**
1. Create migration SQL file
2. Execute on Supabase
3. Seed initial data
4. Test with sample queries


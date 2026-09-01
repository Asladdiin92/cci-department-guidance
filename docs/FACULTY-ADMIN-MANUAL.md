# CCI Department Guidance System - Faculty Administration Manual

**Version 1.0 | Last Updated: August 31, 2026**

---

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Admin Dashboard Access](#admin-dashboard-access)
4. [Dashboard Features](#dashboard-features)
5. [Analytics & Reporting](#analytics--reporting)
6. [Data Management](#data-management)
7. [Export Functionality](#export-functionality)
8. [Question Management](#question-management)
9. [Security & Privacy](#security--privacy)
10. [Troubleshooting](#troubleshooting)
11. [API Documentation](#api-documentation)
12. [Maintenance & Updates](#maintenance--updates)

---

## Introduction

### Purpose

The CCI Department Guidance System Admin Dashboard provides faculty and departmental leadership with real-time insights into student department preferences, assessment trends, and system performance.

### Target Audience

- **Department Chairs** - Strategic planning and resource allocation
- **Faculty Advisors** - Student guidance and counseling
- **Admissions Office** - Recruitment insights
- **Academic Affairs** - Institutional research
- **IT Administrators** - System maintenance

### Key Capabilities

✅ **Real-time Analytics** - Live data on student preferences  
✅ **Comprehensive Reporting** - Department distribution and trends  
✅ **Data Export** - CSV and Excel export for further analysis  
✅ **Searchable Records** - Filter and search all student submissions  
✅ **Visual Dashboards** - Charts and graphs for quick insights  
✅ **Question Management** - Update and manage assessment questions  

---

## System Architecture

### Technology Stack

**Frontend:**
- React 18.3.1
- Material-UI v5 (Material Design components)
- Recharts (Data visualization)
- XLSX (Excel export)
- React Router (Navigation)

**Backend:**
- Node.js with Express.js
- PostgreSQL database (via Supabase)
- JWT authentication
- RESTful API architecture

**Deployment:**
- Frontend: Vercel (https://cci-department-guidance.vercel.app)
- Backend: Railway (https://cci-department-guidance-production.up.railway.app)
- Database: Supabase (managed PostgreSQL)

### Database Schema

**Core Tables:**
- `assessments` - Student assessment records
- `questions` - Assessment questions pool
- `question_options` - Multiple choice options
- `assessment_responses` - Student answers
- `recommendations` - Generated department matches
- `departments` - Department information
- `feedback` - Student feedback submissions
- `admin_users` - Administrator accounts

### Data Flow

```
Student → Assessment → Backend API → Database
                ↓
        Scoring Algorithm
                ↓
        Recommendations → Results Page
                ↓
        Admin Dashboard ← Analytics API
```

---

## Admin Dashboard Access

### Step 1: Navigate to Admin Login

**URL:** `https://cci-department-guidance.vercel.app/admin`

### Step 2: Authentication

**Demo Credentials (for testing):**
- Username: `admin`
- Password: `admin123`

**Production Credentials:**
- Contact IT department for your personalized credentials
- Credentials should be kept confidential
- Change default password on first login

### Step 3: Login Process

1. Enter your username and password
2. Click "Login"
3. You'll be redirected to the main dashboard
4. Session token is stored in browser (expires after 24 hours)

### Security Features

- ✅ Password-protected access
- ✅ JWT token-based authentication
- ✅ Automatic session expiration
- ✅ Secure HTTPS connection
- ✅ Input validation and sanitization
- ✅ XSS protection

---

## Dashboard Features

### Main Dashboard Overview

Upon login, you'll see:

#### 1. KPI Metrics Cards (Top Section)

**Four Real-Time Metrics:**

```
┌─────────────────────┐  ┌─────────────────────┐
│ Total Assessments   │  │ Completed          │
│      1,247         │  │      1,089         │
└─────────────────────┘  └─────────────────────┘

┌─────────────────────┐  ┌─────────────────────┐
│ Completion Rate     │  │ Avg. Rating        │
│      87.5%         │  │      4.6/5.0       │
└─────────────────────┘  └─────────────────────┘
```

**Metrics Explained:**

- **Total Assessments**: All assessment records (started and completed)
- **Completed**: Successfully submitted assessments with results
- **Completion Rate**: (Completed / Total) × 100%
- **Avg. Rating**: Average student satisfaction rating from feedback

#### 2. Action Buttons (Top Right)

- **Refresh** - Reload all dashboard data
- **Export Excel** - Download current view as Excel file
- **Export CSV** - Download current view as CSV file
- **Logout** - End admin session

### Navigation Tabs

The dashboard has 4 main tabs:

#### Tab 1: Department Distribution
- Visual donut/pie chart
- Student preference counts
- Department popularity ranking

#### Tab 2: Question Affinity
- Bar chart of question engagement
- Response counts per question
- Question category analysis

#### Tab 3: Completion Trends
- Line/bar chart of daily completions
- 30-day historical data
- Trend analysis

#### Tab 4: Student Submissions
- Searchable table of all submissions
- Pagination (10/25/50/100 per page)
- Sortable columns
- Filter by name or email

---

## Analytics & Reporting

### Department Distribution Analysis

**What It Shows:**
- How many students matched each department as their #1 choice
- Visual percentage breakdown
- Color-coded by department

**Use Cases:**
- **Capacity Planning**: Anticipate enrollment demands
- **Resource Allocation**: Budget and staffing decisions
- **Marketing Focus**: Which departments need promotion
- **Trend Monitoring**: Track shifts in student interests

**Example Insights:**

```
Software Engineering: 387 students (31.0%) - Highest demand
Computer Science: 342 students (27.4%) - Strong interest
Information Technology: 198 students (15.9%) - Moderate
Information Systems: 156 students (12.5%) - Growing
Statistics: 98 students (7.9%) - Emerging interest
Information Science: 66 students (5.3%) - Niche appeal
```

**Action Items:**
- If SWE is consistently high (>30%), consider expanding capacity
- If IS is low (<10%), review program marketing
- Monitor trends monthly for strategic planning

### Question Affinity Analysis

**What It Shows:**
- Which questions get the most responses
- Question categories with highest engagement
- Potential problem questions (low response)

**Use Cases:**
- **Assessment Quality**: Identify confusing questions
- **Content Optimization**: Improve question clarity
- **Response Patterns**: Understand student decision-making
- **Question Effectiveness**: Validate scoring algorithms

**Key Metrics:**
- Response Count: Total answers to each question
- Category Distribution: Questions per category
- Completion Rate: Questions answered vs. skipped

**Action Items:**
- Questions with <80% response rate may need rewording
- Balance questions across all 5 categories
- Update questions annually based on industry trends

### Completion Trends

**What It Shows:**
- Daily assessment completion counts
- 30-day rolling average
- Peak usage times
- Seasonal patterns

**Use Cases:**
- **Traffic Analysis**: Identify peak usage periods
- **System Performance**: Plan infrastructure scaling
- **Marketing ROI**: Measure campaign effectiveness
- **Academic Calendar**: Align with registration periods

**Trend Interpretation:**

```
High Activity Periods:
- First 2 weeks of semester (course selection)
- Mid-semester advising weeks
- Pre-registration periods

Low Activity Periods:
- Finals week
- Holiday breaks
- Summer months
```

**Action Items:**
- Scale server resources during peak periods
- Schedule maintenance during low-traffic times
- Time marketing campaigns to academic calendar

---

## Data Management

### Student Submissions Table

**Accessing the Table:**
1. Click the "Student Submissions" tab (4th tab)
2. Wait for data to load (typically 1-2 seconds)

**Table Columns:**

| Column | Description | Sortable | Searchable |
|--------|-------------|----------|------------|
| Assessment ID | Unique UUID | Yes | No |
| Student Name | Optional name provided | Yes | Yes |
| Email | Optional email provided | Yes | Yes |
| Completed | Timestamp of completion | Yes | No |
| Top Match | #1 recommended department | Yes | No |
| Match % | Match percentage (0-100) | Yes | No |

**Search Functionality:**

```
Search box: [🔍 Search by name or email...]
```

- **Real-time Search**: Results update as you type
- **Case Insensitive**: Searches regardless of capitalization
- **Partial Matches**: "john" finds "John Smith", "Johnathan Doe"
- **Email Search**: Search by full or partial email address

**Sorting:**

- Click any column header to sort
- First click: Ascending order (A→Z, 0→100, old→new)
- Second click: Descending order (Z→A, 100→0, new→old)
- Default: Sorted by "Completed" (newest first)

**Pagination:**

```
Rows per page: [10 ▼]  1-10 of 1,247  [< >]
Options: 5, 10, 25, 50, 100
```

- Select rows per page from dropdown
- Navigate with Previous (<) and Next (>) arrows
- Shows "X-Y of Z" (e.g., "1-10 of 1,247")
- Remembers your preference during session

### Filtering Strategies

**Find Recent Assessments:**
1. Sort by "Completed" (descending)
2. Set rows per page to 50
3. Review latest student data

**Find Specific Student:**
1. Use search box
2. Type student name or email
3. View their assessment results

**Analyze Top Performers:**
1. Sort by "Match %" (descending)
2. Identify students with 90%+ matches
3. Export for outreach campaigns

**Department-Specific Reports:**
1. Sort by "Top Match" (ascending)
2. Groups students by department
3. Export for departmental review

---

## Export Functionality

### Export to Excel (.xlsx)

**Steps:**
1. Navigate to the tab you want to export
2. Click "Export Excel" button (top right)
3. Browser downloads file automatically
4. Open in Microsoft Excel, Google Sheets, or LibreOffice

**File Naming Convention:**
- Department Distribution: `department-distribution.xlsx`
- Question Affinity: `question-affinity.xlsx`
- Student Submissions: `student-submissions.xlsx`

**Excel File Structure:**

**Sheet: "Department Distribution"**
```
| Department                    | Code | Count |
|-------------------------------|------|-------|
| Software Engineering          | SWE  | 387   |
| Computer Science              | CS   | 342   |
| Information Technology        | IT   | 198   |
```

**Sheet: "Question Affinity"**
```
| Question                      | Category      | Response Count |
|-------------------------------|---------------|----------------|
| Which activity interests...   | interests     | 1,203          |
| What is your learning style...| learning_style| 1,189          |
```

**Sheet: "Submissions"**
```
| Assessment ID | Student Name | Email | Started At | Completed At | Top Department | Match % |
```

**Use Cases for Excel Export:**
- Advanced data analysis with pivot tables
- Integration with university reporting systems
- Long-term archival storage
- Sharing with stakeholders who prefer spreadsheets
- Custom formatting and visualization

### Export to CSV (.csv)

**Steps:**
1. Navigate to the tab you want to export
2. Click "Export CSV" button
3. File downloads as `export-{timestamp}.csv`
4. Open in any spreadsheet software or text editor

**CSV Format:**
- UTF-8 encoding
- Comma-separated values
- Quoted text fields
- Compatible with all major data tools

**Use Cases for CSV Export:**
- Data import into statistical software (R, Python, SPSS)
- Database bulk import operations
- Integration with external systems via scripting
- Lightweight file size for email sharing
- Universal compatibility

### Export Best Practices

✅ **DO:**
- Export data regularly (weekly/monthly) for historical records
- Use consistent naming conventions for archived files
- Verify data integrity after export
- Store exports in secure, backed-up locations
- Document export dates and purposes

❌ **DON'T:**
- Share exports containing student data publicly
- Store exports on unsecured cloud services
- Export more frequently than needed (server load)
- Modify exported data without documenting changes
- Delete exports without proper archival procedures

### Compliance Considerations

⚠️ **FERPA Compliance** (U.S.)
- Student data is protected educational records
- Limit export access to authorized personnel only
- Maintain audit logs of who exports data
- Securely delete exports when no longer needed

⚠️ **GDPR Considerations** (if applicable)
- Students have right to data access and deletion
- Implement data retention policies
- Anonymize data when possible for research
- Obtain consent for secondary uses

---

## Question Management

### Accessing Question Manager

**API Endpoint:** `/api/admin/questions`

**Current Implementation:**
- View all questions and options
- Update question text and properties
- Toggle question active/inactive status
- Create new questions (super admin only)

### Question Structure

Each question contains:

```json
{
  "id": "uuid-v4",
  "text": "Which activity interests you most?",
  "category": "interests",
  "difficulty": "EASY",
  "order_index": 1,
  "is_active": true,
  "question_options": [
    {
      "id": "uuid-v4",
      "text": "Building web applications",
      "scores": {
        "SWE": 10,
        "CS": 5,
        "IT": 3,
        "IS": 2,
        "STAT": 0,
        "ISC": 1
      },
      "order_index": 1
    }
  ]
}
```

### Question Categories

1. **interests** - What excites students about computing
2. **skills** - Natural abilities and strengths
3. **learning_style** - Preferred learning methods
4. **career_goals** - Future job aspirations
5. **problem_solving** - Approach to challenges

**Best Practice:** Maintain 4 questions per category (20 total)

### Difficulty Levels

- **EASY**: Straightforward, obvious choices
- **MEDIUM**: Requires some thought
- **HARD**: Nuanced, requires deep reflection

**Recommendation:** Mix of 40% EASY, 40% MEDIUM, 20% HARD

### Updating Questions

**Via API (Requires Admin Authentication):**

```bash
PUT /api/admin/questions/{question-id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Updated question text",
  "category": "interests",
  "difficulty": "MEDIUM",
  "is_active": true
}
```

**Response:**
```json
{
  "success": true,
  "data": { ...updated question... },
  "message": "Question updated successfully"
}
```

### Creating New Questions

**Requirements:**
- Super admin role required
- Must specify: text, category, difficulty, order_index
- Options must be created separately
- Each option needs scores for all 6 departments

**Best Practices:**
- Test new questions with sample students first
- Ensure questions are unbiased and inclusive
- Review scoring logic with department faculty
- Maintain consistent difficulty across categories
- Update questions annually to reflect industry trends

### Deactivating Questions

**When to Deactivate:**
- Question is confusing or misinterpreted
- Technology/industry changes make question obsolete
- Low discrimination (doesn't differentiate students)
- Bias or fairness concerns

**How:**
- Set `is_active: false` via API
- Question won't appear in new assessments
- Existing responses remain in database
- Can reactivate later if issues resolved

---

## Security & Privacy

### Authentication & Authorization

**Admin Roles:**

1. **Admin** - View analytics, export data
2. **Super Admin** - Full access including question management

**Current Implementation:**
- Simple JWT token authentication
- Token stored in browser localStorage
- 24-hour session expiration
- Logout clears token immediately

**Production Recommendations:**
- Integrate with university SSO (Single Sign-On)
- Implement role-based access control (RBAC)
- Use refresh tokens for extended sessions
- Add multi-factor authentication (MFA)
- Maintain admin activity audit logs

### Data Privacy

**Student Data Protection:**

✅ **Implemented:**
- Optional student name/email (not required)
- No collection of SSN, DOB, or other PII
- HTTPS encryption for all data transmission
- Input sanitization to prevent XSS attacks
- SQL injection protection via parameterized queries

✅ **Recommended Additions:**
- Data retention policy (e.g., 7 years)
- Automated data anonymization for research
- Student consent management
- Right to deletion workflow
- Privacy impact assessment (PIA)

**Admin Data Security:**

- Admin credentials hashed with bcrypt
- Password complexity requirements
- Account lockout after failed attempts
- Session monitoring for suspicious activity
- Regular security audits

### Input Sanitization

**Validation on Student Fields:**

**Student Name:**
- Pattern: Letters, spaces, hyphens, apostrophes, periods only
- Length: 2-100 characters
- Trimmed and escaped
- Example: `John O'Brien-Smith` ✅ | `<script>alert()</script>` ❌

**Student Email:**
- RFC 5322 email validation
- Length: Max 255 characters
- Lowercase normalized
- Example: `student@university.edu` ✅ | `not-an-email` ❌

**Feedback Comments:**
- XSS protection via xss library
- HTML tags stripped
- Max 1000 characters
- Special characters escaped

### API Security

**Request Validation:**
- All inputs validated against Joi schemas
- UUID format validation for IDs
- Type checking (string, number, boolean)
- Range validation (e.g., rating 1-5)

**Response Security:**
- Error messages don't expose system internals
- Stack traces hidden in production
- Rate limiting (coming soon)
- CORS configured for specific origins only

---

## Troubleshooting

### Common Issues

#### 1. Dashboard Not Loading

**Symptoms:** Blank screen, loading spinner indefinitely

**Solutions:**
1. Check internet connection
2. Refresh browser (Ctrl+F5 / Cmd+Shift+R)
3. Clear browser cache and cookies
4. Try different browser
5. Verify admin token is valid (check console logs)

**Technical Check:**
```javascript
// Open browser console (F12)
localStorage.getItem('adminToken')
// Should return: "mock-token-..." or actual JWT
```

#### 2. Login Fails

**Symptoms:** "Invalid credentials" error

**Solutions:**
1. Verify username: `admin`
2. Verify password: `admin123`
3. Check for typos (case-sensitive)
4. Ensure Caps Lock is off
5. Try incognito/private browsing mode

**If problem persists:**
- Contact IT administrator
- Request password reset
- Check if account is locked

#### 3. Data Not Updating

**Symptoms:** Old data showing, metrics not current

**Solutions:**
1. Click "Refresh" button
2. Hard refresh browser (Ctrl+Shift+R)
3. Check server status at Railway dashboard
4. Verify API endpoint is reachable
5. Review browser console for API errors

**Test API Connectivity:**
```bash
curl https://cci-department-guidance-production.up.railway.app/api/health
# Should return: {"success":true,"message":"..."}
```

#### 4. Export Not Working

**Symptoms:** File doesn't download, error message

**Solutions:**
1. Check browser download permissions
2. Disable popup blockers
3. Ensure active tab (no view required)
4. Try different file format (CSV vs Excel)
5. Check available disk space

**Browser-Specific:**
- **Chrome**: Check chrome://settings/content/pdfDocuments
- **Firefox**: Preferences → Applications → CSV/XLSX
- **Safari**: Preferences → General → File download location

#### 5. Search Not Finding Results

**Symptoms:** Search returns no results despite known data

**Solutions:**
1. Check spelling and typos
2. Try partial name (e.g., "john" not "johnathan")
3. Search by email instead of name
4. Remove special characters
5. Clear search box and reload table

**Known Limitations:**
- Search is case-insensitive but exact word match
- Special characters may not search correctly
- Only searches name and email fields (not Assessment ID)

### Performance Issues

#### Slow Loading Times

**Causes:**
- Large dataset (>10,000 records)
- Slow internet connection
- Server under heavy load
- Browser memory constraints

**Solutions:**
1. Use pagination (smaller page sizes)
2. Apply filters to reduce dataset
3. Close unnecessary browser tabs
4. Clear browser cache
5. Upgrade server resources (contact IT)

#### Charts Not Rendering

**Causes:**
- Recharts library loading issues
- Browser compatibility problems
- Insufficient data to render

**Solutions:**
1. Ensure modern browser (Chrome/Firefox/Edge)
2. Enable JavaScript
3. Check for ad-blocker interference
4. Try a different browser
5. Check if at least 1 assessment is completed

### Error Messages

**"Assessment not found"**
- Assessment ID is invalid or deleted
- Student may have abandoned assessment
- Database record may be corrupted

**"Validation error"**
- Input data format is incorrect
- Check API request body format
- Review validation schema in validator.js

**"Unauthorized"**
- Admin token expired or invalid
- Re-login to get new token
- Check if admin account is active

**"Internal server error"**
- Backend API issue
- Check Railway logs for stack trace
- Contact IT support immediately
- May indicate database connectivity problem

---

## API Documentation

### Base URL

**Production:** `https://cci-department-guidance-production.up.railway.app/api`  
**Local Development:** `http://localhost:3000/api`

### Authentication

All admin endpoints require authentication:

```http
Authorization: Bearer {jwt-token}
```

Get token by logging in through admin dashboard.

### Admin Endpoints

#### 1. Get System Statistics

```http
GET /api/admin/stats
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_assessments": 1247,
    "completed_assessments": 1089,
    "total_feedback": 342,
    "active_questions": 20,
    "average_rating": 4.6,
    "completion_rate": 87
  }
}
```

#### 2. Get Student Submissions

```http
GET /api/admin/submissions?page=1&limit=10&search=john&sortBy=completed_at&sortOrder=desc
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page
- `search` (optional) - Search term
- `sortBy` (default: completed_at) - Column to sort
- `sortOrder` (default: desc) - asc or desc

**Response:**
```json
{
  "success": true,
  "data": {
    "submissions": [
      {
        "id": "uuid",
        "student_name": "John Doe",
        "student_email": "john@example.com",
        "started_at": "2026-08-31T10:00:00Z",
        "completed_at": "2026-08-31T10:08:00Z",
        "top_department": "Software Engineering",
        "top_department_code": "SWE",
        "match_percentage": 92,
        "total_recommendations": 6
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1089,
      "totalPages": 109
    }
  }
}
```

#### 3. Get Analytics Data

```http
GET /api/admin/analytics
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "department_distribution": [
      {
        "department": "Software Engineering",
        "code": "SWE",
        "count": 387,
        "color": "#ea580c"
      }
    ],
    "question_affinity": [
      {
        "question_id": "uuid",
        "question_text": "Which activity interests you most?",
        "category": "interests",
        "response_count": 1203
      }
    ],
    "completion_trend": [
      {
        "date": "2026-08-01",
        "count": 45
      }
    ]
  }
}
```

#### 4. Get All Questions

```http
GET /api/admin/questions
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "uuid",
        "text": "Question text",
        "category": "interests",
        "difficulty": "EASY",
        "order_index": 1,
        "is_active": true,
        "question_options": [...]
      }
    ],
    "total": 20
  }
}
```

#### 5. Update Question

```http
PUT /api/admin/questions/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Updated question text",
  "category": "skills",
  "difficulty": "MEDIUM",
  "is_active": true
}
```

**Response:**
```json
{
  "success": true,
  "data": { ...updated question... },
  "message": "Question updated successfully"
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Validation error",
  "details": {
    "fields": [
      {
        "field": "student_email",
        "message": "Please provide a valid email address"
      }
    ]
  }
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "error": "Unauthorized access"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

---

## Maintenance & Updates

### Routine Maintenance

**Daily:**
- ✅ Monitor dashboard for anomalies
- ✅ Review error logs
- ✅ Check server uptime

**Weekly:**
- ✅ Export data backups
- ✅ Review completion rates
- ✅ Analyze department trends
- ✅ Check system performance metrics

**Monthly:**
- ✅ Generate comprehensive reports
- ✅ Review and update questions
- ✅ Analyze seasonal trends
- ✅ Plan capacity scaling
- ✅ Review admin access logs

**Annually:**
- ✅ Update question pool with industry trends
- ✅ Refresh department information
- ✅ Review and update career path data
- ✅ Conduct user satisfaction survey
- ✅ Security audit and penetration testing

### System Updates

**Frontend Updates (Vercel):**

1. Code changes pushed to GitHub main branch
2. Vercel automatically detects and deploys
3. Build time: ~2-3 minutes
4. Zero-downtime deployment
5. Rollback available if issues occur

**Backend Updates (Railway):**

1. Code changes pushed to GitHub
2. Railway automatically rebuilds and deploys
3. Database migrations run automatically
4. Monitor logs during deployment
5. Health check endpoint validates success

**Database Updates:**

1. Always backup before schema changes
2. Use migrations for version control
3. Test on staging environment first
4. Schedule during low-traffic periods
5. Have rollback plan ready

### Monitoring & Alerts

**Key Metrics to Monitor:**

- **Uptime**: Target 99.9%
- **Response Time**: <500ms for API calls
- **Error Rate**: <1% of requests
- **Database Connections**: <80% of pool
- **Memory Usage**: <80% of available

**Set Up Alerts For:**
- Server downtime
- API response time >2 seconds
- Error rate >5%
- Database connection errors
- Disk space <10% remaining

**Monitoring Tools:**
- Railway dashboard (backend metrics)
- Vercel analytics (frontend performance)
- Supabase dashboard (database health)
- Browser console (client-side errors)

### Backup Strategy

**Database Backups:**
- Automated daily backups (Supabase)
- Retain for 30 days
- Point-in-time recovery available
- Test restore process quarterly

**Code Backups:**
- Git version control (GitHub)
- All commits tagged with versions
- Feature branches for major changes
- Protected main branch (requires PR approval)

**Data Export Backups:**
- Monthly export of all submissions
- Stored in university secure storage
- Encrypted archive files
- 7-year retention policy (FERPA compliance)

### Version History

**v1.0 (August 31, 2026) - Initial Release**
- Core assessment functionality
- 6 department recommendations
- Admin dashboard with analytics
- Export to Excel/CSV
- Input sanitization and XSS protection

**Planned Updates:**

**v1.1 (Q4 2026)**
- Enhanced persona profiles
- Multi-language support
- Mobile app (iOS/Android)
- Advanced filtering in admin dashboard

**v1.2 (Q1 2027)**
- Machine learning scoring improvements
- Predictive analytics
- Integration with student information system
- Automated email notifications

**v2.0 (Q2 2027)**
- Full SSO integration
- Role-based access control
- Advanced reporting suite
- API for third-party integrations

---

## Appendix

### A. Department Codes

| Code | Full Name | Color Code |
|------|-----------|------------|
| SWE | Software Engineering | #ea580c |
| CS | Computer Science | #4f46e5 |
| IT | Information Technology | #0d9488 |
| IS | Information Systems | #db2777 |
| STAT | Statistics | #eab308 |
| ISC | Information Science | #7c3aed |

### B. Question Categories

| Category | Description | Example Question |
|----------|-------------|------------------|
| interests | What excites students | "Which activity interests you most?" |
| skills | Natural abilities | "What are you naturally good at?" |
| learning_style | Preferred learning methods | "How do you learn best?" |
| career_goals | Future aspirations | "What type of work environment appeals to you?" |
| problem_solving | Approach to challenges | "How do you tackle complex problems?" |

### C. Scoring Algorithm

**Simplified Overview:**

1. Each option has scores for all 6 departments (0-10)
2. Student responses are summed per department
3. Scores normalized to 0-100 percentage
4. Departments ranked by final score
5. Top 3 recommendations shown prominently

**Example:**
```
Question 1: Student chooses Option B
  SWE: +10, CS: +5, IT: +3, IS: +2, STAT: +0, ISC: +1

Question 2: Student chooses Option A
  SWE: +8, CS: +7, IT: +2, IS: +3, STAT: +1, ISC: +0

... (continue for 20 questions)

Total Scores:
  SWE: 184/200 = 92%
  CS: 176/200 = 88%
  IT: 156/200 = 78%
```

### D. Support Contacts

**Technical Support:**
- Email: cci-support@university.edu
- Phone: +1 (555) 123-4567
- Hours: Mon-Fri, 8 AM - 6 PM

**Faculty Coordinator:**
- Dr. Jane Smith
- Email: jane.smith@university.edu
- Office: Computing Building, Room 305

**IT Administrator:**
- John Doe
- Email: john.doe@university.edu
- Emergency: +1 (555) 987-6543

**System Developers:**
- GitHub: github.com/university/cci-guidance
- Issues: github.com/university/cci-guidance/issues

### E. Glossary

**API** - Application Programming Interface  
**CRUD** - Create, Read, Update, Delete operations  
**CSV** - Comma-Separated Values file format  
**FERPA** - Family Educational Rights and Privacy Act  
**GDPR** - General Data Protection Regulation  
**JWT** - JSON Web Token (authentication method)  
**KPI** - Key Performance Indicator  
**MFA** - Multi-Factor Authentication  
**PII** - Personally Identifiable Information  
**RBAC** - Role-Based Access Control  
**REST** - Representational State Transfer (API architecture)  
**SSO** - Single Sign-On  
**UUID** - Universally Unique Identifier  
**XSS** - Cross-Site Scripting (security vulnerability)  

---

## Contact & Support

For questions about this manual or the admin dashboard:

**📧 Email:** faculty-support@university.edu  
**📱 Phone:** +1 (555) 123-4567  
**🌐 Web:** computing.university.edu/guidance/admin  
**💬 Slack:** #cci-guidance-support  

---

**Document Version:** 1.0  
**Last Updated:** August 31, 2026  
**Maintained By:** CCI Technical Committee  
**Review Cycle:** Quarterly  

---

*This manual is for internal use by authorized CCI faculty and administrators only. Do not distribute outside the university without permission.*

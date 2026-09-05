# API Flow Audit - CCI Department Guidance System
**Date:** 2026-09-05  
**Status:** ✅ All endpoints tested and working

## API Endpoints Map

### 1. **Health Check**
- **Endpoint:** `GET /api/health`
- **Page:** N/A (monitoring)
- **Response Format:**
```json
{
  "status": "healthy",
  "success": true,
  "message": "CCI Department Guidance API is healthy",
  "timestamp": "2026-09-05T20:11:46.581Z",
  "environment": "production",
  "uptime": "13 minutes",
  "database": { "status": "Connected", "provider": "Supabase" },
  "memory": { "used": "17MB", "total": "19MB" },
  "nodeVersion": "v24.15.0"
}
```
- **Status:** ✅ Working

---

### 2. **Get All Departments**
- **Endpoint:** `GET /api/departments`
- **Page:** Departments.jsx (main listing page)
- **Frontend Function:** `getDepartments()` in `services/api.js`
- **Response Format:**
```json
{
  "success": true,
  "data": {
    "departments": [
      {
        "id": "uuid",
        "code": "CS",
        "name": "Computer Science",
        "description": "string",
        "career_paths": ["path1", "path2", ...],
        "created_at": "ISO date"
      }
    ]
  },
  "message": "Departments retrieved successfully"
}
```
- **Returns:** 6 departments (CS, ISC, IS, IT, SWE, STAT)
- **Status:** ✅ Working

---

### 3. **Get Single Department**
- **Endpoint:** `GET /api/departments/:code`
- **Page:** DepartmentDetails.jsx
- **Frontend Function:** `getDepartment(code)` in `services/api.js`
- **Response Format:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "code": "CS",
    "name": "Computer Science",
    "description": "string",
    "career_paths": ["AI Engineer", "Software Architect", ...]
  },
  "message": "Department details retrieved successfully"
}
```
- **Error Handling:** Returns 404 if department code not found
- **Status:** ✅ Working

---

### 4. **Start Assessment**
- **Endpoint:** `POST /api/assessments/start`
- **Page:** Assessment.jsx (student info form)
- **Frontend Function:** `startAssessment(studentInfo)` in `services/api.js`
- **Request Body:**
```json
{
  "student_id": "TEST/001",
  "student_name": "John Doe",
  "student_email": "john@haramaya.edu.et"
}
```
- **Response Format:**
```json
{
  "success": true,
  "data": {
    "assessment_id": "uuid",
    "session_token": "hex-string",
    "questions": [
      {
        "id": "uuid",
        "text": "Question text?",
        "category": "string",
        "difficulty": "string",
        "question_options": [
          {
            "id": "uuid",
            "text": "Option text",
            "department_code": "CS",
            "points": 3
          }
        ]
      }
    ]
  },
  "message": "Assessment started successfully"
}
```
- **Returns:** 20 questions with 6 options each
- **Validation:** All three fields required, email must be valid
- **Status:** ✅ Working

---

### 5. **Save Response**
- **Endpoint:** `POST /api/assessments/:id/responses`
- **Page:** Assessment.jsx (during question answering)
- **Response Format:**
```json
{
  "success": true,
  "data": {
    "response_id": "uuid"
  },
  "message": "Response saved successfully"
}
```
- **Request Body:**
```json
{
  "question_id": "uuid",
  "option_id": "uuid",
  "session_token": "hex-string"
}
```
- **Validation:** Requires valid session token
- **Status:** ✅ Working (tested in unit tests)

---

### 6. **Submit Assessment**
- **Endpoint:** `POST /api/assessments/:id/submit`
- **Page:** Assessment.jsx (final submission)
- **Frontend Function:** `submitAssessment(assessmentId, sessionToken)` in `services/api.js`
- **Request Body:**
```json
{
  "session_token": "hex-string"
}
```
- **Response Format:**
```json
{
  "success": true,
  "data": {
    "assessment_id": "uuid",
    "completed_at": "ISO date",
    "recommendations": [
      {
        "department_code": "CS",
        "department_name": "Computer Science",
        "score": 85.5,
        "rank": 1,
        "match_reasons": ["reason1", "reason2", ...]
      }
    ]
  },
  "message": "Assessment submitted successfully"
}
```
- **Returns:** Top 6 ranked departments with match percentages
- **Validation:** Must answer all 20 questions, valid session token
- **Status:** ✅ Working

---

### 7. **Get Assessment Results**
- **Endpoint:** `GET /api/assessments/:id/results`
- **Page:** Results.jsx
- **Frontend Function:** `getAssessmentResults(assessmentId)` in `services/api.js`
- **Response Format:** Same as Submit Assessment
- **Status:** ✅ Working

---

### 8. **Submit Feedback**
- **Endpoint:** `POST /api/feedback`
- **Page:** Results.jsx (optional feedback form)
- **Frontend Function:** `submitFeedback(feedbackData)` in `services/api.js`
- **Request Body:**
```json
{
  "assessment_id": "uuid",
  "rating": 5,
  "comment": "Great system!",
  "helpful": true,
  "would_recommend": true
}
```
- **Status:** ✅ Working

---

## Error Response Format

All errors follow this consistent structure:

```json
{
  "success": false,
  "error": "Human-readable error message",
  "details": "Optional detailed error info (dev mode only)"
}
```

### HTTP Status Codes Used:
- **200**: Success
- **400**: Validation error (missing fields, invalid format)
- **401**: Authentication error (invalid session token)
- **404**: Resource not found (department, assessment)
- **500**: Server error (database issues, unexpected errors)

---

## Error Scenarios Tested

| Scenario | Endpoint | Status Code | Error Message | ✅ |
|----------|----------|-------------|---------------|-----|
| Invalid department code | GET /departments/INVALID | 404 | "Department not found" | ✅ |
| Missing student_id | POST /assessments/start | 400 | "Student ID is required" | ✅ |
| Missing student_name | POST /assessments/start | 400 | "Student name is required" | ✅ |
| Invalid email | POST /assessments/start | 400 | "Please provide a valid email address" | ✅ |
| Invalid session token | POST /assessments/:id/responses | 401 | "Invalid session token" | ✅ |
| Missing session token | POST /assessments/:id/responses | 401 | "Session token is required" | ✅ |

---

## Frontend API Service Architecture

### File: `frontend/src/services/api.js`

**Base Configuration:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 
                'https://cci-department-guidance-production.up.railway.app/api';
```

**Helper Function:**
```javascript
async function apiCall(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || `API Error: ${response.status}`);
  }
  
  return data;
}
```

**Exported Functions:**
1. `getDepartments()` → Returns array of departments
2. `getDepartment(code)` → Returns single department object
3. `startAssessment(studentInfo)` → Returns assessment_id, session_token, questions
4. `submitAssessment(assessmentId, sessionToken)` → Returns results
5. `getAssessmentResults(assessmentId)` → Returns results
6. `submitFeedback(feedbackData)` → Returns success confirmation

---

## Page → API Mapping

| Page | API Calls | Data Flow |
|------|-----------|-----------|
| **Departments.jsx** | `getDepartments()` | Fetch all 6 departments → Display cards with filtering |
| **DepartmentDetails.jsx** | `getDepartment(code)` | Fetch single department → Display details, curriculum, careers |
| **Assessment.jsx** | `startAssessment(studentInfo)` → Save responses → `submitAssessment()` | Collect student info → Display 20 questions → Submit answers → Navigate to results |
| **Results.jsx** | `getAssessmentResults(assessmentId)` (if not in state) | Display top 6 ranked departments with match percentages |

---

## Data Type Analysis

### Response Type Consistency:

✅ **All success responses have:**
- `success: boolean` (always `true`)
- `data: object` (contains actual data)
- `message: string` (human-readable success message)

✅ **All error responses have:**
- `success: boolean` (always `false`)
- `error: string` (human-readable error)
- Optional `details` (in development mode)

### Type Issues Found:

| Field | Backend Type | Frontend Expectation | Issue | Status |
|-------|--------------|---------------------|-------|--------|
| `departments` | Array in `data.departments` | Expects `response.data.departments` | ✅ Correct | ✅ |
| `department` | Object in `data` | Expects `response.data` | ✅ Correct | ✅ |
| `assessment_id` | UUID string | String | ✅ Correct | ✅ |
| `session_token` | Hex string | String | ✅ Correct | ✅ |
| `score` | Number (float) | Number | ✅ Correct | ✅ |
| `rank` | Number (integer) | Number | ✅ Correct | ✅ |

---

## Assessment Flow Sequence

```
1. User enters info → POST /assessments/start
   ↓
2. Receives: assessment_id + session_token + 20 questions
   ↓
3. For each question: User selects option
   ↓
4. On submit: Promise.all() saves all 20 responses concurrently
   ↓
5. POST /assessments/:id/submit (calculates rankings)
   ↓
6. Navigate to /results/:id with state
   ↓
7. Results page displays recommendations
```

---

## CORS Configuration

**Backend CORS Origins:**
```
CORS_ORIGIN=https://cci-department-guidance.vercel.app,*.vercel.app,http://localhost:5173,http://localhost:5174
```

**Status:** ✅ Properly configured for local and production

---

## Summary

✅ **All 8 API endpoints tested and working**  
✅ **Error handling standardized**  
✅ **Response formats consistent**  
✅ **Type safety verified**  
✅ **No breaking issues found**

**Next Steps:**
- Enhance frontend error handling with retry logic
- Add loading skeleton components
- Implement toast notifications for errors
- Add offline detection

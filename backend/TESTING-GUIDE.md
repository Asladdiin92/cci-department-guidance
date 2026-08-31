# API Testing Guide - CCI Department Guidance System

This guide provides step-by-step instructions for testing all API endpoints.

## Prerequisites

1. **Backend server running:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Database setup completed:**
   - Migrations executed
   - Seed data loaded

3. **Environment configured:**
   - `.env` file with valid Supabase credentials

---

## Testing Methods

### Option 1: Using PowerShell (Windows)

Copy and paste these commands in PowerShell.

### Option 2: Using Thunder Client / Postman

Import the test collection (see below for examples).

### Option 3: Using REST Client (VS Code Extension)

Use the `test-requests.http` file.

---

## Test Sequence

### 1. Health Check

**Test server status:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method Get
```

**Expected Response:**
```json
{
  "success": true,
  "message": "CCI Department Guidance API is running",
  "database": "Connected"
}
```

---

### 2. Departments Endpoints

#### 2.1 Get All Departments
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/departments" -Method Get
```

**Expected:** Array of 6 departments (CS, SWE, IT, IS, ISC, STAT)

#### 2.2 Get Single Department
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/departments/CS" -Method Get
```

**Expected:** Computer Science department details with curriculum

#### 2.3 Get Department Curriculum
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/departments/SWE/curriculum" -Method Get
```

**Expected:** Software Engineering curriculum (core courses, electives, projects)

#### 2.4 Search Departments
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/departments/search?q=software" -Method Get
```

**Expected:** Departments matching "software" (likely SWE, CS)

#### 2.5 Compare Departments
```powershell
$body = @{
    department_codes = @("CS", "SWE", "IT")
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/departments/compare" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

**Expected:** Comparison data for CS, SWE, and IT

---

### 3. Assessment Flow (Complete Journey)

#### 3.1 Start Assessment
```powershell
$startBody = @{
    student_name = "Asladin Abdukedir"
    student_email = "asladin@example.com"
} | ConvertTo-Json

$assessment = Invoke-RestMethod -Uri "http://localhost:3000/api/assessments/start" `
    -Method Post `
    -ContentType "application/json" `
    -Body $startBody

# Save assessment ID for next steps
$assessmentId = $assessment.data.assessment_id
Write-Host "Assessment ID: $assessmentId"

# Save first question and option IDs
$firstQuestion = $assessment.data.questions[0]
$questionId = $firstQuestion.id
$optionId = $firstQuestion.question_options[0].id
```

**Expected:** 
- Assessment ID (UUID)
- Session token
- 20 questions with 6 options each

#### 3.2 Save Response (Repeat for each question)
```powershell
$responseBody = @{
    question_id = $questionId
    option_id = $optionId
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/assessments/$assessmentId/responses" `
    -Method Post `
    -ContentType "application/json" `
    -Body $responseBody
```

**Expected:** 
```json
{
  "success": true,
  "data": {
    "response_id": "uuid",
    "responses_completed": 1
  }
}
```

#### 3.3 Check Progress
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/assessments/$assessmentId/progress" -Method Get
```

**Expected:**
```json
{
  "success": true,
  "data": {
    "responses_completed": 1,
    "total_questions": 20,
    "progress_percentage": 5,
    "is_completed": false
  }
}
```

#### 3.4 Submit Assessment (after answering all 20 questions)
```powershell
$results = Invoke-RestMethod -Uri "http://localhost:3000/api/assessments/$assessmentId/submit" `
    -Method Post `
    -ContentType "application/json"

Write-Host "Top Recommendation: $($results.data.recommendations[0].department_name)"
Write-Host "Match Percentage: $($results.data.recommendations[0].match_percentage)%"
```

**Expected:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "rank": 1,
        "department_code": "SWE",
        "department_name": "Software Engineering",
        "match_percentage": 75,
        "score": 45
      }
    ],
    "insights": {
      "primary_match": "SWE",
      "confidence": "HIGH",
      "interpretation": "Excellent match!"
    }
  }
}
```

#### 3.5 Get Results
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/assessments/$assessmentId/results" -Method Get
```

**Expected:** Same as submit response with department details

---

### 4. Feedback Endpoints

#### 4.1 Submit Feedback
```powershell
$feedbackBody = @{
    assessment_id = $assessmentId
    rating = 5
    comment = "Very helpful and accurate recommendations!"
    helpful = $true
    would_recommend = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/feedback" `
    -Method Post `
    -ContentType "application/json" `
    -Body $feedbackBody
```

**Expected:**
```json
{
  "success": true,
  "message": "Thank you for your feedback!"
}
```

#### 4.2 Get Feedback Statistics
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/feedback/stats" -Method Get
```

**Expected:**
```json
{
  "success": true,
  "data": {
    "total_feedback": 1,
    "average_rating": 5.0,
    "helpful_count": 1,
    "helpful_percentage": 100
  }
}
```

---

## Automated Test Script

Create a file `test-all-endpoints.ps1`:

```powershell
# Complete API Test Script
Write-Host "=== CCI Department Guidance API Tests ===" -ForegroundColor Green

$baseUrl = "http://localhost:3000/api"

# Test 1: Health Check
Write-Host "`n1. Testing Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health"
    if ($health.success) {
        Write-Host "✓ Health check passed" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ Health check failed: $_" -ForegroundColor Red
    exit 1
}

# Test 2: Get All Departments
Write-Host "`n2. Testing Get All Departments..." -ForegroundColor Yellow
try {
    $departments = Invoke-RestMethod -Uri "$baseUrl/departments"
    $count = $departments.data.total
    Write-Host "✓ Retrieved $count departments" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed: $_" -ForegroundColor Red
}

# Test 3: Get Single Department
Write-Host "`n3. Testing Get Single Department (CS)..." -ForegroundColor Yellow
try {
    $dept = Invoke-RestMethod -Uri "$baseUrl/departments/CS"
    Write-Host "✓ Retrieved: $($dept.data.name)" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed: $_" -ForegroundColor Red
}

# Test 4: Start Assessment
Write-Host "`n4. Testing Start Assessment..." -ForegroundColor Yellow
try {
    $startBody = @{
        student_name = "Test Student"
        student_email = "test@example.com"
    } | ConvertTo-Json
    
    $assessment = Invoke-RestMethod -Uri "$baseUrl/assessments/start" `
        -Method Post `
        -ContentType "application/json" `
        -Body $startBody
    
    $assessmentId = $assessment.data.assessment_id
    $questionCount = $assessment.data.total_questions
    Write-Host "✓ Assessment started with $questionCount questions" -ForegroundColor Green
    Write-Host "  Assessment ID: $assessmentId" -ForegroundColor Cyan
    
    # Test 5: Save Responses for all questions
    Write-Host "`n5. Testing Save Responses..." -ForegroundColor Yellow
    $savedCount = 0
    foreach ($question in $assessment.data.questions) {
        try {
            $responseBody = @{
                question_id = $question.id
                option_id = $question.question_options[0].id
            } | ConvertTo-Json
            
            Invoke-RestMethod -Uri "$baseUrl/assessments/$assessmentId/responses" `
                -Method Post `
                -ContentType "application/json" `
                -Body $responseBody | Out-Null
            
            $savedCount++
        } catch {
            Write-Host "  ✗ Failed to save response for question $savedCount : $_" -ForegroundColor Red
        }
    }
    Write-Host "✓ Saved $savedCount/$questionCount responses" -ForegroundColor Green
    
    # Test 6: Check Progress
    Write-Host "`n6. Testing Get Progress..." -ForegroundColor Yellow
    $progress = Invoke-RestMethod -Uri "$baseUrl/assessments/$assessmentId/progress"
    Write-Host "✓ Progress: $($progress.data.progress_percentage)%" -ForegroundColor Green
    
    # Test 7: Submit Assessment
    Write-Host "`n7. Testing Submit Assessment..." -ForegroundColor Yellow
    $results = Invoke-RestMethod -Uri "$baseUrl/assessments/$assessmentId/submit" -Method Post
    $topMatch = $results.data.recommendations[0]
    Write-Host "✓ Assessment submitted successfully" -ForegroundColor Green
    Write-Host "  Top Match: $($topMatch.department_name) ($($topMatch.match_percentage)%)" -ForegroundColor Cyan
    Write-Host "  Confidence: $($results.data.insights.confidence)" -ForegroundColor Cyan
    
    # Test 8: Get Results
    Write-Host "`n8. Testing Get Results..." -ForegroundColor Yellow
    $finalResults = Invoke-RestMethod -Uri "$baseUrl/assessments/$assessmentId/results"
    Write-Host "✓ Results retrieved successfully" -ForegroundColor Green
    
    # Test 9: Submit Feedback
    Write-Host "`n9. Testing Submit Feedback..." -ForegroundColor Yellow
    $feedbackBody = @{
        assessment_id = $assessmentId
        rating = 5
        comment = "Automated test feedback"
        helpful = $true
    } | ConvertTo-Json
    
    Invoke-RestMethod -Uri "$baseUrl/feedback" `
        -Method Post `
        -ContentType "application/json" `
        -Body $feedbackBody | Out-Null
    Write-Host "✓ Feedback submitted successfully" -ForegroundColor Green
    
    # Test 10: Get Feedback Stats
    Write-Host "`n10. Testing Get Feedback Stats..." -ForegroundColor Yellow
    $stats = Invoke-RestMethod -Uri "$baseUrl/feedback/stats"
    Write-Host "✓ Stats: $($stats.data.total_feedback) feedback, avg rating $($stats.data.average_rating)" -ForegroundColor Green
    
} catch {
    Write-Host "✗ Assessment flow failed: $_" -ForegroundColor Red
}

Write-Host "`n=== All Tests Completed ===" -ForegroundColor Green
```

**Run the automated tests:**
```powershell
cd backend
.\test-all-endpoints.ps1
```

---

## REST Client File (.http)

Create `backend/test-requests.http`:

```http
### Variables
@baseUrl = http://localhost:3000/api
@assessmentId = your-assessment-id-here

### 1. Health Check
GET {{baseUrl}}/health

### 2. Get All Departments
GET {{baseUrl}}/departments

### 3. Get Single Department
GET {{baseUrl}}/departments/CS

### 4. Get Curriculum
GET {{baseUrl}}/departments/SWE/curriculum

### 5. Search Departments
GET {{baseUrl}}/departments/search?q=software

### 6. Compare Departments
POST {{baseUrl}}/departments/compare
Content-Type: application/json

{
  "department_codes": ["CS", "SWE", "IT"]
}

### 7. Start Assessment
POST {{baseUrl}}/assessments/start
Content-Type: application/json

{
  "student_name": "Test Student",
  "student_email": "test@example.com"
}

### 8. Save Response
POST {{baseUrl}}/assessments/{{assessmentId}}/responses
Content-Type: application/json

{
  "question_id": "question-uuid-here",
  "option_id": "option-uuid-here"
}

### 9. Get Progress
GET {{baseUrl}}/assessments/{{assessmentId}}/progress

### 10. Submit Assessment
POST {{baseUrl}}/assessments/{{assessmentId}}/submit

### 11. Get Results
GET {{baseUrl}}/assessments/{{assessmentId}}/results

### 12. Submit Feedback
POST {{baseUrl}}/feedback
Content-Type: application/json

{
  "assessment_id": "{{assessmentId}}",
  "rating": 5,
  "comment": "Great system!",
  "helpful": true
}

### 13. Get Feedback Stats
GET {{baseUrl}}/feedback/stats
```

---

## Expected Test Results Summary

| Endpoint | Method | Expected Status | Expected Data |
|----------|--------|----------------|---------------|
| /api/health | GET | 200 | Server status |
| /api/departments | GET | 200 | 6 departments |
| /api/departments/CS | GET | 200 | CS details |
| /api/departments/CS/curriculum | GET | 200 | Curriculum JSON |
| /api/departments/search | GET | 200 | Search results |
| /api/departments/compare | POST | 200 | Comparison data |
| /api/assessments/start | POST | 201 | Assessment + 20 questions |
| /api/assessments/:id/responses | POST | 200 | Response saved |
| /api/assessments/:id/progress | GET | 200 | Progress % |
| /api/assessments/:id/submit | POST | 200 | 6 ranked recommendations |
| /api/assessments/:id/results | GET | 200 | Full results |
| /api/feedback | POST | 201 | Feedback ID |
| /api/feedback/stats | GET | 200 | Statistics |

---

## Troubleshooting

### Server won't start
- Check `.env` file exists and has valid credentials
- Verify port 3000 is not in use: `netstat -ano | findstr :3000`

### Database connection failed
- Verify Supabase credentials
- Check if migrations are executed
- Test connection in Supabase dashboard

### Validation errors
- Check request body format (JSON)
- Verify required fields are present
- Review Joi schemas in `validator.js`

### 404 errors
- Confirm server is running on port 3000
- Check endpoint URL spelling
- Verify routes are mounted in `server.js`

---

**Last Updated:** August 31, 2026  
**Test Coverage:** 13 endpoints

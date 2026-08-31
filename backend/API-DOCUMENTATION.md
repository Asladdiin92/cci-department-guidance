# CCI Department Guidance System - API Documentation

**Base URL:** `http://localhost:3000/api`  
**Version:** 1.0.0  
**Date:** August 31, 2026

---

## Table of Contents

1. [Health & Status](#health--status)
2. [Departments](#departments)
3. [Assessments](#assessments)
4. [Feedback](#feedback)
5. [Error Responses](#error-responses)

---

## Health & Status

### Check API Health

```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "CCI Department Guidance API is running",
  "timestamp": "2026-08-31T20:00:00.000Z",
  "environment": "development",
  "database": "Connected"
}
```

### Get API Info

```http
GET /api
```

**Response:**
```json
{
  "success": true,
  "message": "CCI Department Guidance System API",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

---

## Departments

### Get All Departments

```http
GET /api/departments
```

**Response:**
```json
{
  "success": true,
  "message": "Departments retrieved successfully",
  "data": {
    "departments": [
      {
        "code": "CS",
        "name": "Computer Science",
        "description": "Study of computation, algorithms...",
        "strengths": ["Algorithm Design", "AI & ML", ...],
        "career_paths": ["Software Developer", "AI Engineer", ...],
        "industry_demand": "Very High",
        "color": "#1e7b34",
        "icon": "💻"
      }
    ],
    "total": 6
  }
}
```

### Get Single Department

```http
GET /api/departments/:code
```

**Parameters:**
- `code` (string) - Department code (CS, SWE, IT, IS, ISC, STAT)

**Response:**
```json
{
  "success": true,
  "message": "Department details retrieved successfully",
  "data": {
    "code": "CS",
    "name": "Computer Science",
    "description": "...",
    "strengths": [...],
    "curriculum": {
      "core_courses": [...],
      "electives": [...],
      "projects": [...]
    },
    "career_paths": [...],
    "statistics": {
      "top_recommendations": 45
    }
  }
}
```

### Get Department Curriculum

```http
GET /api/departments/:code/curriculum
```

**Response:**
```json
{
  "success": true,
  "message": "Curriculum retrieved successfully",
  "data": {
    "department_code": "CS",
    "department_name": "Computer Science",
    "curriculum": {
      "core_courses": [
        {
          "code": "CS101",
          "name": "Introduction to Programming",
          "credits": 4
        }
      ]
    }
  }
}
```

### Search Departments

```http
GET /api/departments/search?q=software
```

**Query Parameters:**
- `q` (string) - Search query (minimum 2 characters)

**Response:**
```json
{
  "success": true,
  "message": "Search completed successfully",
  "data": {
    "results": [...],
    "count": 2,
    "query": "software"
  }
}
```

### Compare Departments

```http
POST /api/departments/compare
```

**Request Body:**
```json
{
  "department_codes": ["CS", "SWE", "IT"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Department comparison retrieved successfully",
  "data": {
    "departments": [...],
    "comparison_count": 3
  }
}
```

---

## Assessments

### Start Assessment

```http
POST /api/assessments/start
```

**Request Body (optional):**
```json
{
  "student_name": "Asladin Abdukedir",
  "student_email": "student@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Assessment started successfully",
  "data": {
    "assessment_id": "uuid-here",
    "session_token": "token-here",
    "questions": [
      {
        "id": "uuid",
        "text": "What interests you most?",
        "category": "interests",
        "difficulty": "EASY",
        "order_index": 1,
        "question_options": [
          {
            "id": "uuid",
            "text": "Building software applications",
            "scores": {
              "CS": 2,
              "SWE": 3,
              "IT": 1,
              "IS": 1,
              "ISC": 0,
              "STAT": 0
            }
          }
        ]
      }
    ],
    "total_questions": 20,
    "started_at": "2026-08-31T20:00:00.000Z"
  }
}
```

### Save Response

```http
POST /api/assessments/:id/responses
```

**Request Body:**
```json
{
  "question_id": "uuid-here",
  "option_id": "uuid-here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "response_id": "uuid",
    "responses_completed": 5,
    "message": "Response saved successfully"
  }
}
```

### Submit Assessment

```http
POST /api/assessments/:id/submit
```

**Response:**
```json
{
  "success": true,
  "message": "Assessment submitted successfully",
  "data": {
    "assessment_id": "uuid",
    "recommendations": [
      {
        "rank": 1,
        "department_code": "SWE",
        "department_name": "Software Engineering",
        "department_description": "...",
        "score": 45,
        "match_percentage": 75,
        "color": "#1e7b34",
        "icon": "⚙️"
      }
    ],
    "insights": {
      "primary_match": "SWE",
      "match_strength": 75,
      "confidence": "HIGH",
      "alternative_options": ["CS"],
      "interpretation": "Excellent match! Your responses strongly align with this department."
    },
    "metadata": {
      "total_responses": 20,
      "max_possible_score": 60,
      "category_distribution": {
        "problem_solving": 2,
        "interests": 6,
        "career_goals": 5,
        "learning_style": 3,
        "skills": 4
      },
      "submitted_at": "2026-08-31T20:15:00.000Z"
    }
  }
}
```

### Get Results

```http
GET /api/assessments/:id/results
```

**Response:** Same structure as Submit Assessment

### Get Progress

```http
GET /api/assessments/:id/progress
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "assessment_id": "uuid",
    "responses_completed": 12,
    "total_questions": 20,
    "progress_percentage": 60,
    "is_completed": false
  }
}
```

---

## Feedback

### Submit Feedback

```http
POST /api/feedback
```

**Request Body:**
```json
{
  "assessment_id": "uuid-here",
  "rating": 5,
  "comment": "Very helpful guidance!",
  "helpful": true,
  "would_recommend": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your feedback!",
  "data": {
    "feedback_id": "uuid",
    "submitted_at": "2026-08-31T20:20:00.000Z"
  }
}
```

### Get Feedback Statistics

```http
GET /api/feedback/stats
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "total_feedback": 150,
    "average_rating": 4.5,
    "helpful_count": 135,
    "helpful_percentage": 90
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here",
  "details": { ... }
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

### Example Error Response

```json
{
  "success": false,
  "error": "Validation error",
  "details": {
    "fields": [
      {
        "field": "rating",
        "message": "\"rating\" must be less than or equal to 5"
      }
    ]
  }
}
```

---

## Notes

### Authentication
Currently, all endpoints are public. Admin authentication will be added in future phases.

### Rate Limiting
Default: 100 requests per 15 minutes per IP

### CORS
Configured to accept requests from `http://localhost:5173` (frontend) and `http://localhost:3000`

### Validation
- All UUIDs are validated
- Request bodies are validated using Joi schemas
- Invalid requests return 400 with detailed error messages

### Database
- All timestamps are in ISO 8601 format (UTC)
- UUIDs are used for all primary keys
- JSONB fields support flexible data structures

---

**Last Updated:** August 31, 2026  
**Maintained by:** CCI Development Team

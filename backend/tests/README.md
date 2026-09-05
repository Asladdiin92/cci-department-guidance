# Backend API Testing

Automated test suite using **Jest** and **Supertest** for the CCI Department Guidance System backend.

## ✅ Test Status: 16/16 Passing (100%)

## 📦 Test Coverage

### Department Endpoints (3 tests)
- ✅ GET /api/departments - Returns all 6 departments
- ✅ GET /api/departments/:code - Returns specific department
- ✅ GET /api/departments/INVALID - Returns 404 for invalid code

### Assessment Flow (9 tests)
- ✅ POST /api/assessments/start - Starts assessment with valid student info
- ✅ POST /api/assessments/start - Rejects without student_id
- ✅ POST /api/assessments/start - Rejects without student_name
- ✅ POST /api/assessments/start - Rejects with invalid email
- ✅ POST /api/assessments/:id/responses - Saves response with session token
- ✅ POST /api/assessments/:id/responses - Rejects without session token
- ✅ POST /api/assessments/:id/responses - Rejects with invalid session token
- ✅ GET /api/assessments/:id/progress - Returns progress with session token
- ✅ POST /api/assessments/:id/submit - Rejects incomplete submission

### Full Workflow (1 test)
- ✅ **Complete end-to-end assessment** - Start → Answer all 20 questions → Submit → Get results

### System Health (1 test)
- ✅ GET /api/health - Returns healthy status with database info

### Error Handling (2 tests)
- ✅ Returns 404 for non-existent routes
- ✅ Handles malformed JSON gracefully

## 🚀 Running Tests

### Run all tests
```bash
npm test
```

### Watch mode (auto-rerun on changes)
```bash
npm run test:watch
```

### Coverage report
```bash
npm run test:coverage
```

## 📁 Test Files

- `tests/setup.js` - Test environment configuration
- `tests/api.test.js` - All API endpoint tests
- `jest.config.js` - Jest configuration

## 🔧 Test Environment

Tests run with:
- **NODE_ENV=test** - Prevents server from listening on ports
- **30 second timeout** - Allows time for database operations
- **Supabase test database** - Uses same .env configuration

## 📊 Test Output Example

```
PASS tests/api.test.js (27.782 s)
  CCI Department Guidance API Tests
    GET /api/departments
      ✓ should return all 6 departments (348 ms)
    GET /api/departments/:code
      ✓ should return Computer Science department (376 ms)
    ...
    Full Assessment Workflow
      ✓ should complete full assessment from start to results (22433 ms)

Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        27.782 s
```

## 🎯 Key Features Tested

1. **Session Token Security** - All protected endpoints require valid tokens
2. **Input Validation** - Joi schemas validate all request bodies
3. **Error Handling** - Proper HTTP status codes and error messages
4. **Database Integration** - Real Supabase queries (not mocked)
5. **Complete Workflows** - End-to-end user journeys

## 🔒 Security Tests

- Session token validation on all protected routes
- Invalid token rejection
- Incomplete assessment submission prevention
- Email format validation
- Student ID format validation

## 📝 Notes

- Tests use real database (Supabase) for integration testing
- Test data is created with unique timestamps to avoid conflicts
- Full assessment workflow takes ~22 seconds due to 20 questions
- All tests clean up after themselves (no manual cleanup needed)

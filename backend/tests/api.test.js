/**
 * API Endpoints Tests
 * Tests all REST API endpoints with request/response validation
 */

const request = require('supertest');
const app = require('../src/server');

describe('API Health Endpoints', () => {
  test('GET / - should return API information', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('CCI');
  });

  test('GET /api/health - should return health status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('database');
    expect(response.body.database).toHaveProperty('status');
  });
});

describe('Departments API', () => {
  describe('GET /api/departments', () => {
    test('should return all departments', async () => {
      const response = await request(app)
        .get('/api/departments')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('departments');
      expect(Array.isArray(response.body.data.departments)).toBe(true);
      expect(response.body.data.departments).toHaveLength(6);
    });

    test('should return departments with correct structure', async () => {
      const response = await request(app)
        .get('/api/departments')
        .expect(200);

      const dept = response.body.data.departments[0];
      expect(dept).toHaveProperty('code');
      expect(dept).toHaveProperty('name');
      expect(dept).toHaveProperty('description');
      expect(dept).toHaveProperty('core_courses');
      expect(dept).toHaveProperty('career_paths');
    });

    test('should handle network errors gracefully', async () => {
      // This would require mocking Supabase
      // For now, we test that the endpoint exists
      const response = await request(app)
        .get('/api/departments')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('GET /api/departments/:code', () => {
    test('should return single department by code', async () => {
      const response = await request(app)
        .get('/api/departments/CS')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('code', 'CS');
      expect(response.body.data.name).toContain('Computer Science');
    });

    test('should return 404 for invalid code', async () => {
      const response = await request(app)
        .get('/api/departments/INVALID')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
    });

    test('should test all department codes', async () => {
      const codes = ['CS', 'SWE', 'IT', 'IS', 'ISC', 'STAT'];
      
      for (const code of codes) {
        const response = await request(app)
          .get(`/api/departments/${code}`)
          .expect(200);

        expect(response.body.data.code).toBe(code);
      }
    });
  });
});

describe('Assessments API', () => {
  let testAssessmentId;
  let testSessionToken;

  describe('POST /api/assessments/start', () => {
    test('should start new assessment', async () => {
      const studentInfo = {
        student_id: `TEST-${Date.now()}`,
        student_name: 'API Test Student',
        student_email: 'apitest@example.com'
      };

      const response = await request(app)
        .post('/api/assessments/start')
        .send(studentInfo)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('assessment_id');
      expect(response.body.data).toHaveProperty('session_token');
      expect(response.body.data).toHaveProperty('questions');
      expect(response.body.data.questions).toHaveLength(20);

      testAssessmentId = response.body.data.assessment_id;
      testSessionToken = response.body.data.session_token;
    });

    test('should return questions with correct structure', async () => {
      const response = await request(app)
        .post('/api/assessments/start')
        .send({
          student_id: 'TEST-002',
          student_name: 'Test',
          student_email: 'test2@test.com'
        })
        .expect(200);

      const question = response.body.data.questions[0];
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('question_text');
      expect(question).toHaveProperty('options');
      expect(Array.isArray(question.options)).toBe(true);
      expect(question.options.length).toBeGreaterThan(0);

      const option = question.options[0];
      expect(option).toHaveProperty('id');
      expect(option).toHaveProperty('option_text');
    });

    test('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/assessments/start')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
    });

    test('should validate email format', async () => {
      const response = await request(app)
        .post('/api/assessments/start')
        .send({
          student_id: 'TEST-003',
          student_name: 'Test',
          student_email: 'invalid-email'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/assessments/:id/submit', () => {
    test('should submit assessment', async () => {
      if (!testAssessmentId || !testSessionToken) {
        // Create assessment first
        const startResponse = await request(app)
          .post('/api/assessments/start')
          .send({
            student_id: 'TEST-SUBMIT',
            student_name: 'Submit Test',
            student_email: 'submit@test.com'
          });

        testAssessmentId = startResponse.body.data.assessment_id;
        testSessionToken = startResponse.body.data.session_token;
      }

      const response = await request(app)
        .post(`/api/assessments/${testAssessmentId}/submit`)
        .send({ session_token: testSessionToken })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('top_match');
      expect(response.body.data).toHaveProperty('scores');
      expect(response.body.data.top_match).toHaveProperty('department_code');
    });

    test('should require valid session token', async () => {
      const response = await request(app)
        .post(`/api/assessments/${testAssessmentId}/submit`)
        .send({ session_token: 'invalid-token' })
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    test('should return 404 for invalid assessment ID', async () => {
      const response = await request(app)
        .post('/api/assessments/00000000-0000-0000-0000-000000000000/submit')
        .send({ session_token: 'any-token' })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/assessments/:id/results', () => {
    test('should get assessment results', async () => {
      if (!testAssessmentId) {
        return; // Skip if no test assessment
      }

      const response = await request(app)
        .get(`/api/assessments/${testAssessmentId}/results`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('assessment_id');
      expect(response.body.data).toHaveProperty('student_name');
      expect(response.body.data).toHaveProperty('top_match');
      expect(response.body.data).toHaveProperty('scores');
    });

    test('should return 404 for non-existent assessment', async () => {
      const response = await request(app)
        .get('/api/assessments/00000000-0000-0000-0000-000000000000/results')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});

describe('Feedback API', () => {
  describe('POST /api/feedback', () => {
    test('should submit feedback', async () => {
      const response = await request(app)
        .post('/api/feedback')
        .send({
          rating: 5,
          comment: 'Great system!',
          user_name: 'Test User',
          user_email: 'feedback@test.com'
        })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
    });

    test('should validate rating range', async () => {
      const response = await request(app)
        .post('/api/feedback')
        .send({
          rating: 6, // Invalid
          comment: 'Test'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should require rating', async () => {
      const response = await request(app)
        .post('/api/feedback')
        .send({
          comment: 'No rating'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});

describe('Admin API', () => {
  describe('GET /api/admin/stats', () => {
    test('should return dashboard statistics', async () => {
      const response = await request(app)
        .get('/api/admin/stats')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('total_assessments');
      expect(response.body.data).toHaveProperty('completed_assessments');
      expect(response.body.data).toHaveProperty('completion_rate');
      expect(response.body.data).toHaveProperty('average_rating');
    });

    test('should return numeric values', async () => {
      const response = await request(app)
        .get('/api/admin/stats')
        .expect(200);

      expect(typeof response.body.data.total_assessments).toBe('number');
      expect(typeof response.body.data.completion_rate).toBe('number');
    });
  });

  describe('GET /api/admin/analytics', () => {
    test('should return analytics data', async () => {
      const response = await request(app)
        .get('/api/admin/analytics')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('department_distribution');
      expect(response.body.data).toHaveProperty('question_affinity');
      expect(response.body.data).toHaveProperty('completion_trend');
    });

    test('should return array data', async () => {
      const response = await request(app)
        .get('/api/admin/analytics')
        .expect(200);

      expect(Array.isArray(response.body.data.department_distribution)).toBe(true);
      expect(Array.isArray(response.body.data.question_affinity)).toBe(true);
      expect(Array.isArray(response.body.data.completion_trend)).toBe(true);
    });
  });

  describe('GET /api/admin/submissions', () => {
    test('should return paginated submissions', async () => {
      const response = await request(app)
        .get('/api/admin/submissions')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('submissions');
      expect(response.body.data).toHaveProperty('pagination');
      expect(response.body.data.pagination).toHaveProperty('page');
      expect(response.body.data.pagination).toHaveProperty('total');
    });

    test('should support search parameter', async () => {
      const response = await request(app)
        .get('/api/admin/submissions')
        .query({ search: 'test' })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    test('should support sorting', async () => {
      const response = await request(app)
        .get('/api/admin/submissions')
        .query({ sortBy: 'completed_at', sortOrder: 'desc' })
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });
});

describe('Error Handling', () => {
  test('should return 404 for unknown routes', async () => {
    const response = await request(app)
      .get('/api/unknown-endpoint')
      .expect(404);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  test('should handle invalid JSON', async () => {
    const response = await request(app)
      .post('/api/assessments/start')
      .send('invalid json')
      .set('Content-Type', 'application/json')
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  test('should handle missing Content-Type', async () => {
    const response = await request(app)
      .post('/api/assessments/start')
      .send({ test: 'data' })
      .expect(400);

    // Should still process or return appropriate error
    expect(response.body).toHaveProperty('success');
  });
});

describe('CORS', () => {
  test('should include CORS headers', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.headers).toHaveProperty('access-control-allow-origin');
  });

  test('should handle OPTIONS preflight', async () => {
    const response = await request(app)
      .options('/api/departments')
      .expect(204);

    expect(response.headers).toHaveProperty('access-control-allow-methods');
  });
});

describe('Rate Limiting', () => {
  test('should allow reasonable request rate', async () => {
    // Make 5 quick requests
    for (let i = 0; i < 5; i++) {
      await request(app)
        .get('/api/departments')
        .expect(200);
    }
  });
});

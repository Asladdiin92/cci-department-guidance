/**
 * API Integration Tests
 * Tests all backend endpoints with Jest and Supertest
 */

const request = require('supertest');
const app = require('../src/server');

describe('CCI Department Guidance API Tests', () => {
  
  // ================================================================
  // Department Endpoints
  // ================================================================
  
  describe('GET /api/departments', () => {
    it('should return all 6 departments', async () => {
      const res = await request(app)
        .get('/api/departments')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.departments).toHaveLength(6);
      expect(res.body.data.departments[0]).toHaveProperty('code');
      expect(res.body.data.departments[0]).toHaveProperty('name');
    });
  });

  describe('GET /api/departments/:code', () => {
    it('should return Computer Science department', async () => {
      const res = await request(app)
        .get('/api/departments/CS')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.code).toBe('CS');
      expect(res.body.data.name).toBe('Computer Science');
      expect(res.body.data).toHaveProperty('strengths');
      expect(res.body.data).toHaveProperty('career_paths');
    });

    it('should return 404 for invalid department', async () => {
      const res = await request(app)
        .get('/api/departments/INVALID')
        .expect(404);

      expect(res.body.success).toBe(false);
    });
  });

  // ================================================================
  // Assessment Flow
  // ================================================================
  
  describe('POST /api/assessments/start', () => {
    it('should start a new assessment with valid student info', async () => {
      const studentInfo = global.testUtils.generateTestStudent();
      
      const res = await request(app)
        .post('/api/assessments/start')
        .send(studentInfo)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('assessment_id');
      expect(res.body.data).toHaveProperty('session_token');
      expect(res.body.data).toHaveProperty('questions');
      expect(res.body.data.total_questions).toBe(20);
      expect(res.body.data.session_token).toHaveLength(64); // 32 bytes hex
    });

    it('should reject assessment without student_id', async () => {
      const res = await request(app)
        .post('/api/assessments/start')
        .send({
          student_name: 'Test',
          student_email: 'test@test.com'
        })
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.error).toMatch(/Student ID.*required/i);
    });

    it('should reject assessment without student_name', async () => {
      const res = await request(app)
        .post('/api/assessments/start')
        .send({
          student_id: 'TEST/001',
          student_email: 'test@test.com'
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('should reject assessment with invalid email', async () => {
      const res = await request(app)
        .post('/api/assessments/start')
        .send({
          student_id: 'TEST/001',
          student_name: 'Test',
          student_email: 'invalid-email'
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  describe('Assessment Response Flow', () => {
    let assessmentId;
    let sessionToken;
    let questions;

    beforeAll(async () => {
      // Start assessment
      const studentInfo = global.testUtils.generateTestStudent();
      const res = await request(app)
        .post('/api/assessments/start')
        .send(studentInfo);

      assessmentId = res.body.data.assessment_id;
      sessionToken = res.body.data.session_token;
      questions = res.body.data.questions;
    });

    it('should save a response with valid session token', async () => {
      const res = await request(app)
        .post(`/api/assessments/${assessmentId}/responses`)
        .send({
          question_id: questions[0].id,
          option_id: questions[0].question_options[0].id,
          session_token: sessionToken
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('response_id');
      expect(res.body.data.responses_completed).toBe(1);
    });

    it('should reject response without session token', async () => {
      const res = await request(app)
        .post(`/api/assessments/${assessmentId}/responses`)
        .send({
          question_id: questions[0].id,
          option_id: questions[0].question_options[0].id
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('should reject response with invalid session token', async () => {
      const res = await request(app)
        .post(`/api/assessments/${assessmentId}/responses`)
        .send({
          question_id: questions[0].id,
          option_id: questions[0].question_options[0].id,
          session_token: 'invalid-token-123456789012345678901234567890'
        })
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    it('should get assessment progress', async () => {
      const res = await request(app)
        .get(`/api/assessments/${assessmentId}/progress`)
        .query({ session_token: sessionToken })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.total_questions).toBe(20);
      expect(res.body.data.responses_completed).toBeGreaterThan(0);
      expect(res.body.data).toHaveProperty('progress_percentage');
      expect(res.body.data).toHaveProperty('can_submit');
    });

    it('should reject incomplete submission', async () => {
      const res = await request(app)
        .post(`/api/assessments/${assessmentId}/submit`)
        .send({ session_token: sessionToken })
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Incomplete');
    });
  });

  // ================================================================
  // Complete Assessment Flow
  // ================================================================

  describe('Full Assessment Workflow', () => {
    it('should complete full assessment from start to results', async () => {
      // Step 1: Start assessment
      const studentInfo = global.testUtils.generateTestStudent();
      const startRes = await request(app)
        .post('/api/assessments/start')
        .send(studentInfo)
        .expect(201);

      const { assessment_id, session_token, questions } = startRes.body.data;

      // Step 2: Answer all questions
      for (let i = 0; i < questions.length; i++) {
        await request(app)
          .post(`/api/assessments/${assessment_id}/responses`)
          .send({
            question_id: questions[i].id,
            option_id: questions[i].question_options[0].id,
            session_token
          })
          .expect(200);
      }

      // Step 3: Submit assessment
      const submitRes = await request(app)
        .post(`/api/assessments/${assessment_id}/submit`)
        .send({ session_token })
        .expect(200);

      expect(submitRes.body.success).toBe(true);
      expect(submitRes.body.data).toHaveProperty('recommendations');
      expect(submitRes.body.data.recommendations).toHaveLength(6);
      expect(submitRes.body.data.recommendations[0].rank).toBe(1);
      expect(submitRes.body.data).toHaveProperty('insights');

      // Step 4: Get results
      const resultsRes = await request(app)
        .get(`/api/assessments/${assessment_id}/results`)
        .expect(200);

      expect(resultsRes.body.success).toBe(true);
      expect(resultsRes.body.data).toHaveProperty('recommendations');
      expect(resultsRes.body.data.recommendations[0]).toHaveProperty('department_name');
    }, 60000); // Extended timeout for full workflow
  });

  // ================================================================
  // Health Check
  // ================================================================

  describe('GET /api/health', () => {
    it('should return healthy status', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);

      expect(res.body.status).toBe('healthy');
      expect(res.body).toHaveProperty('database');
    });
  });

  // ================================================================
  // Error Handling
  // ================================================================

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app)
        .get('/api/non-existent-route')
        .expect(404);

      expect(res.body.success).toBe(false);
    });

    it('should handle malformed JSON', async () => {
      const res = await request(app)
        .post('/api/assessments/start')
        .set('Content-Type', 'application/json')
        .send('{ invalid json')
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });
});

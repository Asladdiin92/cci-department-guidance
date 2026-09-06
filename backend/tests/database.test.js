/**
 * Database Retrieval Functions Tests
 * Tests all database operations with success and error scenarios
 */

const { supabase, supabaseAdmin, testConnection } = require('../src/config/supabase');

describe('Database Connection', () => {
  test('should establish connection successfully', async () => {
    const result = await testConnection();
    expect(result).toBe(true);
  });

  test('should have valid Supabase URL', () => {
    expect(process.env.SUPABASE_URL).toBeDefined();
    expect(process.env.SUPABASE_URL).toMatch(/^https:\/\/.+\.supabase\.co$/);
  });

  test('should have valid anon key', () => {
    expect(process.env.SUPABASE_ANON_KEY).toBeDefined();
    expect(process.env.SUPABASE_ANON_KEY.length).toBeGreaterThan(100);
  });
});

describe('Departments Table', () => {
  describe('Success Scenarios', () => {
    test('should retrieve all departments', async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('code');

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(6);
    });

    test('should retrieve all 6 department codes', async () => {
      const { data } = await supabase
        .from('departments')
        .select('code')
        .order('code');

      const codes = data.map(d => d.code);
      expect(codes).toEqual(['CS', 'IS', 'ISC', 'IT', 'STAT', 'SWE']);
    });

    test('should retrieve single department by code', async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('code', 'CS')
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.code).toBe('CS');
      expect(data.name).toContain('Computer Science');
    });

    test('should have core_courses array', async () => {
      const { data } = await supabase
        .from('departments')
        .select('code, core_courses')
        .eq('code', 'IT')
        .single();

      expect(data.core_courses).toBeDefined();
      expect(Array.isArray(data.core_courses)).toBe(true);
      expect(data.core_courses.length).toBeGreaterThan(0);
    });

    test('should filter departments by specific field', async () => {
      const { data } = await supabase
        .from('departments')
        .select('code, name')
        .in('code', ['CS', 'SWE', 'IT']);

      expect(data.length).toBe(3);
    });
  });

  describe('Error Handling', () => {
    test('should handle non-existent department code', async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('code', 'INVALID')
        .single();

      expect(data).toBeNull();
      expect(error).toBeDefined();
    });

    test('should handle invalid column name gracefully', async () => {
      const { error } = await supabase
        .from('departments')
        .select('invalid_column');

      expect(error).toBeDefined();
      expect(error.message).toContain('column');
    });
  });
});

describe('Questions Table', () => {
  describe('Success Scenarios', () => {
    test('should retrieve all active questions', async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('is_active', true)
        .order('question_order');

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(20);
    });

    test('should have sequential question_order', async () => {
      const { data } = await supabase
        .from('questions')
        .select('question_order')
        .eq('is_active', true)
        .order('question_order');

      const orders = data.map(q => q.question_order);
      expect(orders[0]).toBe(1);
      expect(orders).toHaveLength(20);
    });

    test('should retrieve questions with options', async () => {
      const { data, error } = await supabase
        .from('questions')
        .select(`
          *,
          question_options (*)
        `)
        .eq('is_active', true)
        .limit(1)
        .single();

      expect(error).toBeNull();
      expect(data.question_options).toBeDefined();
      expect(Array.isArray(data.question_options)).toBe(true);
      expect(data.question_options.length).toBeGreaterThan(0);
    });

    test('should filter by category', async () => {
      const { data } = await supabase
        .from('questions')
        .select('id, category')
        .eq('category', 'interests')
        .eq('is_active', true);

      expect(data.length).toBeGreaterThan(0);
      data.forEach(q => expect(q.category).toBe('interests'));
    });
  });

  describe('Error Handling', () => {
    test('should handle empty result set', async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('is_active', false)
        .eq('question_order', 999);

      expect(error).toBeNull();
      expect(data).toEqual([]);
    });
  });
});

describe('Question Options Table', () => {
  describe('Success Scenarios', () => {
    test('should retrieve options for a question', async () => {
      // First get a question ID
      const { data: questions } = await supabase
        .from('questions')
        .select('id')
        .eq('is_active', true)
        .limit(1)
        .single();

      const { data, error } = await supabase
        .from('question_options')
        .select('*')
        .eq('question_id', questions.id)
        .order('option_order');

      expect(error).toBeNull();
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('text');
      expect(data[0]).toHaveProperty('cs_score');
      expect(data[0]).toHaveProperty('swe_score');
    });

    test('should have all department score columns', async () => {
      const { data } = await supabase
        .from('question_options')
        .select('cs_score, swe_score, it_score, is_score, isc_score, stat_score')
        .limit(1)
        .single();

      expect(data.cs_score).toBeDefined();
      expect(data.swe_score).toBeDefined();
      expect(data.it_score).toBeDefined();
      expect(data.is_score).toBeDefined();
      expect(data.isc_score).toBeDefined();
      expect(data.stat_score).toBeDefined();
    });

    test('should have valid score ranges (0-3)', async () => {
      const { data } = await supabase
        .from('question_options')
        .select('cs_score, swe_score, it_score')
        .limit(10);

      data.forEach(option => {
        expect(option.cs_score).toBeGreaterThanOrEqual(0);
        expect(option.cs_score).toBeLessThanOrEqual(3);
        expect(option.swe_score).toBeGreaterThanOrEqual(0);
        expect(option.swe_score).toBeLessThanOrEqual(3);
      });
    });
  });
});

describe('Assessments Table', () => {
  let testAssessmentId;

  describe('Success Scenarios', () => {
    test('should create new assessment', async () => {
      const { data, error } = await supabase
        .from('assessments')
        .insert({
          student_id: testUtils.randomStudentId(),
          student_name: 'Test Student',
          student_email: testUtils.randomEmail(),
          status: 'in_progress'
        })
        .select()
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBeDefined();
      expect(data.status).toBe('in_progress');

      testAssessmentId = data.id;
      testUtils.cleanupIds.push(data.id);
    });

    test('should retrieve assessment by ID', async () => {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', testAssessmentId)
        .single();

      expect(error).toBeNull();
      expect(data.id).toBe(testAssessmentId);
    });

    test('should update assessment status', async () => {
      const { data, error } = await supabase
        .from('assessments')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', testAssessmentId)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data.status).toBe('completed');
      expect(data.completed_at).toBeDefined();
    });

    test('should filter by status', async () => {
      const { data } = await supabase
        .from('assessments')
        .select('id, status')
        .eq('status', 'completed');

      expect(data.length).toBeGreaterThanOrEqual(1);
      data.forEach(a => expect(a.status).toBe('completed'));
    });
  });

  describe('Error Handling', () => {
    test('should handle missing required columns', async () => {
      const { error } = await supabase
        .from('assessments')
        .insert({
          // Missing status - should use default
        })
        .select();

      // Should succeed with default status
      expect(error).toBeNull();
    });

    test('should handle invalid UUID', async () => {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', 'invalid-uuid')
        .single();

      expect(data).toBeNull();
      expect(error).toBeDefined();
    });
  });

  afterAll(async () => {
    // Cleanup test assessment
    if (testAssessmentId) {
      await supabase
        .from('assessments')
        .delete()
        .eq('id', testAssessmentId);
    }
  });
});

describe('Assessment Responses Table', () => {
  let testAssessmentId, testQuestionId, testOptionId;

  beforeAll(async () => {
    // Create test assessment
    const { data: assessment } = await supabase
      .from('assessments')
      .insert({
        student_id: testUtils.randomStudentId(),
        student_name: 'Response Test',
        student_email: testUtils.randomEmail(),
        status: 'in_progress'
      })
      .select()
      .single();

    testAssessmentId = assessment.id;

    // Get a question and option
    const { data: question } = await supabase
      .from('questions')
      .select('id')
      .eq('is_active', true)
      .limit(1)
      .single();

    testQuestionId = question.id;

    const { data: option } = await supabase
      .from('question_options')
      .select('id')
      .eq('question_id', testQuestionId)
      .limit(1)
      .single();

    testOptionId = option.id;
  });

  describe('Success Scenarios', () => {
    test('should save assessment response', async () => {
      const { data, error } = await supabase
        .from('assessment_responses')
        .insert({
          assessment_id: testAssessmentId,
          question_id: testQuestionId,
          option_id: testOptionId
        })
        .select()
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.assessment_id).toBe(testAssessmentId);
    });

    test('should retrieve responses for assessment', async () => {
      const { data, error } = await supabase
        .from('assessment_responses')
        .select('*')
        .eq('assessment_id', testAssessmentId);

      expect(error).toBeNull();
      expect(data.length).toBeGreaterThan(0);
    });

    test('should prevent duplicate responses (same question)', async () => {
      const { error } = await supabase
        .from('assessment_responses')
        .insert({
          assessment_id: testAssessmentId,
          question_id: testQuestionId,
          option_id: testOptionId
        });

      // Should fail due to unique constraint
      expect(error).toBeDefined();
      expect(error.code).toBe('23505'); // Unique violation
    });
  });

  afterAll(async () => {
    // Cleanup
    if (testAssessmentId) {
      await supabase
        .from('assessment_responses')
        .delete()
        .eq('assessment_id', testAssessmentId);
      
      await supabase
        .from('assessments')
        .delete()
        .eq('id', testAssessmentId);
    }
  });
});

describe('Recommendations Table', () => {
  describe('Success Scenarios', () => {
    test('should retrieve recommendations', async () => {
      // Get a completed assessment if exists
      const { data: assessments } = await supabase
        .from('assessments')
        .select('id')
        .eq('status', 'completed')
        .limit(1);

      if (assessments && assessments.length > 0) {
        const { data, error } = await supabase
          .from('recommendations')
          .select('*')
          .eq('assessment_id', assessments[0].id)
          .order('rank');

        expect(error).toBeNull();
        if (data && data.length > 0) {
          expect(data[0].rank).toBe(1);
          expect(data[0]).toHaveProperty('score');
          expect(data[0]).toHaveProperty('match_percentage');
        }
      }
    });
  });
});

describe('Feedback Table', () => {
  describe('Success Scenarios', () => {
    test('should create feedback', async () => {
      const { data, error } = await supabase
        .from('feedback')
        .insert({
          rating: 5,
          comment: 'Test feedback',
          helpful: true
        })
        .select()
        .single();

      expect(error).toBeNull();
      expect(data.rating).toBe(5);

      // Cleanup
      await supabase.from('feedback').delete().eq('id', data.id);
    });

    test('should enforce rating constraints (1-5)', async () => {
      const { error } = await supabase
        .from('feedback')
        .insert({
          rating: 6 // Invalid
        });

      expect(error).toBeDefined();
    });
  });
});

describe('Network Error Handling', () => {
  test('should handle timeout gracefully', async () => {
    // Create a client with very short timeout
    const { createClient } = require('@supabase/supabase-js');
    const shortTimeoutClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        global: {
          fetch: (url, options) => {
            return Promise.race([
              fetch(url, options),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 1)
              )
            ]);
          }
        }
      }
    );

    const { error } = await shortTimeoutClient
      .from('departments')
      .select('*');

    expect(error).toBeDefined();
  }, 10000);
});

describe('Permission and RLS Tests', () => {
  test('should allow public read on departments', async () => {
    const { data, error } = await supabase
      .from('departments')
      .select('*');

    expect(error).toBeNull();
    expect(data).toBeDefined();
  });

  test('should allow public read on questions', async () => {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('is_active', true);

    expect(error).toBeNull();
    expect(data).toBeDefined();
  });

  test('should allow public insert on assessments', async () => {
    const { data, error } = await supabase
      .from('assessments')
      .insert({
        student_id: testUtils.randomStudentId(),
        student_name: 'RLS Test',
        student_email: testUtils.randomEmail(),
        status: 'in_progress'
      })
      .select()
      .single();

    expect(error).toBeNull();
    expect(data).toBeDefined();

    // Cleanup
    await supabase.from('assessments').delete().eq('id', data.id);
  });
});

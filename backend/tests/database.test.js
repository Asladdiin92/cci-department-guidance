/**
 * Database Integration Tests
 * Tests RLS policies, connection, and data operations
 */

const { supabase, supabaseAdmin } = require('../src/config/supabase');

describe('Database Connection & RLS Tests', () => {
  
  // ================================================================
  // Connection Tests
  // ================================================================
  
  describe('Database Connection', () => {
    it('should connect to Supabase successfully', async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('count')
        .limit(1);
      
      expect(error).toBeNull();
      expect(data).toBeDefined();
    });

    it('should have admin client for system operations', async () => {
      const { data, error } = await supabaseAdmin
        .from('assessments')
        .select('count')
        .limit(1);
      
      expect(error).toBeNull();
      expect(data).toBeDefined();
    });
  });

  // ================================================================
  // Table Schema Tests
  // ================================================================
  
  describe('Table Schema Validation', () => {
    
    it('departments table should have expected structure', async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .limit(1)
        .single();
      
      expect(error).toBeNull();
      expect(data).toHaveProperty('code');
      expect(data).toHaveProperty('name');
      expect(data).toHaveProperty('description');
      expect(data).toHaveProperty('strengths');
      expect(data).toHaveProperty('career_paths');
      expect(data).toHaveProperty('color');
      expect(data).toHaveProperty('icon');
    });

    it('questions table should have expected structure', async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .single();
      
      expect(error).toBeNull();
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('text');
      expect(data).toHaveProperty('category');
      expect(data).toHaveProperty('difficulty');
      expect(data).toHaveProperty('order_index');
      expect(data).toHaveProperty('is_active');
    });

    it('assessments table should have student_id column', async () => {
      const { data, error } = await supabaseAdmin
        .from('assessments')
        .select('id, student_id, student_name, student_email, session_token, started_at, completed_at')
        .limit(1);
      
      expect(error).toBeNull();
      expect(data).toBeDefined();
      // If there's data, check the structure
      if (data && data.length > 0) {
        expect(data[0]).toHaveProperty('student_id');
        expect(data[0]).toHaveProperty('session_token');
      }
    });

    it('question_options table should have scores JSONB', async () => {
      const { data, error } = await supabase
        .from('question_options')
        .select('id, text, scores')
        .limit(1)
        .single();
      
      expect(error).toBeNull();
      expect(data).toHaveProperty('scores');
      expect(typeof data.scores).toBe('object');
    });
  });

  // ================================================================
  // RLS Policy Tests
  // ================================================================
  
  describe('Row Level Security (RLS)', () => {
    
    it('departments should be publicly readable', async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('*');
      
      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('questions should be publicly readable', async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('is_active', true);
      
      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThan(0);
    });

    it('question_options should be publicly readable', async () => {
      const { data, error } = await supabase
        .from('question_options')
        .select('*')
        .limit(10);
      
      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThan(0);
    });

    it('assessments should allow inserts with anon key', async () => {
      const testStudent = {
        student_id: `RLS_TEST/${Date.now()}`,
        student_name: 'RLS Test Student',
        student_email: `rls_test${Date.now()}@test.com`,
        session_token: 'test-token-' + Date.now(),
        started_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('assessments')
        .insert(testStudent)
        .select()
        .single();
      
      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.student_id).toBe(testStudent.student_id);

      // Cleanup
      if (data) {
        await supabaseAdmin
          .from('assessments')
          .delete()
          .eq('id', data.id);
      }
    });
  });

  // ================================================================
  // Data Read Operations
  // ================================================================
  
  describe('Database Read Operations', () => {
    
    it('should fetch all departments with pagination', async () => {
      const { data, error, count } = await supabase
        .from('departments')
        .select('*', { count: 'exact' })
        .order('name', { ascending: true });
      
      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBe(6);
      expect(count).toBe(6);
    });

    it('should handle empty result sets gracefully', async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('code', 'NONEXISTENT');
      
      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBe(0);
    });

    it('should fetch questions with related options', async () => {
      const { data, error } = await supabase
        .from('questions')
        .select(`
          id,
          text,
          question_options (
            id,
            text,
            scores
          )
        `)
        .eq('is_active', true)
        .limit(1)
        .single();
      
      expect(error).toBeNull();
      expect(data).toHaveProperty('question_options');
      expect(Array.isArray(data.question_options)).toBe(true);
      expect(data.question_options.length).toBeGreaterThan(0);
    });

    it('should count assessments efficiently', async () => {
      const { count, error } = await supabase
        .from('assessments')
        .select('*', { count: 'exact', head: true });
      
      expect(error).toBeNull();
      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });

    it('should handle null values in optional fields', async () => {
      const { data, error } = await supabaseAdmin
        .from('assessments')
        .select('student_id, student_name')
        .limit(10);
      
      expect(error).toBeNull();
      expect(data).toBeDefined();
      
      // Check that null values don't break queries
      data.forEach(assessment => {
        expect(assessment).toHaveProperty('student_id');
        // student_id can be null for old records
      });
    });

    it('should handle large datasets with limits', async () => {
      const LIMIT = 100;
      const { data, error } = await supabase
        .from('assessments')
        .select('id, started_at')
        .order('started_at', { ascending: false })
        .limit(LIMIT);
      
      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeLessThanOrEqual(LIMIT);
    });
  });

  // ================================================================
  // Error Handling Tests
  // ================================================================
  
  describe('Database Error Handling', () => {
    
    it('should handle invalid table names', async () => {
      const { data, error } = await supabase
        .from('nonexistent_table')
        .select('*');
      
      expect(error).not.toBeNull();
      expect(data).toBeNull();
    });

    it('should handle invalid column names', async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('nonexistent_column');
      
      expect(error).not.toBeNull();
    });

    it('should handle malformed filters', async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('code', undefined);
      
      // Should handle gracefully
      expect(data).toBeDefined();
    });

    it('should timeout on extremely slow queries', async () => {
      // This test verifies timeout handling exists
      const startTime = Date.now();
      
      const { data, error } = await supabase
        .from('assessments')
        .select('*');
      
      const duration = Date.now() - startTime;
      
      // Should return in reasonable time (< 5 seconds)
      expect(duration).toBeLessThan(5000);
    }, 10000);
  });

  // ================================================================
  // Data Integrity Tests
  // ================================================================
  
  describe('Data Integrity', () => {
    
    it('all departments should have required fields filled', async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('*');
      
      expect(error).toBeNull();
      
      data.forEach(dept => {
        expect(dept.code).toBeTruthy();
        expect(dept.name).toBeTruthy();
        expect(dept.description).toBeTruthy();
        expect(Array.isArray(dept.strengths)).toBe(true);
        expect(Array.isArray(dept.career_paths)).toBe(true);
      });
    });

    it('all active questions should have options', async () => {
      const { data, error } = await supabase
        .from('questions')
        .select(`
          id,
          text,
          question_options (id)
        `)
        .eq('is_active', true);
      
      expect(error).toBeNull();
      
      data.forEach(question => {
        expect(question.question_options.length).toBeGreaterThan(0);
      });
    });

    it('all question options should have valid scores', async () => {
      const { data, error } = await supabase
        .from('question_options')
        .select('id, text, scores');
      
      expect(error).toBeNull();
      
      data.forEach(option => {
        expect(option.scores).toBeTruthy();
        expect(typeof option.scores).toBe('object');
        
        // Should have scores for all 6 departments
        const departments = ['CS', 'SWE', 'IT', 'IS', 'ISC', 'STAT'];
        departments.forEach(dept => {
          expect(option.scores).toHaveProperty(dept);
          expect(typeof option.scores[dept]).toBe('number');
        });
      });
    });
  });
});

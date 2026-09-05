/**
 * Zod Validation Schemas for Admin API Responses
 * Ensures consistent data types and structure
 */

const { z } = require('zod');

// Stats Response Schema
const statsSchema = z.object({
  total_assessments: z.number().int().nonnegative(),
  completed_assessments: z.number().int().nonnegative(),
  total_feedback: z.number().int().nonnegative(),
  active_questions: z.number().int().nonnegative(),
  average_rating: z.number().min(0).max(5),
  completion_rate: z.number().int().min(0).max(100)
});

// Analytics Response Schemas
const departmentDistributionSchema = z.object({
  department: z.string(),
  code: z.string(),
  count: z.number().int().nonnegative(),
  color: z.string()
});

const questionAffinitySchema = z.object({
  question_id: z.string(),
  question_text: z.string(),
  category: z.string(),
  response_count: z.number().int().nonnegative()
});

const completionTrendSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  count: z.number().int().nonnegative()
});

const analyticsSchema = z.object({
  department_distribution: z.array(departmentDistributionSchema),
  question_affinity: z.array(questionAffinitySchema),
  completion_trend: z.array(completionTrendSchema)
});

// Submissions Response Schema
const submissionSchema = z.object({
  id: z.string().uuid(),
  student_name: z.string(),
  student_email: z.string().email().or(z.literal('N/A')),
  started_at: z.string().datetime(),
  completed_at: z.string().datetime(),
  top_department: z.string(),
  top_department_code: z.string().optional(),
  match_percentage: z.number().int().min(0).max(100),
  total_recommendations: z.number().int().nonnegative()
});

const paginationSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative()
});

const submissionsSchema = z.object({
  submissions: z.array(submissionSchema),
  pagination: paginationSchema
});

// Validation middleware factory
const validateResponse = (schema) => {
  return (data) => {
    try {
      return schema.parse(data);
    } catch (error) {
      console.error('❌ Response validation failed:', error.errors);
      throw new Error(`Invalid response structure: ${error.message}`);
    }
  };
};

module.exports = {
  statsSchema,
  analyticsSchema,
  submissionsSchema,
  validateResponse,
  // Export individual schemas for testing
  departmentDistributionSchema,
  questionAffinitySchema,
  completionTrendSchema,
  submissionSchema,
  paginationSchema
};

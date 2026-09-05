/**
 * Admin Routes
 * Admin-only endpoints for managing questions and system
 */

const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../config/supabase');
const { successResponse, createdResponse } = require('../utils/response');
const { validate, schemas, validateUUID } = require('../middleware/validator');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const {
  statsSchema,
  analyticsSchema,
  submissionsSchema,
  validateResponse
} = require('../validators/adminSchemas');

// Note: All admin routes are now public (JWT auth removed per project requirements)

/**
 * @route   GET /api/admin/questions
 * @desc    List all questions with options
 * @access  Private (Admin)
 */
router.get(
  '/questions',
  asyncHandler(async (req, res, next) => {
    const { data: questions, error } = await supabaseAdmin
      .from('questions')
      .select(`
        *,
        question_options (
          id,
          text,
          scores,
          order_index
        )
      `)
      .order('order_index', { ascending: true });

    if (error) {
      throw new AppError('Failed to fetch questions', 500);
    }

    return successResponse(res, {
      questions: questions || [],
      total: questions?.length || 0
    });
  })
);

/**
 * @route   GET /api/admin/questions/:id
 * @desc    Get single question
 * @access  Private (Admin)
 */
router.get(
  '/questions/:id',
  validateUUID('id'),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const { data: question, error } = await supabaseAdmin
      .from('questions')
      .select(`
        *,
        question_options (
          id,
          text,
          scores,
          order_index
        )
      `)
      .eq('id', id)
      .single();

    if (error || !question) {
      throw new AppError('Question not found', 404);
    }

    return successResponse(res, question);
  })
);

/**
 * @route   PUT /api/admin/questions/:id
 * @desc    Update question
 * @access  Private (Admin)
 */
router.put(
  '/questions/:id',
  validateUUID('id'),
  validate(schemas.updateQuestion),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;

    // Update question
    const { data: question, error } = await supabaseAdmin
      .from('questions')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new AppError('Failed to update question', 500);
    }

    if (!question) {
      throw new AppError('Question not found', 404);
    }

    return successResponse(res, question, 'Question updated successfully');
  })
);

/**
 * @route   POST /api/admin/questions
 * @desc    Create new question
 * @access  Private (Super Admin only)
 */
router.post(
  '/questions',
  asyncHandler(async (req, res, next) => {
    const { text, category, difficulty, order_index, is_active } = req.body;

    const { data: question, error} = await supabaseAdmin
      .from('questions')
      .insert({
        text,
        category,
        difficulty,
        order_index,
        is_active: is_active !== undefined ? is_active : true
      })
      .select()
      .single();

    if (error) {
      throw new AppError('Failed to create question', 500, { dbError: error.message });
    }

    return createdResponse(res, question, 'Question created successfully');
  })
);

/**
 * @route   DELETE /api/admin/questions/:id
 * @desc    Delete question
 * @access  Private (Super Admin only)
 */
router.delete(
  '/questions/:id',
  validateUUID('id'),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('questions')
      .delete()
      .eq('id', id);

    if (error) {
      throw new AppError('Failed to delete question', 500);
    }

    return successResponse(res, null, 'Question deleted successfully');
  })
);

/**
 * @route   GET /api/admin/stats
 * @desc    Get system statistics
 * @access  Private (Admin)
 */
router.get(
  '/stats',
  asyncHandler(async (req, res, next) => {
    // Get counts
    const { count: assessmentsCount } = await supabaseAdmin
      .from('assessments')
      .select('*', { count: 'exact', head: true });

    const { count: completedCount } = await supabaseAdmin
      .from('assessments')
      .select('*', { count: 'exact', head: true })
      .not('completed_at', 'is', null);

    const { count: feedbackCount } = await supabaseAdmin
      .from('feedback')
      .select('*', { count: 'exact', head: true });

    const { count: questionsCount } = await supabaseAdmin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    // Get average rating
    const { data: ratings } = await supabaseAdmin
      .from('feedback')
      .select('rating');

    const avgRating = ratings && ratings.length > 0
      ? ratings.reduce((sum, f) => sum + f.rating, 0) / ratings.length
      : 0;

    return successResponse(res, {
      total_assessments: assessmentsCount || 0,
      completed_assessments: completedCount || 0,
      total_feedback: feedbackCount || 0,
      active_questions: questionsCount || 0,
      average_rating: Math.round(avgRating * 10) / 10,
      completion_rate: assessmentsCount > 0 
        ? Math.round((completedCount / assessmentsCount) * 100) 
        : 0
    });
  })
);

/**
 * @route   GET /api/admin/submissions
 * @desc    Get all student submissions with pagination and search
 * @access  Private (Admin)
 */
router.get(
  '/submissions',
  asyncHandler(async (req, res, next) => {
    const { 
      page = 1, 
      limit = 10, 
      search = '',
      sortBy = 'completed_at',
      sortOrder = 'desc'
    } = req.query;

    const offset = (page - 1) * limit;

    // Build query
    let query = supabaseAdmin
      .from('assessments')
      .select(`
        id,
        student_name,
        student_email,
        started_at,
        completed_at,
        recommendations (
          department_id,
          rank,
          match_percentage
        )
      `, { count: 'exact' })
      .not('completed_at', 'is', null);

    // Add search filter
    if (search) {
      query = query.or(`student_name.ilike.%${search}%,student_email.ilike.%${search}%`);
    }

    // Add sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Add pagination
    query = query.range(offset, offset + parseInt(limit) - 1);

    const { data: submissions, error, count } = await query;

    if (error) {
      throw new AppError('Failed to fetch submissions', 500, { dbError: error.message });
    }

    // Get department names for recommendations
    const departmentCodes = [...new Set(
      submissions.flatMap(s => s.recommendations.map(r => r.department_id))
    )];

    const { data: departments } = await supabaseAdmin
      .from('departments')
      .select('code, name')
      .in('code', departmentCodes);

    // Enrich submissions with department names
    const enrichedSubmissions = submissions.map(submission => {
      const topRecommendation = submission.recommendations
        .sort((a, b) => a.rank - b.rank)[0];
      
      const department = (departments || []).find(d => d.code === topRecommendation?.department_id);
      
      return {
        id: submission.id,
        student_name: submission.student_name || 'Anonymous',
        student_email: submission.student_email || 'N/A',
        started_at: submission.started_at,
        completed_at: submission.completed_at,
        top_department: department?.name || topRecommendation?.department_id || 'N/A',
        top_department_code: topRecommendation?.department_id,
        match_percentage: topRecommendation?.match_percentage || 0,
        total_recommendations: submission.recommendations.length
      };
    });

    return successResponse(res, {
      submissions: enrichedSubmissions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0,
        totalPages: Math.ceil((count || 0) / parseInt(limit))
      }
    });
  })
);

/**
 * @route   GET /api/admin/analytics
 * @desc    Get analytics data for charts
 * @access  Private (Admin)
 */
router.get(
  '/analytics',
  asyncHandler(async (req, res, next) => {
    // Get department distribution
    const { data: recommendations } = await supabaseAdmin
      .from('recommendations')
      .select('department_id, rank')
      .eq('rank', 1); // Only top recommendations

    // Count by department
    const departmentCounts = {};
    (recommendations || []).forEach(rec => {
      departmentCounts[rec.department_id] = (departmentCounts[rec.department_id] || 0) + 1;
    });

    // Get department names
    const { data: departments } = await supabaseAdmin
      .from('departments')
      .select('code, name, color');

    const departmentDistribution = Object.entries(departmentCounts).map(([code, count]) => {
      const dept = (departments || []).find(d => d.code === code);
      return {
        department: dept?.name || code,
        code,
        count,
        color: dept?.color || '#cccccc'
      };
    }).sort((a, b) => b.count - a.count);

    // Get question affinity (questions with highest engagement/completion)
    const { data: responses } = await supabaseAdmin
      .from('assessment_responses')
      .select(`
        question_id,
        questions (
          id,
          text,
          category
        )
      `);

    // Count responses per question
    const questionCounts = {};
    (responses || []).forEach(resp => {
      const qId = resp.question_id;
      if (qId) {
        questionCounts[qId] = (questionCounts[qId] || 0) + 1;
      }
    });

    // Get top 10 questions
    const questionAffinity = Object.entries(questionCounts)
      .map(([qId, count]) => {
        const response = (responses || []).find(r => r.question_id === qId);
        return {
          question_id: qId,
          question_text: response?.questions?.text || 'Unknown',
          category: response?.questions?.category || 'N/A',
          response_count: count
        };
      })
      .sort((a, b) => b.response_count - a.response_count)
      .slice(0, 10);

    // Get completion trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: completions } = await supabaseAdmin
      .from('assessments')
      .select('completed_at')
      .not('completed_at', 'is', null)
      .gte('completed_at', thirtyDaysAgo.toISOString());

    // Group by date
    const completionsByDate = {};
    (completions || []).forEach(assessment => {
      const date = new Date(assessment.completed_at).toISOString().split('T')[0];
      completionsByDate[date] = (completionsByDate[date] || 0) + 1;
    });

    const completionTrend = Object.entries(completionsByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return successResponse(res, {
      department_distribution: departmentDistribution,
      question_affinity: questionAffinity,
      completion_trend: completionTrend
    });
  })
);

module.exports = router;

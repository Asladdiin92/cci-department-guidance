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
    try {
      // Get counts with better error handling
      const { count: assessmentsCount, error: e1 } = await supabaseAdmin
        .from('assessments')
        .select('*', { count: 'exact', head: true });

      const { count: completedCount, error: e2 } = await supabaseAdmin
        .from('assessments')
        .select('*', { count: 'exact', head: true })
        .not('completed_at', 'is', null);

      const { count: feedbackCount, error: e3 } = await supabaseAdmin
        .from('feedback')
        .select('*', { count: 'exact', head: true });

      const { count: questionsCount, error: e4 } = await supabaseAdmin
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Check for errors
      if (e1 || e2 || e3 || e4) {
        console.error('Stats query errors:', { e1, e2, e3, e4 });
        throw new AppError('Failed to fetch statistics', 500);
      }

      // Get average rating safely
      const { data: ratings, error: e5 } = await supabaseAdmin
        .from('feedback')
        .select('rating');

      const avgRating = ratings && ratings.length > 0
        ? ratings.reduce((sum, f) => sum + (f.rating || 0), 0) / ratings.length
        : 0;

      const stats = {
        total_assessments: assessmentsCount || 0,
        completed_assessments: completedCount || 0,
        total_feedback: feedbackCount || 0,
        active_questions: questionsCount || 0,
        average_rating: Math.round(avgRating * 10) / 10,
        completion_rate: assessmentsCount > 0 
          ? Math.round((completedCount / assessmentsCount) * 100) 
          : 0
      };

      console.log('Admin stats:', stats);
      return successResponse(res, stats);
    } catch (error) {
      console.error('Stats endpoint error:', error);
      throw new AppError('Failed to fetch statistics', 500, { error: error.message });
    }
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
    try {
      const { 
        page = 1, 
        limit = 10, 
        search = '',
        sortBy = 'completed_at',
        sortOrder = 'desc'
      } = req.query;

      const offset = (parseInt(page) - 1) * parseInt(limit);

      // Build query
      let query = supabaseAdmin
        .from('assessments')
        .select(`
          id,
          student_id,
          student_name,
          student_email,
          started_at,
          completed_at,
          status,
          top_match_department
        `, { count: 'exact' })
        .not('completed_at', 'is', null);

      // Add search filter
      if (search && search.trim()) {
        query = query.or(`student_name.ilike.%${search}%,student_email.ilike.%${search}%,student_id.ilike.%${search}%`);
      }

      // Add sorting - validate sortBy to prevent SQL injection
      const validSortFields = ['completed_at', 'started_at', 'student_name', 'student_email'];
      const safeSortBy = validSortFields.includes(sortBy) ? sortBy : 'completed_at';
      query = query.order(safeSortBy, { ascending: sortOrder === 'asc' });

      // Add pagination
      query = query.range(offset, offset + parseInt(limit) - 1);

      const { data: submissions, error, count } = await query;

      if (error) {
        console.error('Submissions query error:', error);
        throw new AppError('Failed to fetch submissions', 500, { dbError: error.message });
      }

      // Get department names for all possible matches
      const { data: departments, error: deptError } = await supabaseAdmin
        .from('departments')
        .select('code, name');

      if (deptError) {
        console.error('Departments query error:', deptError);
      }

      // Enrich submissions with department names
      const enrichedSubmissions = (submissions || []).map(submission => {
        const deptCode = submission.top_match_department;
        const department = (departments || []).find(d => d.code === deptCode);
        
        return {
          id: submission.id,
          student_id: submission.student_id || 'N/A',
          student_name: submission.student_name || 'Anonymous',
          student_email: submission.student_email || 'N/A',
          started_at: submission.started_at,
          completed_at: submission.completed_at,
          status: submission.status || 'completed',
          top_department: department?.name || deptCode || 'N/A',
          top_department_code: deptCode
        };
      });

      const result = {
        submissions: enrichedSubmissions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count || 0,
          totalPages: Math.ceil((count || 0) / parseInt(limit))
        }
      };

      console.log('Submissions:', {
        returned: enrichedSubmissions.length,
        total: count,
        page: parseInt(page)
      });

      return successResponse(res, result);
    } catch (error) {
      console.error('Submissions endpoint error:', error);
      throw new AppError('Failed to fetch submissions', 500, { error: error.message });
    }
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
    try {
      // Get department distribution with error handling
      const { data: recommendations, error: recError } = await supabaseAdmin
        .from('recommendations')
        .select('department_id, rank')
        .eq('rank', 1); // Only top recommendations

      if (recError) {
        console.error('Recommendations query error:', recError);
      }

      // Count by department
      const departmentCounts = {};
      (recommendations || []).forEach(rec => {
        if (rec.department_id) {
          departmentCounts[rec.department_id] = (departmentCounts[rec.department_id] || 0) + 1;
        }
      });

      // Get department names
      const { data: departments, error: deptError } = await supabaseAdmin
        .from('departments')
        .select('code, name, color');

      if (deptError) {
        console.error('Departments query error:', deptError);
      }

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
      const { data: responses, error: respError } = await supabaseAdmin
        .from('assessment_responses')
        .select(`
          question_id,
          questions (
            id,
            text,
            category
          )
        `);

      if (respError) {
        console.error('Responses query error:', respError);
      }

      // Count responses per question
      const questionCounts = {};
      (responses || []).forEach(resp => {
        const qId = resp?.question_id;
        if (qId) {
          questionCounts[qId] = (questionCounts[qId] || 0) + 1;
        }
      });

      // Get top 10 questions
      const questionAffinity = Object.entries(questionCounts)
        .map(([qId, count]) => {
          const response = (responses || []).find(r => r.question_id === qId);
          const questionText = response?.questions?.text || 'Unknown Question';
          return {
            question_id: qId,
            question_text: questionText.length > 50 ? questionText.substring(0, 47) + '...' : questionText,
            category: response?.questions?.category || 'N/A',
            response_count: count
          };
        })
        .sort((a, b) => b.response_count - a.response_count)
        .slice(0, 10);

      // Get completion trends (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: completions, error: compError } = await supabaseAdmin
        .from('assessments')
        .select('completed_at')
        .not('completed_at', 'is', null)
        .gte('completed_at', thirtyDaysAgo.toISOString());

      if (compError) {
        console.error('Completions query error:', compError);
      }

      // Group by date
      const completionsByDate = {};
      (completions || []).forEach(assessment => {
        if (assessment.completed_at) {
          const date = new Date(assessment.completed_at).toISOString().split('T')[0];
          completionsByDate[date] = (completionsByDate[date] || 0) + 1;
        }
      });

      const completionTrend = Object.entries(completionsByDate)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      const analyticsData = {
        department_distribution: departmentDistribution,
        question_affinity: questionAffinity,
        completion_trend: completionTrend
      };

      console.log('Analytics data:', {
        departments: departmentDistribution.length,
        questions: questionAffinity.length,
        trends: completionTrend.length
      });

      return successResponse(res, analyticsData);
    } catch (error) {
      console.error('Analytics endpoint error:', error);
      throw new AppError('Failed to fetch analytics', 500, { error: error.message });
    }
  })
);

module.exports = router;

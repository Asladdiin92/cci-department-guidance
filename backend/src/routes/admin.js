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
const { authenticateAdmin, requireRole } = require('../middleware/auth');

// All admin routes require authentication
router.use(authenticateAdmin);

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
  requireRole('super_admin'),
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
  requireRole('super_admin'),
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

module.exports = router;

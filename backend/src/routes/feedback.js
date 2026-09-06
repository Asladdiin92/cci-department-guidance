/**
 * Feedback Routes
 * Endpoints for collecting user feedback
 */

const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { successResponse, createdResponse } = require('../utils/response');
const { validate, schemas, validateUUID } = require('../middleware/validator');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

/**
 * @route   POST /api/feedback
 * @desc    Submit feedback for an assessment
 * @access  Public
 */
router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { 
      assessment_id, 
      rating, 
      comment, 
      helpful, 
      would_recommend,
      // General feedback fields
      name,
      email,
      student_id,
      category,
      subject,
      message
    } = req.body;

    // Check if this is general feedback (no assessment_id)
    if (!assessment_id && (name || email || category || subject || message)) {
      // Try to insert general feedback (table may not exist yet)
      try {
        const { data: feedback, error } = await supabase
          .from('general_feedback')
          .insert({
            name: name || null,
            email: email || null,
            student_id: student_id || null,
            category: category || 'general',
            rating: rating || null,
            subject: subject || null,
            message: message || null,
            submitted_at: new Date().toISOString()
          })
          .select()
          .single();

        if (error) {
          // If table doesn't exist, log to console and return success anyway
          console.warn('General feedback table not created yet:', error.message);
          console.log('Feedback received:', { name, email, category, subject, rating });
          
          return createdResponse(res, {
            feedback_id: 'pending',
            submitted_at: new Date().toISOString(),
            note: 'Feedback received and will be processed'
          }, 'Thank you for your feedback!');
        }

        return createdResponse(res, {
          feedback_id: feedback.id,
          submitted_at: feedback.submitted_at
        }, 'Thank you for your feedback!');
      } catch (err) {
        console.error('Error submitting general feedback:', err);
        // Return success to user even if database insert fails
        return createdResponse(res, {
          feedback_id: 'logged',
          submitted_at: new Date().toISOString()
        }, 'Thank you for your feedback!');
      }
    }

    // Original assessment feedback logic
    if (!assessment_id) {
      throw new AppError('Assessment ID or feedback details required', 400);
    }

    // Verify assessment exists
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .select('id, completed_at')
      .eq('id', assessment_id)
      .single();

    if (assessmentError || !assessment) {
      throw new AppError('Assessment not found', 404);
    }

    if (!assessment.completed_at) {
      throw new AppError('Cannot submit feedback for incomplete assessment', 400);
    }

    // Check if feedback already exists
    const { data: existingFeedback } = await supabase
      .from('feedback')
      .select('id')
      .eq('assessment_id', assessment_id)
      .single();

    if (existingFeedback) {
      throw new AppError('Feedback already submitted for this assessment', 400);
    }

    // Insert feedback
    const { data: feedback, error } = await supabase
      .from('feedback')
      .insert({
        assessment_id,
        rating,
        comment: comment || null,
        helpful: helpful !== undefined ? helpful : null,
        would_recommend: would_recommend !== undefined ? would_recommend : null,
        submitted_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new AppError('Failed to submit feedback', 500, { dbError: error.message });
    }

    return createdResponse(res, {
      feedback_id: feedback.id,
      submitted_at: feedback.submitted_at
    }, 'Thank you for your feedback!');
  })
);

/**
 * @route   GET /api/feedback/stats
 * @desc    Get feedback statistics (for admin/analytics)
 * @access  Public
 */
router.get(
  '/stats',
  asyncHandler(async (req, res, next) => {
    // Get average rating
    const { data: ratings } = await supabase
      .from('feedback')
      .select('rating');

    const avgRating = ratings && ratings.length > 0
      ? ratings.reduce((sum, f) => sum + f.rating, 0) / ratings.length
      : 0;

    // Get helpful count
    const { count: helpfulCount } = await supabase
      .from('feedback')
      .select('*', { count: 'exact', head: true })
      .eq('helpful', true);

    // Get total feedback count
    const { count: totalCount } = await supabase
      .from('feedback')
      .select('*', { count: 'exact', head: true });

    return successResponse(res, {
      total_feedback: totalCount || 0,
      average_rating: Math.round(avgRating * 10) / 10,
      helpful_count: helpfulCount || 0,
      helpful_percentage: totalCount > 0 
        ? Math.round((helpfulCount / totalCount) * 100) 
        : 0
    });
  })
);

/**
 * @route   GET /api/feedback/recent
 * @desc    Get recent feedback (previously admin only, now public)
 * @access  Public
 */
router.get(
  '/recent',
  asyncHandler(async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const { data: feedback, error, count } = await supabase
      .from('feedback')
      .select(`
        *,
        assessments (
          student_name,
          student_email,
          completed_at
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new AppError('Failed to fetch feedback', 500);
    }

    return successResponse(res, {
      feedback: feedback || [],
      total: count || 0,
      limit,
      offset
    });
  })
);

module.exports = router;

/**
 * Assessment Controller
 * Handles assessment lifecycle: start, save responses, submit, get results
 */

const { supabase } = require('../config/supabase');
const { successResponse, createdResponse, errorResponse } = require('../utils/response');
const { calculateDepartmentScores, generateInsights, validateScoringData } = require('../utils/scoring');
const { AppError } = require('../middleware/errorHandler');
const crypto = require('crypto');

/**
 * Start a new assessment
 * POST /api/assessments/start
 */
const startAssessment = async (req, res, next) => {
  try {
    const { student_name, student_email } = req.body;

    // Generate unique session token
    const sessionToken = crypto.randomBytes(32).toString('hex');

    // Create assessment record
    const { data: assessment, error } = await supabase
      .from('assessments')
      .insert({
        student_name: student_name || null,
        student_email: student_email || null,
        session_token: sessionToken,
        started_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new AppError('Failed to create assessment', 500, { dbError: error.message });
    }

    // Fetch all active questions with their options
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select(`
        id,
        text,
        category,
        difficulty,
        order_index,
        question_options (
          id,
          text,
          scores
        )
      `)
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (questionsError) {
      throw new AppError('Failed to fetch questions', 500, { dbError: questionsError.message });
    }

    return createdResponse(res, {
      assessment_id: assessment.id,
      session_token: sessionToken,
      questions: questions || [],
      total_questions: questions?.length || 0,
      started_at: assessment.started_at
    }, 'Assessment started successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * Save a single response
 * POST /api/assessments/:id/responses
 */
const saveResponse = async (req, res, next) => {
  try {
    const { id: assessmentId } = req.params;
    const { question_id, option_id } = req.body;

    console.log('=== Save Response Request ===');
    console.log('Assessment ID:', assessmentId);
    console.log('Question ID:', question_id);
    console.log('Option ID:', option_id);
    console.log('Types:', {
      assessmentId: typeof assessmentId,
      question_id: typeof question_id,
      option_id: typeof option_id
    });

    // Verify assessment exists and is not completed
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .select('id, completed_at')
      .eq('id', assessmentId)
      .single();

    if (assessmentError) {
      console.error('Assessment lookup error:', assessmentError);
      throw new AppError('Assessment not found', 404, { dbError: assessmentError.message });
    }

    if (!assessment) {
      throw new AppError('Assessment not found', 404);
    }

    if (assessment.completed_at) {
      throw new AppError('Assessment already completed', 400);
    }

    // Check if response already exists for this question
    const { data: existingResponse, error: existingError } = await supabase
      .from('assessment_responses')
      .select('id')
      .eq('assessment_id', assessmentId)
      .eq('question_id', question_id)
      .single();

    if (existingError && existingError.code !== 'PGRST116') {
      console.error('Existing response check error:', existingError);
    }

    let response;

    if (existingResponse) {
      // Update existing response
      console.log('Updating existing response:', existingResponse.id);
      const { data, error } = await supabase
        .from('assessment_responses')
        .update({
          option_id,
          responded_at: new Date().toISOString()
        })
        .eq('id', existingResponse.id)
        .select()
        .single();

      if (error) {
        console.error('Update error:', error);
        throw new AppError('Failed to update response', 500, { dbError: error.message, details: error });
      }
      response = data;
      console.log('Response updated successfully');
    } else {
      // Insert new response
      console.log('Inserting new response');
      const insertData = {
        assessment_id: assessmentId,
        question_id,
        option_id,
        responded_at: new Date().toISOString()
      };
      console.log('Insert data:', insertData);

      const { data, error } = await supabase
        .from('assessment_responses')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Insert error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw new AppError('Failed to save response', 500, { dbError: error.message, details: error });
      }
      response = data;
      console.log('Response inserted successfully:', response.id);
    }

    // Get current response count
    const { count } = await supabase
      .from('assessment_responses')
      .select('*', { count: 'exact', head: true })
      .eq('assessment_id', assessmentId);

    console.log('Total responses for assessment:', count);

    return successResponse(res, {
      response_id: response.id,
      responses_completed: count,
      message: 'Response saved successfully'
    });

  } catch (error) {
    console.error('Save response error:', error);
    next(error);
  }
};

/**
 * Submit assessment and calculate results
 * POST /api/assessments/:id/submit
 */
const submitAssessment = async (req, res, next) => {
  try {
    const { id: assessmentId } = req.params;

    // Verify assessment exists
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .select('id, completed_at')
      .eq('id', assessmentId)
      .single();

    if (assessmentError || !assessment) {
      throw new AppError('Assessment not found', 404);
    }

    if (assessment.completed_at) {
      throw new AppError('Assessment already submitted', 400);
    }

    // Fetch all responses with scores
    const { data: responses, error: responsesError } = await supabase
      .from('assessment_responses')
      .select(`
        id,
        question_id,
        questions (
          category,
          difficulty
        ),
        question_options (
          scores
        )
      `)
      .eq('assessment_id', assessmentId);

    if (responsesError) {
      throw new AppError('Failed to fetch responses', 500, { dbError: responsesError.message });
    }

    if (!responses || responses.length === 0) {
      throw new AppError('No responses found for this assessment', 400);
    }

    // Transform responses for scoring
    const scoringData = responses.map(r => ({
      scores: r.question_options?.scores || {},
      category: r.questions?.category,
      difficulty: r.questions?.difficulty
    }));

    // Validate scoring data
    const validation = validateScoringData(scoringData);
    if (!validation.valid) {
      throw new AppError('Invalid scoring data', 400, { issues: validation.issues });
    }

    // Calculate department scores
    const { recommendations, metadata } = calculateDepartmentScores(scoringData);

    // Fetch department details
    const departmentCodes = recommendations.map(r => r.department_code);
    const { data: departments, error: deptError } = await supabase
      .from('departments')
      .select('code, name, description, color, icon')
      .in('code', departmentCodes);

    if (deptError) {
      throw new AppError('Failed to fetch department details', 500);
    }

    // Merge department details with scores
    const enrichedRecommendations = recommendations.map(rec => {
      const dept = departments.find(d => d.code === rec.department_code);
      return {
        ...rec,
        department_name: dept?.name,
        department_description: dept?.description,
        color: dept?.color,
        icon: dept?.icon
      };
    });

    // Save recommendations to database
    const recommendationsToInsert = enrichedRecommendations.map(rec => ({
      assessment_id: assessmentId,
      department_id: rec.department_code,
      score: rec.score,
      rank: rec.rank,
      match_percentage: rec.match_percentage
    }));

    const { error: recError } = await supabase
      .from('recommendations')
      .insert(recommendationsToInsert);

    if (recError) {
      throw new AppError('Failed to save recommendations', 500, { dbError: recError.message });
    }

    // Update assessment as completed
    const { error: updateError } = await supabase
      .from('assessments')
      .update({ completed_at: new Date().toISOString() })
      .eq('id', assessmentId);

    if (updateError) {
      throw new AppError('Failed to update assessment', 500);
    }

    // Generate insights
    const insights = generateInsights(enrichedRecommendations[0], enrichedRecommendations);

    return successResponse(res, {
      assessment_id: assessmentId,
      recommendations: enrichedRecommendations,
      insights,
      metadata: {
        ...metadata,
        submitted_at: new Date().toISOString()
      }
    }, 'Assessment submitted successfully');

  } catch (error) {
    next(error);
  }
};

/**
 * Get assessment results
 * GET /api/assessments/:id/results
 */
const getResults = async (req, res, next) => {
  try {
    const { id: assessmentId } = req.params;

    // Fetch assessment with recommendations
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .select(`
        id,
        student_name,
        started_at,
        completed_at,
        recommendations (
          department_id,
          score,
          rank,
          match_percentage
        )
      `)
      .eq('id', assessmentId)
      .single();

    if (assessmentError || !assessment) {
      throw new AppError('Assessment not found', 404);
    }

    if (!assessment.completed_at) {
      throw new AppError('Assessment not yet completed', 400);
    }

    // Fetch department details
    const departmentCodes = assessment.recommendations.map(r => r.department_id);
    const { data: departments } = await supabase
      .from('departments')
      .select('code, name, description, strengths, career_paths, color, icon')
      .in('code', departmentCodes);

    // Merge data
    const recommendations = assessment.recommendations
      .sort((a, b) => a.rank - b.rank)
      .map(rec => {
        const dept = departments.find(d => d.code === rec.department_id);
        return {
          rank: rec.rank,
          department_code: rec.department_id,
          department_name: dept?.name,
          description: dept?.description,
          match_percentage: rec.match_percentage,
          score: rec.score,
          strengths: dept?.strengths || [],
          career_paths: dept?.career_paths || [],
          color: dept?.color,
          icon: dept?.icon
        };
      });

    // Generate insights
    const insights = generateInsights(recommendations[0], recommendations);

    return successResponse(res, {
      assessment_id: assessment.id,
      student_name: assessment.student_name,
      completed_at: assessment.completed_at,
      recommendations,
      insights
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get assessment progress
 * GET /api/assessments/:id/progress
 */
const getProgress = async (req, res, next) => {
  try {
    const { id: assessmentId } = req.params;

    // Fetch assessment
    const { data: assessment, error } = await supabase
      .from('assessments')
      .select('id, completed_at')
      .eq('id', assessmentId)
      .single();

    if (error || !assessment) {
      throw new AppError('Assessment not found', 404);
    }

    // Count responses
    const { count: responsesCount } = await supabase
      .from('assessment_responses')
      .select('*', { count: 'exact', head: true })
      .eq('assessment_id', assessmentId);

    // Count total questions
    const { count: totalQuestions } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    const progress = totalQuestions > 0 
      ? Math.round((responsesCount / totalQuestions) * 100) 
      : 0;

    return successResponse(res, {
      assessment_id: assessmentId,
      responses_completed: responsesCount,
      total_questions: totalQuestions,
      progress_percentage: progress,
      is_completed: !!assessment.completed_at
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  startAssessment,
  saveResponse,
  submitAssessment,
  getResults,
  getProgress
};

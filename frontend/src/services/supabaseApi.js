/**
 * Direct Supabase API - Fallback when backend is unavailable
 * This directly queries Supabase without the Node.js backend
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 1. Fetch all departments with their core courses
 */
export async function getDepartmentsFromSupabase() {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .order('code');
  
  if (error) throw new Error(`Failed to fetch departments: ${error.message}`);
  return data;
}

/**
 * 2. Fetch single department by code
 */
export async function getDepartmentFromSupabase(code) {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .eq('code', code)
    .single();
  
  if (error) throw new Error(`Failed to fetch department: ${error.message}`);
  return data;
}

/**
 * 3. Start new assessment - fetch all questions with options
 */
export async function startAssessmentFromSupabase(studentInfo) {
  // Generate assessment ID
  const assessmentId = crypto.randomUUID();
  const sessionToken = crypto.randomUUID();
  
  // Insert assessment record
  const { error: assessmentError } = await supabase
    .from('assessments')
    .insert({
      id: assessmentId,
      student_id: studentInfo.student_id,
      student_name: studentInfo.student_name,
      student_email: studentInfo.student_email,
      status: 'in_progress',
      session_token: sessionToken
    });
  
  if (assessmentError) {
    throw new Error(`Failed to create assessment: ${assessmentError.message}`);
  }
  
  // Fetch all questions with their options
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select(`
      id,
      text,
      category,
      question_order,
      question_options (
        id,
        text,
        option_order,
        cs_score,
        swe_score,
        it_score,
        is_score,
        isc_score,
        stat_score
      )
    `)
    .order('question_order');
  
  if (questionsError) {
    throw new Error(`Failed to fetch questions: ${questionsError.message}`);
  }
  
  // Transform to match frontend expectations
  const transformedQuestions = questions.map(q => ({
    id: q.id,
    question_text: q.text,
    text: q.text,
    category: q.category,
    question_order: q.question_order,
    options: (q.question_options || []).map(opt => ({
      id: opt.id,
      option_text: opt.text,
      text: opt.text,
      option_order: opt.option_order,
      cs_score: opt.cs_score,
      swe_score: opt.swe_score,
      it_score: opt.it_score,
      is_score: opt.is_score,
      isc_score: opt.isc_score,
      stat_score: opt.stat_score
    })).sort((a, b) => a.option_order - b.option_order)
  }));
  
  return {
    assessment_id: assessmentId,
    session_token: sessionToken,
    questions: transformedQuestions
  };
}

/**
 * 4. Save assessment response
 */
export async function saveResponseToSupabase(assessmentId, questionId, optionId) {
  const { error } = await supabase
    .from('assessment_responses')
    .insert({
      assessment_id: assessmentId,
      question_id: questionId,
      option_id: optionId
    });
  
  if (error) {
    throw new Error(`Failed to save response: ${error.message}`);
  }
  
  return { success: true };
}

/**
 * 5. Submit assessment and calculate results
 */
export async function submitAssessmentToSupabase(assessmentId, sessionToken) {
  // Fetch all responses with their scores
  const { data: responses, error: responsesError } = await supabase
    .from('assessment_responses')
    .select(`
      question_id,
      option_id,
      question_options (
        cs_score,
        swe_score,
        it_score,
        is_score,
        isc_score,
        stat_score
      )
    `)
    .eq('assessment_id', assessmentId);
  
  if (responsesError) {
    throw new Error(`Failed to fetch responses: ${responsesError.message}`);
  }
  
  // Calculate scores for each department
  const scores = {
    CS: 0,
    SWE: 0,
    IT: 0,
    IS: 0,
    ISC: 0,
    STAT: 0
  };
  
  responses.forEach(response => {
    const option = response.question_options;
    if (option) {
      scores.CS += option.cs_score || 0;
      scores.SWE += option.swe_score || 0;
      scores.IT += option.it_score || 0;
      scores.IS += option.is_score || 0;
      scores.ISC += option.isc_score || 0;
      scores.STAT += option.stat_score || 0;
    }
  });
  
  // Find top match
  const sortedScores = Object.entries(scores)
    .map(([code, score]) => ({ department_code: code, score }))
    .sort((a, b) => b.score - a.score);
  
  const topMatch = sortedScores[0];
  
  // Fetch department details
  const { data: department, error: deptError } = await supabase
    .from('departments')
    .select('*')
    .eq('code', topMatch.department_code)
    .single();
  
  if (deptError) {
    throw new Error(`Failed to fetch department: ${deptError.message}`);
  }
  
  // Update assessment status and save results
  const { error: updateError } = await supabase
    .from('assessments')
    .update({
      status: 'completed',
      top_match_department: topMatch.department_code,
      completed_at: new Date().toISOString()
    })
    .eq('id', assessmentId)
    .eq('session_token', sessionToken);
  
  if (updateError) {
    throw new Error(`Failed to update assessment: ${updateError.message}`);
  }
  
  return {
    assessment_id: assessmentId,
    top_match: {
      ...topMatch,
      department_name: department.name,
      department_description: department.description
    },
    scores: sortedScores,
    all_departments: sortedScores
  };
}

/**
 * 6. Get assessment results
 */
export async function getAssessmentResultsFromSupabase(assessmentId) {
  // Fetch assessment
  const { data: assessment, error: assessmentError } = await supabase
    .from('assessments')
    .select('*')
    .eq('id', assessmentId)
    .single();
  
  if (assessmentError) {
    throw new Error(`Failed to fetch assessment: ${assessmentError.message}`);
  }
  
  // Fetch responses with scores
  const { data: responses, error: responsesError } = await supabase
    .from('assessment_responses')
    .select(`
      question_id,
      option_id,
      question_options (
        cs_score,
        swe_score,
        it_score,
        is_score,
        isc_score,
        stat_score
      )
    `)
    .eq('assessment_id', assessmentId);
  
  if (responsesError) {
    throw new Error(`Failed to fetch responses: ${responsesError.message}`);
  }
  
  // Calculate scores
  const scores = {
    CS: 0,
    SWE: 0,
    IT: 0,
    IS: 0,
    ISC: 0,
    STAT: 0
  };
  
  responses.forEach(response => {
    const option = response.question_options;
    if (option) {
      scores.CS += option.cs_score || 0;
      scores.SWE += option.swe_score || 0;
      scores.IT += option.it_score || 0;
      scores.IS += option.is_score || 0;
      scores.ISC += option.isc_score || 0;
      scores.STAT += option.stat_score || 0;
    }
  });
  
  const sortedScores = Object.entries(scores)
    .map(([code, score]) => ({ department_code: code, score }))
    .sort((a, b) => b.score - a.score);
  
  // Fetch top department
  const { data: department } = await supabase
    .from('departments')
    .select('*')
    .eq('code', sortedScores[0].department_code)
    .single();
  
  return {
    assessment_id: assessmentId,
    student_name: assessment.student_name,
    student_email: assessment.student_email,
    status: assessment.status,
    completed_at: assessment.completed_at,
    top_match: {
      ...sortedScores[0],
      department_name: department?.name,
      department_description: department?.description
    },
    scores: sortedScores,
    all_departments: sortedScores
  };
}

/**
 * 7. Submit feedback
 */
export async function submitFeedbackToSupabase(feedbackData) {
  const { error } = await supabase
    .from('feedback')
    .insert({
      assessment_id: feedbackData.assessment_id,
      rating: feedbackData.rating,
      comment: feedbackData.comment,
      user_name: feedbackData.user_name,
      user_email: feedbackData.user_email
    });
  
  if (error) {
    throw new Error(`Failed to submit feedback: ${error.message}`);
  }
  
  return { success: true, message: 'Feedback submitted successfully' };
}

export { supabase };

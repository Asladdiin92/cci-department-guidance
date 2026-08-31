import { supabase } from '../lib/supabase';

/**
 * Saves a completed student assessment and department recommendations to Supabase
 */
export async function submitAssessment({ studentName, studentId, responses, scoreTotals }) {
  // 1. Insert master assessment record
  const { data: assessment, error: aError } = await supabase
    .from('assessments')
    .insert({
      student_name: studentName || 'Anonymous Student',
      student_id: studentId || null,
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString()
    })
    .select()
    .single();

  if (aError) {
    console.error('Error creating assessment:', aError);
    throw aError;
  }

  // 2. Insert individual question responses
  if (responses && responses.length > 0) {
    const responsePayload = responses.map((r) => ({
      assessment_id: assessment.id,
      question_id: r.questionId,
      option_id: r.optionId,
      answered_at: new Date().toISOString()
    }));

    const { error: rError } = await supabase
      .from('assessment_responses')
      .insert(responsePayload);

    if (rError) console.error('Error saving responses:', rError);
  }

  // 3. Fetch departments to map code (e.g. 'CS') to UUID
  const { data: depts } = await supabase.from('departments').select('id, code');
  const deptMap = Object.fromEntries((depts || []).map((d) => [d.code, d.id]));

  // 4. Sort and insert department rankings / recommendations
  const ranked = Object.entries(scoreTotals || {})
    .sort(([, a], [, b]) => b - a)
    .map(([code, score], index) => ({
      assessment_id: assessment.id,
      department_id: deptMap[code],
      score: score,
      rank: index + 1,
      match_percentage: Math.round((score / 60) * 100)
    }))
    .filter((r) => r.department_id); // ensure valid UUID

  if (ranked.length > 0) {
    const { error: recError } = await supabase
      .from('recommendations')
      .insert(ranked);

    if (recError) console.error('Error saving recommendations:', recError);
  }

  return { assessmentId: assessment.id, rankings: ranked };
}
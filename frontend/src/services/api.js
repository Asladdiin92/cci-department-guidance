import { supabase } from '../lib/supabase';

// 1. Fetch all 6 departments
export async function getDepartments() {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .order('code', { ascending: true });

  if (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
  return data;
}

// 2. Fetch all 20 questions with their scoring options
export async function getQuestionsWithOptions() {
  const { data, error } = await supabase
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
        scores_json,
        order_index
      )
    `)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
  return data;
}
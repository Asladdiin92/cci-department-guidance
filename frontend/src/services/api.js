// Import Supabase fallback functions
import * as SupabaseAPI from './supabaseApi.js';

// Base API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'https://cci-department-guidance-production.up.railway.app/api';

// Flag to track if backend is available
let useSupabaseFallback = false;

/**
 * Enhanced API Error Class
 */
class APIError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Helper function for API calls with enhanced error handling
 */
async function apiCall(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // Try to parse JSON response
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      // If JSON parsing fails, throw a generic error
      throw new APIError(
        `Server returned invalid response`,
        response.status,
        'Response was not valid JSON'
      );
    }

    // Check if response is not OK
    if (!response.ok) {
      // Extract error message from standardized error response
      const errorMessage = data.error || data.message || `API Error: ${response.status}`;
      throw new APIError(errorMessage, response.status, data.details);
    }

    return data;
  } catch (error) {
    // Re-throw APIError as-is
    if (error instanceof APIError) {
      console.error(`API call failed for ${endpoint}:`, error.message);
      throw error;
    }
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error(`Network error for ${endpoint}:`, error);
      throw new APIError(
        'Unable to connect to server. Please check your internet connection.',
        0,
        error.message
      );
    }
    
    // Handle timeout errors
    if (error.name === 'AbortError') {
      console.error(`Request timeout for ${endpoint}`);
      throw new APIError('Request timed out. Please try again.', 0, 'Timeout');
    }
    
    // Handle other unknown errors
    console.error(`Unexpected error for ${endpoint}:`, error);
    throw new APIError(
      error.message || 'An unexpected error occurred',
      0,
      error.toString()
    );
  }
}

// 1. Fetch all 6 departments
export async function getDepartments() {
  try {
    if (useSupabaseFallback) {
      console.log('📡 Using Supabase direct connection for departments');
      const departments = await SupabaseAPI.getDepartmentsFromSupabase();
      return departments;
    }
    
    const response = await apiCall('/departments');
    return response.data.departments;
  } catch (error) {
    console.warn('⚠️ Backend failed, switching to Supabase fallback');
    useSupabaseFallback = true;
    const departments = await SupabaseAPI.getDepartmentsFromSupabase();
    return departments;
  }
}

// 2. Fetch single department by code
export async function getDepartment(code) {
  try {
    if (useSupabaseFallback) {
      console.log('📡 Using Supabase direct connection for department');
      return await SupabaseAPI.getDepartmentFromSupabase(code);
    }
    
    const response = await apiCall(`/departments/${code}`);
    return response.data;
  } catch (error) {
    console.warn('⚠️ Backend failed, switching to Supabase fallback');
    useSupabaseFallback = true;
    return await SupabaseAPI.getDepartmentFromSupabase(code);
  }
}

// 3. Start new assessment
export async function startAssessment(studentInfo = {}) {
  console.log('🔍 API startAssessment called with:', studentInfo);
  
  try {
    if (useSupabaseFallback) {
      console.log('📡 Using Supabase direct connection for assessment');
      return await SupabaseAPI.startAssessmentFromSupabase(studentInfo);
    }
    
    const response = await apiCall('/assessments/start', {
      method: 'POST',
      body: JSON.stringify(studentInfo)
    });
    
    // Transform backend field names to match frontend expectations
    const transformedData = {
      ...response.data,
      questions: response.data.questions.map(q => ({
        ...q,
        question_text: q.text,  // Backend: text → Frontend: question_text
        options: (q.question_options || []).map(opt => ({
          ...opt,
          option_text: opt.text  // Backend: text → Frontend: option_text
        }))
      }))
    };
    
    console.log('✅ Transformed first question:', transformedData.questions[0]);
    return transformedData;
  } catch (error) {
    console.warn('⚠️ Backend failed, switching to Supabase fallback');
    useSupabaseFallback = true;
    return await SupabaseAPI.startAssessmentFromSupabase(studentInfo);
  }
}

// 4. Submit assessment (after responses saved)
export async function submitAssessment(assessmentId, sessionToken) {
  try {
    if (useSupabaseFallback) {
      console.log('📡 Using Supabase direct connection for submit');
      return await SupabaseAPI.submitAssessmentToSupabase(assessmentId, sessionToken);
    }
    
    const response = await apiCall(`/assessments/${assessmentId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ session_token: sessionToken })
    });
    return response.data;
  } catch (error) {
    console.warn('⚠️ Backend failed, switching to Supabase fallback');
    useSupabaseFallback = true;
    return await SupabaseAPI.submitAssessmentToSupabase(assessmentId, sessionToken);
  }
}

// 4.5. Save individual response (for Supabase fallback)
export async function saveResponse(assessmentId, questionId, optionId) {
  try {
    if (useSupabaseFallback) {
      return await SupabaseAPI.saveResponseToSupabase(assessmentId, questionId, optionId);
    }
    
    // If using backend, responses are saved in bulk on submit
    // This is a no-op for backend mode
    return { success: true };
  } catch (error) {
    console.warn('⚠️ Failed to save response, will retry on submit');
    return { success: false };
  }
}

// 5. Get assessment results
export async function getAssessmentResults(assessmentId) {
  try {
    if (useSupabaseFallback) {
      console.log('📡 Using Supabase direct connection for results');
      return await SupabaseAPI.getAssessmentResultsFromSupabase(assessmentId);
    }
    
    const response = await apiCall(`/assessments/${assessmentId}/results`);
    return response.data;
  } catch (error) {
    console.warn('⚠️ Backend failed, switching to Supabase fallback');
    useSupabaseFallback = true;
    return await SupabaseAPI.getAssessmentResultsFromSupabase(assessmentId);
  }
}

// 6. Submit feedback
export async function submitFeedback(feedbackData) {
  try {
    if (useSupabaseFallback) {
      console.log('📡 Using Supabase direct connection for feedback');
      return await SupabaseAPI.submitFeedbackToSupabase(feedbackData);
    }
    
    const response = await apiCall('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
    return response.data;
  } catch (error) {
    console.warn('⚠️ Backend failed, switching to Supabase fallback');
    useSupabaseFallback = true;
    return await SupabaseAPI.submitFeedbackToSupabase(feedbackData);
  }
}

// Export APIError for use in components
export { APIError };
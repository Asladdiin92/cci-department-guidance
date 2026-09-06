// Base API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'https://cci-department-guidance-production.up.railway.app/api';

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
  const response = await apiCall('/departments');
  return response.data.departments;
}

// 2. Fetch single department by code
export async function getDepartment(code) {
  const response = await apiCall(`/departments/${code}`);
  return response.data;
}

// 3. Start new assessment
export async function startAssessment(studentInfo = {}) {
  console.log('🔍 API startAssessment called with:', studentInfo);
  console.log('Keys:', Object.keys(studentInfo));
  console.log('student_id:', studentInfo.student_id);
  console.log('student_name:', studentInfo.student_name);
  console.log('student_email:', studentInfo.student_email);
  
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
  console.log('✅ First question text:', transformedData.questions[0]?.question_text);
  console.log('✅ First option text:', transformedData.questions[0]?.options[0]?.option_text);
  
  return transformedData;
}

// 4. Submit assessment (after responses saved)
export async function submitAssessment(assessmentId, sessionToken) {
  const response = await apiCall(`/assessments/${assessmentId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ session_token: sessionToken })
  });
  return response.data;
}

// 5. Get assessment results
export async function getAssessmentResults(assessmentId) {
  const response = await apiCall(`/assessments/${assessmentId}/results`);
  return response.data;
}

// 6. Submit feedback
export async function submitFeedback(feedbackData) {
  const response = await apiCall('/feedback', {
    method: 'POST',
    body: JSON.stringify(feedbackData),
  });
  return response.data;
}

// Export APIError for use in components
export { APIError };
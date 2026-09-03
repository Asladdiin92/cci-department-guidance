// Base API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'https://cci-department-guidance-production.up.railway.app/api';

// Helper function for API calls
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
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
  const response = await apiCall('/assessments/start', {
    method: 'POST',
    body: JSON.stringify(studentInfo)
  });
  return response.data;
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
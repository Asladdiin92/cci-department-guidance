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
  return response.data.department;
}

// 3. Start new assessment
export async function startAssessment() {
  const response = await apiCall('/assessments/start', {
    method: 'POST',
  });
  return response.data;
}

// 4. Submit assessment answers
export async function submitAssessment(assessmentId, answers) {
  const response = await apiCall('/assessments/submit', {
    method: 'POST',
    body: JSON.stringify({
      assessment_id: assessmentId,
      answers,
    }),
  });
  return response.data;
}

// 5. Submit feedback
export async function submitFeedback(feedbackData) {
  const response = await apiCall('/feedback', {
    method: 'POST',
    body: JSON.stringify(feedbackData),
  });
  return response.data;
}
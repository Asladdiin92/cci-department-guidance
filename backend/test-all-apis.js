/**
 * Comprehensive API Test Script
 * Tests all frontend API endpoints from terminal
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_URL = 'http://localhost:3001/api';

// Helper function to make API calls
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

    return {
      status: response.status,
      ok: response.ok,
      data: data
    };
  } catch (error) {
    console.error(`❌ API call failed for ${endpoint}:`, error.message);
    return { status: 0, ok: false, error: error.message };
  }
}

// Test functions
async function test1_getDepartments() {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 1: Fetch all 6 departments');
  console.log('='.repeat(70));
  
  const result = await apiCall('/departments');
  
  if (result.ok) {
    const departments = result.data.data.departments;
    console.log(`✅ Success! Found ${departments.length} departments:`);
    departments.forEach(dept => {
      console.log(`   ${dept.code.padEnd(6)} - ${dept.name}`);
    });
  } else {
    console.log('❌ Failed:', result.data.error || result.error);
  }
  
  return result;
}

async function test2_getDepartment() {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 2: Fetch single department by code (CS)');
  console.log('='.repeat(70));
  
  const result = await apiCall('/departments/CS');
  
  if (result.ok) {
    const dept = result.data.data;
    console.log(`✅ Success!`);
    console.log(`   Code: ${dept.code}`);
    console.log(`   Name: ${dept.name}`);
    console.log(`   Description: ${dept.description.substring(0, 100)}...`);
    console.log(`   Strengths: ${dept.strengths.length} items`);
    console.log(`   Career Paths: ${dept.career_paths.length} items`);
  } else {
    console.log('❌ Failed:', result.data.error || result.error);
  }
  
  return result;
}

async function test3_startAssessment() {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 3: Start new assessment');
  console.log('='.repeat(70));
  
  const studentInfo = {
    student_id: 'HU/CS/2024/TEST001',
    student_name: 'Terminal Test User',
    student_email: 'test@haramaya.edu.et'
  };
  
  console.log('📤 Sending student info:', studentInfo);
  
  const result = await apiCall('/assessments/start', {
    method: 'POST',
    body: JSON.stringify(studentInfo)
  });
  
  if (result.ok) {
    console.log(`✅ Assessment started successfully!`);
    console.log(`   Assessment ID: ${result.data.data.assessment_id}`);
    console.log(`   Session Token: ${result.data.data.session_token.substring(0, 20)}...`);
    console.log(`   Total Questions: ${result.data.data.total_questions}`);
    console.log(`   First Question: ${result.data.data.questions[0].text.substring(0, 60)}...`);
  } else {
    console.log('❌ Failed:', result.data.error || result.data.message || result.error);
  }
  
  return result;
}

async function test4_saveResponse(assessmentId, sessionToken) {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 4: Save a response');
  console.log('='.repeat(70));
  
  // First, get questions to know valid question_id and option_id
  const assessmentResult = await test3_startAssessment();
  
  if (!assessmentResult.ok) {
    console.log('❌ Cannot test save response - assessment creation failed');
    return;
  }
  
  const newAssessmentId = assessmentResult.data.data.assessment_id;
  const newSessionToken = assessmentResult.data.data.session_token;
  const questions = assessmentResult.data.data.questions;
  
  const responseData = {
    question_id: questions[0].id,
    option_id: questions[0].question_options[0].id,
    session_token: newSessionToken
  };
  
  console.log('📤 Saving response for question:', questions[0].text.substring(0, 50) + '...');
  
  const result = await apiCall(`/assessments/${newAssessmentId}/responses`, {
    method: 'POST',
    body: JSON.stringify(responseData)
  });
  
  if (result.ok) {
    console.log(`✅ Response saved successfully!`);
    console.log(`   Response ID: ${result.data.data.response_id}`);
    console.log(`   Responses Completed: ${result.data.data.responses_completed}`);
  } else {
    console.log('❌ Failed:', result.data.error || result.data.message || result.error);
  }
  
  return { result, assessmentId: newAssessmentId, sessionToken: newSessionToken };
}

async function test5_getProgress(assessmentId, sessionToken) {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 5: Get assessment progress');
  console.log('='.repeat(70));
  
  const result = await apiCall(`/assessments/${assessmentId}/progress?session_token=${sessionToken}`);
  
  if (result.ok) {
    console.log(`✅ Progress retrieved successfully!`);
    console.log(`   Responses Completed: ${result.data.data.responses_completed}`);
    console.log(`   Total Questions: ${result.data.data.total_questions}`);
    console.log(`   Progress: ${result.data.data.progress_percentage}%`);
    console.log(`   Can Submit: ${result.data.data.can_submit}`);
  } else {
    console.log('❌ Failed:', result.data.error || result.data.message || result.error);
  }
  
  return result;
}

async function test6_submitFeedback() {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 6: Submit feedback');
  console.log('='.repeat(70));
  
  const feedbackData = {
    assessment_id: 'test-assessment-id',
    rating: 5,
    comments: 'This is a test feedback from terminal',
    experience: 'excellent'
  };
  
  console.log('📤 Submitting feedback:', feedbackData);
  
  const result = await apiCall('/feedback', {
    method: 'POST',
    body: JSON.stringify(feedbackData)
  });
  
  if (result.ok) {
    console.log(`✅ Feedback submitted successfully!`);
    console.log(`   Feedback ID: ${result.data.data.id}`);
  } else {
    console.log('❌ Failed:', result.data.error || result.data.message || result.error);
  }
  
  return result;
}

// Main test runner
async function runAllTests() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════════════╗');
  console.log('║         CCI DEPARTMENT GUIDANCE - API ENDPOINT TESTS               ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝');
  console.log('\n🚀 Testing all 6 API endpoints...\n');
  
  const results = {
    passed: 0,
    failed: 0
  };
  
  // Test 1: Get all departments
  const test1 = await test1_getDepartments();
  test1.ok ? results.passed++ : results.failed++;
  
  await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
  
  // Test 2: Get single department
  const test2 = await test2_getDepartment();
  test2.ok ? results.passed++ : results.failed++;
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Test 3: Start assessment
  const test3 = await test3_startAssessment();
  test3.ok ? results.passed++ : results.failed++;
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Test 4: Save response (creates its own assessment)
  const test4Data = await test4_saveResponse();
  test4Data.result.ok ? results.passed++ : results.failed++;
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Test 5: Get progress (using assessment from test 4)
  if (test4Data && test4Data.assessmentId) {
    const test5 = await test5_getProgress(test4Data.assessmentId, test4Data.sessionToken);
    test5.ok ? results.passed++ : results.failed++;
  } else {
    console.log('\n⚠️  Skipping Test 5 - No assessment available');
    results.failed++;
  }
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Test 6: Submit feedback
  const test6 = await test6_submitFeedback();
  test6.ok ? results.passed++ : results.failed++;
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('TEST SUMMARY');
  console.log('='.repeat(70));
  console.log(`✅ Passed: ${results.passed}/6`);
  console.log(`❌ Failed: ${results.failed}/6`);
  console.log('='.repeat(70));
  console.log('\n✨ All tests completed!\n');
}

// Run all tests
runAllTests().catch(err => {
  console.error('💥 Test suite crashed:', err);
  process.exit(1);
});

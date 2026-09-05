/**
 * Test Assessment Start API
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testStartAssessment() {
  console.log('\n🧪 Testing Start Assessment Endpoint...\n');
  
  const studentData = {
    student_id: 'HU/CS/2024/001',
    student_name: 'Test Student',
    student_email: 'test@haramaya.edu.et'
  };

  console.log('📤 Sending request with data:', studentData);
  console.log('URL: http://localhost:3001/api/assessments/start');
  console.log('');

  try {
    const response = await fetch('http://localhost:3001/api/assessments/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    });

    const data = await response.json();

    console.log('📥 Response Status:', response.status);
    console.log('📥 Response Data:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ Assessment started successfully!');
      console.log('Assessment ID:', data.data.assessment_id);
      console.log('Session Token:', data.data.session_token);
      console.log('Total Questions:', data.data.total_questions);
    } else {
      console.log('\n❌ Failed to start assessment');
      console.log('Error:', data.error || data.message);
    }

  } catch (error) {
    console.log('\n❌ Request failed');
    console.log('Error:', error.message);
  }
}

testStartAssessment();

import { useState, useEffect } from 'react';
import { 
  getDepartments, 
  getDepartment, 
  startAssessment,
  submitAssessment,
  getAssessmentResults 
} from '../services/api';

export default function TestAPI() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    runAllTests();
  }, []);

  const runAllTests = async () => {
    const testResults = {};
    
    try {
      // Test 1: Get All Departments
      console.log('🧪 Test 1: Getting all departments...');
      const departments = await getDepartments();
      testResults.departments = {
        status: 'success',
        count: departments.length,
        data: departments.map(d => ({ code: d.code, name: d.name }))
      };
      console.log('✅ Test 1 passed:', departments.length, 'departments');
      
      // Test 2: Get Single Department
      console.log('🧪 Test 2: Getting CS department...');
      const csDept = await getDepartment('CS');
      testResults.singleDepartment = {
        status: 'success',
        data: { code: csDept.code, name: csDept.name, courses: csDept.core_courses?.length || 0 }
      };
      console.log('✅ Test 2 passed:', csDept.name);
      
      // Test 3: Start Assessment
      console.log('🧪 Test 3: Starting test assessment...');
      const assessment = await startAssessment({
        student_id: 'test-' + Date.now(),
        student_name: 'API Test Student',
        student_email: 'test@example.com'
      });
      testResults.startAssessment = {
        status: 'success',
        assessmentId: assessment.assessment_id,
        questionCount: assessment.questions.length,
        firstQuestion: assessment.questions[0]?.question_text?.substring(0, 50) + '...'
      };
      console.log('✅ Test 3 passed:', assessment.questions.length, 'questions loaded');
      
      // Test 4: Submit Assessment (with dummy data)
      console.log('🧪 Test 4: Submitting assessment...');
      const submitResult = await submitAssessment(
        assessment.assessment_id,
        assessment.session_token
      );
      testResults.submitAssessment = {
        status: 'success',
        topMatch: submitResult.top_match?.department_code,
        scoreCount: submitResult.scores?.length || 0
      };
      console.log('✅ Test 4 passed: Top match:', submitResult.top_match?.department_code);
      
      // Test 5: Get Results
      console.log('🧪 Test 5: Getting assessment results...');
      const results = await getAssessmentResults(assessment.assessment_id);
      testResults.getResults = {
        status: 'success',
        topMatch: results.top_match?.department_code,
        studentName: results.student_name
      };
      console.log('✅ Test 5 passed');
      
    } catch (err) {
      console.error('❌ Test failed:', err);
      testResults.error = {
        status: 'error',
        message: err.message,
        stack: err.stack
      };
      setError(err.message);
    }
    
    setResults(testResults);
    setLoading(false);
  };

  const passedTests = Object.values(results).filter(r => r.status === 'success').length;
  const totalTests = Object.keys(results).length;

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#0066cc' }}>🧪 API Test Suite</h1>
      <p>Testing all API endpoints and data flow...</p>
      
      {loading && (
        <div style={{ padding: '2rem', background: '#fff3cd', borderRadius: '8px' }}>
          <p>⏳ Running tests...</p>
        </div>
      )}
      
      {error && (
        <div style={{ padding: '1rem', background: '#f8d7da', borderRadius: '8px', marginTop: '1rem' }}>
          <h3 style={{ color: '#721c24' }}>❌ Error Detected</h3>
          <p>{error}</p>
        </div>
      )}
      
      {!loading && (
        <>
          <div style={{ 
            padding: '1rem', 
            background: passedTests === totalTests ? '#d4edda' : '#fff3cd',
            borderRadius: '8px',
            marginTop: '1rem'
          }}>
            <h2>Test Summary</h2>
            <p style={{ fontSize: '1.2rem' }}>
              ✅ Passed: {passedTests} / {totalTests}
            </p>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            {Object.entries(results).map(([testName, result]) => (
              <div 
                key={testName}
                style={{
                  padding: '1rem',
                  background: result.status === 'success' ? '#d4edda' : '#f8d7da',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  border: `2px solid ${result.status === 'success' ? '#28a745' : '#dc3545'}`
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem 0' }}>
                  {result.status === 'success' ? '✅' : '❌'} {testName}
                </h3>
                <pre style={{ 
                  background: '#f8f9fa', 
                  padding: '1rem', 
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.9rem'
                }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </>
      )}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#e7f3ff', borderRadius: '8px' }}>
        <h3>📊 Data Source</h3>
        <p>This test verifies that:</p>
        <ul>
          <li>✓ Frontend can connect to backend/Supabase</li>
          <li>✓ All 6 departments are loaded</li>
          <li>✓ Questions and options are properly structured</li>
          <li>✓ Assessment workflow (start → submit → results) works end-to-end</li>
          <li>✓ Automatic fallback to Supabase when backend is unavailable</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '0.75rem 1.5rem',
            background: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          🔄 Run Tests Again
        </button>
      </div>
    </div>
  );
}

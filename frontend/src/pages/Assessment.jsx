import React, { useState } from 'react';
import { questions } from '../data/questions.js';

export default function Assessment() {
  // We use React State to track the user's answers
  const [answers, setAnswers] = useState({});

  // This handles when they click a radio button
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  // What happens when they submit? (We will hook this up to the backend later)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted! Here is the data:", answers);
    // TODO: Send 'answers' to backend -> Supabase
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Department Recommendation Assessment</h2>
      
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <p><strong>{q.id}. {q.text}</strong></p>
            
            <label style={{ marginRight: '15px' }}>
              <input 
                type="radio" 
                name={`question_${q.id}`} 
                value="1" 
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                required
              /> Yes
            </label>
            
            <label>
              <input 
                type="radio" 
                name={`question_${q.id}`} 
                value="0" 
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              /> No
            </label>
          </div>
        ))}
        
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Submit Assessment
        </button>
      </form>
    </div>
  );
}
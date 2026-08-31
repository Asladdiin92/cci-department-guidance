import React, { useState } from 'react';
import { questions, departments } from '../data/questions.js';
import { Link } from 'react-router-dom';

export default function Assessment() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [results, setResults] = useState(null);

  const handleSelectOption = (questionId, optionIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateResults = () => {
    const scores = { CS: 0, SWE: 0, IT: 0, IS: 0, ISC: 0, STAT: 0 };

    questions.forEach((q) => {
      const selectedIndex = selectedOptions[q.id];
      if (selectedIndex !== undefined && q.options[selectedIndex]) {
        const optionScores = q.options[selectedIndex].scores;
        for (const [dept, pts] of Object.entries(optionScores)) {
          scores[dept] = (scores[dept] || 0) + pts;
        }
      }
    });

    const sortedDepts = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([key, score]) => ({
        key,
        score,
        details: departments[key] || {}
      }));

    setResults(sortedDepts);
  };

  const isComplete = questions.every((q) => selectedOptions[q.id] !== undefined);
  const answeredCount = Object.keys(selectedOptions).length;

  if (results) {
    const topDept = results[0];
    return (
      <div style={{ maxWidth: '900px', margin: '30px auto', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#15803d', fontWeight: 600 }}>Top Recommendation</span>
          <h1 style={{ margin: '8px 0', color: '#14532d', fontSize: '28px' }}>{topDept.details.name} ({topDept.key})</h1>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>{topDept.details.description}</p>
        </div>

        <h3 style={{ marginTop: '30px', marginBottom: '16px' }}>All Department Match Scores</h3>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
          {results.map((r, i) => (
            <div key={r.key} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{i + 1}. {r.details.name} ({r.key})</strong>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                  Strengths: {r.details.strengths ? r.details.strengths.slice(0, 3).join(', ') : ''}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: r.details.color || '#2563eb' }}>{r.score} pts</span>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Score match</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => { setResults(null); setSelectedOptions({}); }}
            style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            Retake Assessment
          </button>
          <Link to="/" style={{ padding: '10px 20px', background: '#f3f4f6', color: '#374151', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '26px' }}>Department Recommendation Assessment</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>Answer all 20 questions to find your best fit in the College of Computing and Informatics.</p>
        </div>
        <div style={{ padding: '8px 16px', background: '#eff6ff', borderRadius: '20px', color: '#1d4ed8', fontWeight: 600, fontSize: '14px' }}>
          {answeredCount} / {questions.length} Answered
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {questions.map((q, qIndex) => (
          <div
            key={q.id}
            style={{
              padding: '20px',
              border: selectedOptions[q.id] !== undefined ? '1px solid #93c5fd' : '1px solid #e5e7eb',
              background: selectedOptions[q.id] !== undefined ? '#f8fafc' : '#ffffff',
              borderRadius: '10px'
            }}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '17px', color: '#1f2937' }}>
              {qIndex + 1}. {q.text}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {q.options.map((opt, optIndex) => {
                const isSelected = selectedOptions[q.id] === optIndex;
                return (
                  <label
                    key={optIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: isSelected ? '1.5px solid #2563eb' : '1px solid #e5e7eb',
                      background: isSelected ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name={`question_${q.id}`}
                      checked={isSelected}
                      onChange={() => handleSelectOption(q.id, optIndex)}
                      style={{ marginTop: '3px', marginRight: '12px' }}
                    />
                    <span style={{ fontSize: '15px', color: isSelected ? '#1e40af' : '#374151', lineHeight: 1.5 }}>
                      {opt.text}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <button
          type="button"
          onClick={calculateResults}
          disabled={!isComplete}
          style={{
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: 600,
            color: '#ffffff',
            backgroundColor: isComplete ? '#2563eb' : '#9ca3af',
            border: 'none',
            borderRadius: '8px',
            cursor: isComplete ? 'pointer' : 'not-allowed'
          }}
        >
          {isComplete ? 'Submit & View Recommendations' : `Answer all questions to submit (${answeredCount}/${questions.length})`}
        </button>
      </div>
    </div>
  );
}
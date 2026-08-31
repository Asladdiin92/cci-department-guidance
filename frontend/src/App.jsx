import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '30px', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '32px', color: '#1e3a8a', marginBottom: '12px' }}>
        CCI Department Guidance System
      </h1>
      <p style={{ fontSize: '18px', color: '#4b5563', maxWidth: '600px', margin: '0 auto 30px', lineHeight: 1.6 }}>
        Discover the best computing program for your strengths, interests, and career goals across Computer Science, Software Engineering, IT, Information Systems, Information Science, and Statistics.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Link
          to="/assessment"
          style={{
            padding: '14px 28px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '16px'
          }}
        >
          Start Assessment →
        </Link>
      </div>
    </div>
  );
}

export default App;
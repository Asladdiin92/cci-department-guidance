import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const stats = [
    { value: '6', label: 'Departments', icon: '🎓' },
    { value: '20', label: 'Question Assessment', icon: '📝' },
    { value: '500+', label: 'Students Annually', icon: '👨‍🎓' },
    { value: '10-15', label: 'Minutes to Complete', icon: '⏱️' },
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Personalized Matching',
      description: 'Get department recommendations based on your unique interests, skills, and career goals.',
    },
    {
      icon: '📊',
      title: 'Data-Driven Results',
      description: 'Our intelligent algorithm analyzes your responses to provide accurate recommendations.',
    },
    {
      icon: '🔍',
      title: 'Detailed Comparison',
      description: 'Compare departments side-by-side to make the most informed decision.',
    },
    {
      icon: '💼',
      title: 'Career Insights',
      description: 'Explore career paths, salary prospects, and industry demand for each department.',
    },
  ];

  const departments = [
    { code: 'CS', name: 'Computer Science', color: '#4f46e5', icon: '💻' },
    { code: 'SWE', name: 'Software Engineering', color: '#ea580c', icon: '⚙️' },
    { code: 'IT', name: 'Information Technology', color: '#0d9488', icon: '🌐' },
    { code: 'IS', name: 'Information System', color: '#db2777', icon: '📱' },
    { code: 'ISC', name: 'Information Science', color: '#7c3aed', icon: '📚' },
    { code: 'STAT', name: 'Statistics', color: '#eab308', icon: '📈' },
  ];

  return (
    <div className="hero">
      {/* Main Hero Section */}
      <section className="hero-main">
        <div className="hero-container">
          <div className="hero-content">
            {/* Badge */}
            <div className="hero-badge">
              <span className="hero-badge-icon">✨</span>
              <span className="hero-badge-text">Smart Career Guidance System</span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-title">
              Find Your Perfect
              <span className="hero-title-gradient"> Department</span>
              <br />
              at CCI Haramaya University
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Take our intelligent 20-question assessment and discover which computing department 
              aligns best with your interests, skills, and career aspirations. Make an informed 
              decision backed by data and expert insights.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta">
              <Link to="/assessment" className="hero-btn hero-btn-primary">
                <span className="hero-btn-icon">🚀</span>
                Start Assessment Now
                <span className="hero-btn-arrow">→</span>
              </Link>
              <Link to="/departments" className="hero-btn hero-btn-secondary">
                <span className="hero-btn-icon">🎓</span>
                Explore Departments
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="hero-trust">
              <div className="hero-trust-item">
                <span className="hero-trust-icon">✓</span>
                <span className="hero-trust-text">Free & Anonymous</span>
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-icon">✓</span>
                <span className="hero-trust-text">10-15 Minutes</span>
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-icon">✓</span>
                <span className="hero-trust-text">Instant Results</span>
              </div>
            </div>
          </div>

          {/* Hero Visual/Illustration */}
          <div className="hero-visual">
            <div className="hero-visual-card">
              <div className="hero-visual-header">
                <div className="hero-visual-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="hero-visual-title">Department Match</span>
              </div>
              <div className="hero-visual-content">
                <div className="hero-visual-chart">
                  <div className="hero-visual-bar" style={{ width: '92%', backgroundColor: '#1e7b34' }}>
                    <span className="hero-visual-label">Software Engineering</span>
                    <span className="hero-visual-score">92%</span>
                  </div>
                  <div className="hero-visual-bar" style={{ width: '88%', backgroundColor: '#2563eb' }}>
                    <span className="hero-visual-label">Computer Science</span>
                    <span className="hero-visual-score">88%</span>
                  </div>
                  <div className="hero-visual-bar" style={{ width: '75%', backgroundColor: '#7c3aed' }}>
                    <span className="hero-visual-label">Information Tech</span>
                    <span className="hero-visual-score">75%</span>
                  </div>
                </div>
                <div className="hero-visual-badge">
                  <span className="hero-visual-badge-icon">🎯</span>
                  <span className="hero-visual-badge-text">Best Match</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="hero-float hero-float-1">
              <span className="hero-float-icon">💡</span>
              <span className="hero-float-text">Smart Analysis</span>
            </div>
            <div className="hero-float hero-float-2">
              <span className="hero-float-icon">📊</span>
              <span className="hero-float-text">Data-Driven</span>
            </div>
            <div className="hero-float hero-float-3">
              <span className="hero-float-icon">🎓</span>
              <span className="hero-float-text">Expert Backed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="hero-stats">
        <div className="hero-stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="hero-stat-card">
              <span className="hero-stat-icon">{stat.icon}</span>
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="hero-features">
        <div className="hero-features-container">
          <div className="hero-features-header">
            <span className="hero-features-subtitle">Why Choose Our System</span>
            <h2 className="hero-features-title">
              Making Department Selection <span className="text-gradient">Easy & Accurate</span>
            </h2>
            <p className="hero-features-description">
              Our intelligent guidance system combines psychological assessment principles with 
              academic expertise to help you find your ideal computing department.
            </p>
          </div>

          <div className="hero-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="hero-feature-card">
                <div className="hero-feature-icon">{feature.icon}</div>
                <h3 className="hero-feature-title">{feature.title}</h3>
                <p className="hero-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="hero-departments">
        <div className="hero-departments-container">
          <div className="hero-departments-header">
            <span className="hero-departments-subtitle">Explore Your Options</span>
            <h2 className="hero-departments-title">
              Six Specialized <span className="text-gradient">Computing Departments</span>
            </h2>
            <p className="hero-departments-description">
              Each department offers unique opportunities and career paths in the tech industry.
            </p>
          </div>

          <div className="hero-departments-grid">
            {departments.map((dept, index) => (
              <Link
                key={index}
                to={`/departments/${dept.code.toLowerCase()}`}
                className="hero-dept-card"
                style={{ '--dept-color': dept.color }}
              >
                <div className="hero-dept-icon">{dept.icon}</div>
                <div className="hero-dept-code">{dept.code}</div>
                <div className="hero-dept-name">{dept.name}</div>
                <div className="hero-dept-arrow">→</div>
              </Link>
            ))}
          </div>

          <div className="hero-departments-cta">
            <Link to="/departments" className="hero-departments-link">
              View All Departments in Detail
              <span className="hero-departments-link-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="hero-how">
        <div className="hero-how-container">
          <div className="hero-how-header">
            <span className="hero-how-subtitle">Simple Process</span>
            <h2 className="hero-how-title">
              How It <span className="text-gradient">Works</span>
            </h2>
          </div>

          <div className="hero-how-steps">
            <div className="hero-step">
              <div className="hero-step-number">1</div>
              <div className="hero-step-icon">📝</div>
              <h3 className="hero-step-title">Answer 20 Questions</h3>
              <p className="hero-step-description">
                Complete our carefully designed assessment covering your interests, skills, and goals.
              </p>
            </div>

            <div className="hero-step-arrow">→</div>

            <div className="hero-step">
              <div className="hero-step-number">2</div>
              <div className="hero-step-icon">⚡</div>
              <h3 className="hero-step-title">Get Instant Results</h3>
              <p className="hero-step-description">
                Receive personalized department recommendations with detailed match scores.
              </p>
            </div>

            <div className="hero-step-arrow">→</div>

            <div className="hero-step">
              <div className="hero-step-number">3</div>
              <div className="hero-step-icon">✅</div>
              <h3 className="hero-step-title">Make Your Choice</h3>
              <p className="hero-step-description">
                Compare options, explore details, and confidently select your department.
              </p>
            </div>
          </div>

          <div className="hero-how-cta">
            <Link to="/assessment" className="hero-btn hero-btn-primary hero-btn-large">
              <span className="hero-btn-icon">🚀</span>
              Begin Your Journey
              <span className="hero-btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="hero-final-cta">
        <div className="hero-final-cta-container">
          <div className="hero-final-cta-content">
            <h2 className="hero-final-cta-title">Ready to Find Your Perfect Department?</h2>
            <p className="hero-final-cta-subtitle">
              Join hundreds of students who have made confident decisions with our guidance system.
            </p>
            <div className="hero-final-cta-buttons">
              <Link to="/assessment" className="hero-btn hero-btn-primary hero-btn-large">
                <span className="hero-btn-icon">🚀</span>
                Take Free Assessment
                <span className="hero-btn-arrow">→</span>
              </Link>
              <Link to="/about" className="hero-btn hero-btn-outline hero-btn-large">
                <span className="hero-btn-icon">ℹ️</span>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

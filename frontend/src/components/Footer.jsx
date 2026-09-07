import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Take Assessment', path: '/assessment' },
    { name: 'Explore Departments', path: '/departments' },
    { name: 'Compare Departments', path: '/compare' },
    { name: 'Exit Exam Preparation', path: '/exit-exam' },
  ];

  const departments = [
    { name: 'Computer Science', path: '/departments/cs' },
    { name: 'Software Engineering', path: '/departments/swe' },
    { name: 'Information Technology', path: '/departments/it' },
    { name: 'Information System', path: '/departments/is' },
    { name: 'Information Science', path: '/departments/isc' },
    { name: 'Statistics', path: '/departments/stat' },
  ];

  const resources = [
    { name: 'Student Counseling Services', url: '#', external: true },
    { name: 'Academic Calendar 2026', url: '#', external: true },
    { name: 'CCI Curriculum Guide', url: '#', external: true },
    { name: 'Career Development Center', url: '#', external: true },
    { name: 'Registration Guidelines', url: '#', external: true },
  ];

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: About & Contact */}
          <div className="footer-column">
            <div className="footer-brand">
              <img 
                src={logo}
                alt="CCI Logo" 
                className="footer-logo"
                style={{ 
                  borderRadius: '50%', 
                  width: '60px', 
                  height: '60px',
                  objectFit: 'cover'
                }}
              />
              <div className="footer-brand-text">
                <h3 className="footer-brand-title">CCI Department Guidance</h3>
                <p className="footer-brand-subtitle">Haramaya University</p>
              </div>
            </div>
            
            <p className="footer-description">
              An intelligent guidance system helping students make informed decisions 
              when choosing their department at the College of Computing and Informatics.
            </p>

            <div className="footer-contact">
              <h4 className="footer-contact-title">Contact Information</h4>
              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">📍</span>
                  <span>Haramaya University, Dire Dawa, Ethiopia</span>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">📧</span>
                  <a href="mailto:cci@haramaya.edu.et">cci@haramaya.edu.et</a>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">📞</span>
                  <a href="tel:+251912345678">+251 91 234 5678</a>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">🌐</span>
                  <a href="https://www.haramaya.edu.et" target="_blank" rel="noopener noreferrer">
                    www.haramaya.edu.et
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Departments */}
          <div className="footer-column">
            <h4 className="footer-column-title">Departments</h4>
            <ul className="footer-links">
              {departments.map((dept) => (
                <li key={dept.path}>
                  <Link to={dept.path} className="footer-link">
                    {dept.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="footer-column">
            <h4 className="footer-column-title">Student Resources</h4>
            <ul className="footer-links">
              {resources.map((resource) => (
                <li key={resource.name}>
                  {resource.external ? (
                    <a 
                      href={resource.url} 
                      className="footer-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.name}
                      <span className="footer-external-icon">↗</span>
                    </a>
                  ) : (
                    <Link to={resource.url} className="footer-link">
                      {resource.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Feedback Button */}
            <div className="footer-feedback">
              <Link to="/feedback" className="footer-feedback-button">
                <span className="footer-feedback-icon">💬</span>
                Send Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {currentYear} Haramaya University - College of Computing and Informatics. All rights reserved.
            </p>
            <p className="footer-credits">
              Developed by ICT Center Industrial Practice Team 2026
            </p>
          </div>
          
          <div className="footer-bottom-right">
            <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
            <span className="footer-divider">•</span>
            <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
            <span className="footer-divider">•</span>
            <Link to="/accessibility" className="footer-bottom-link">Accessibility</Link>
            <span className="footer-divider">•</span>
            <Link to="/admin" className="footer-bottom-link">Admin</Link>
          </div>
        </div>
      </div>

      {/* Social Links (Optional) */}
      <div className="footer-social">
        <a 
          href="https://facebook.com/haramayauniversity" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-social-link"
          aria-label="Facebook"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a 
          href="https://twitter.com/haramayauniv" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-social-link"
          aria-label="Twitter"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
        <a 
          href="https://linkedin.com/school/haramaya-university" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-social-link"
          aria-label="LinkedIn"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a 
          href="https://youtube.com/@haramayauniversity" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-social-link"
          aria-label="YouTube"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

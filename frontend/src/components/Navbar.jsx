import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Take Assessment', path: '/assessment', icon: '📝', highlight: true },
    { name: 'Explore Departments', path: '/departments', icon: '🎓' },
    { name: 'Compare', path: '/compare', icon: '⚖️' },
    { name: 'Exit Exam Prep', path: '/exit-exam', icon: '📚' },
    { name: 'Admin', path: '/admin', icon: '👤' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo and Brand */}
          <Link to="/" className="navbar-brand">
            <img 
              src="/cci-logo.png" 
              alt="CCI Logo" 
              className="navbar-logo"
            />
            <div className="navbar-brand-text">
              <span className="navbar-brand-title">CCI Department Guidance</span>
              <span className="navbar-brand-subtitle">Haramaya University</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="navbar-links desktop-hidden">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`navbar-link ${isActive(link.path) ? 'navbar-link-active' : ''} ${link.highlight ? 'navbar-link-highlight' : ''}`}
                >
                  <span className="navbar-link-icon">{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button mobile-hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'hamburger-open' : ''}`}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Slide-Over */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <img 
              src="/cci-logo.png" 
              alt="CCI Logo" 
              className="mobile-menu-logo"
            />
            <div className="mobile-menu-brand-text">
              <span className="mobile-menu-brand-title">CCI Guidance</span>
              <span className="mobile-menu-brand-subtitle">Haramaya University</span>
            </div>
          </div>
          <button
            className="mobile-menu-close"
            onClick={toggleMobileMenu}
            aria-label="Close navigation menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="mobile-menu-links">
          {navigationLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`mobile-menu-link ${isActive(link.path) ? 'mobile-menu-link-active' : ''} ${link.highlight ? 'mobile-menu-link-highlight' : ''}`}
              >
                <span className="mobile-menu-link-icon">{link.icon}</span>
                <span className="mobile-menu-link-text">{link.name}</span>
                {isActive(link.path) && (
                  <span className="mobile-menu-link-indicator">•</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mobile-menu-footer">
          <div className="mobile-menu-footer-text">
            <p>College of Computing and Informatics</p>
            <p className="mobile-menu-footer-small">Building your future in technology</p>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;

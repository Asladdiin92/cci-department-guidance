import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDepartments } from '../services/api';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
      setError('Failed to load departments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading departments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <button
            onClick={fetchDepartments}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our <span className="text-gradient">Departments</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Choose from 6 specialized departments in the College of Computing and Informatics.
            Each program offers unique opportunities to shape your tech career.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 p-6 bg-surface/50 rounded-lg backdrop-blur-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{departments.length}</div>
            <div className="text-sm text-text-secondary">Departments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">4</div>
            <div className="text-sm text-text-secondary">Years Program</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">100+</div>
            <div className="text-sm text-text-secondary">Career Paths</div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Not sure which department is right for you?</h2>
          <p className="text-text-secondary mb-6">
            Take our personalized assessment to discover your perfect fit!
          </p>
          <Link to="/assessment" className="btn btn-primary">
            Take Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}

function DepartmentCard({ department }) {
  const { code, name, description, career_paths } = department;

  // Department color mapping
  const colorMap = {
    CS: 'from-blue-500 to-purple-500',
    SWE: 'from-green-500 to-teal-500',
    IT: 'from-orange-500 to-red-500',
    IS: 'from-yellow-500 to-orange-500',
    ISC: 'from-purple-500 to-pink-500',
    STAT: 'from-cyan-500 to-blue-500',
  };

  const gradient = colorMap[code] || 'from-primary to-secondary';

  return (
    <div className="group relative bg-surface rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Gradient Header */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
      
      {/* Content */}
      <div className="p-6">
        {/* Department Code Badge */}
        <div className="flex items-start justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${gradient} text-white`}>
            {code}
          </span>
          <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
            {getIcon(code)}
          </span>
        </div>

        {/* Department Name */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Career Paths */}
        {career_paths && career_paths.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-text-secondary mb-2">Sample Career Paths:</p>
            <div className="flex flex-wrap gap-2">
              {career_paths.slice(0, 3).map((path, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-background rounded-full text-text-secondary"
                >
                  {path}
                </span>
              ))}
              {career_paths.length > 3 && (
                <span className="text-xs px-2 py-1 text-primary">
                  +{career_paths.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Learn More Button */}
        <Link
          to={`/departments/${code}`}
          className="inline-flex items-center text-primary hover:text-primary-dark transition-colors text-sm font-medium group"
        >
          Learn More
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Hover Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}></div>
    </div>
  );
}

// Helper function to get icon for each department
function getIcon(code) {
  const icons = {
    CS: '💻',
    SWE: '⚙️',
    IT: '🌐',
    IS: '📊',
    ISC: '📚',
    STAT: '📈',
  };
  return icons[code] || '🎓';
}

export default Departments;

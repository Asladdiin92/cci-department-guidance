import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getDepartments } from '../services/api';

// Department metadata for filtering and badges
const DEPARTMENT_METADATA = {
  CS: {
    mathIntensity: 'High',
    codingLevel: 'High',
    theoryPractice: '70/30',
    tags: ['Algorithm Design', 'Theoretical Computing', 'Research-Focused', 'Math Heavy'],
    focus: 'Theory & Algorithms'
  },
  SWE: {
    mathIntensity: 'Medium',
    codingLevel: 'Very High',
    theoryPractice: '30/70',
    tags: ['High Programming', 'Software Development', 'Project-Based', 'Practical'],
    focus: 'Building Software'
  },
  IT: {
    mathIntensity: 'Low',
    codingLevel: 'Medium',
    theoryPractice: '20/80',
    tags: ['Infrastructure', 'Networks', 'Cloud Computing', 'Hands-On'],
    focus: 'Systems & Networks'
  },
  IS: {
    mathIntensity: 'Low',
    codingLevel: 'Medium',
    theoryPractice: '40/60',
    tags: ['Business & Systems', 'Database Management', 'ERP', 'Analysis'],
    focus: 'Business Technology'
  },
  ISC: {
    mathIntensity: 'Low',
    codingLevel: 'Low',
    theoryPractice: '60/40',
    tags: ['Information Organization', 'Digital Libraries', 'Knowledge Management', 'Research'],
    focus: 'Information Management'
  },
  STAT: {
    mathIntensity: 'Very High',
    codingLevel: 'Medium',
    theoryPractice: '50/50',
    tags: ['Data & AI', 'Statistical Modeling', 'Research', 'Math Heavy'],
    focus: 'Data Science'
  }
};

// Filter categories
const FILTER_OPTIONS = [
  { id: 'all', label: 'All Departments', icon: '🎓' },
  { id: 'high-programming', label: 'High Programming', icon: '💻', match: dept => ['SWE', 'CS'].includes(dept.code) },
  { id: 'business-systems', label: 'Business & Systems', icon: '📊', match: dept => ['IS', 'ISC'].includes(dept.code) },
  { id: 'data-ai', label: 'Data & AI', icon: '🤖', match: dept => ['STAT', 'CS'].includes(dept.code) },
  { id: 'low-math', label: 'Low Math', icon: '➗', match: dept => ['IT', 'IS', 'ISC'].includes(dept.code) },
  { id: 'practical', label: 'Hands-On', icon: '🛠️', match: dept => {
    const meta = DEPARTMENT_METADATA[dept.code];
    return meta && parseInt(meta.theoryPractice.split('/')[1]) >= 60;
  }}
];

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDepartments();
      // Enrich with metadata
      const enrichedData = data.map(dept => ({
        ...dept,
        metadata: DEPARTMENT_METADATA[dept.code] || {}
      }));
      setDepartments(enrichedData);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
      setError('Failed to load departments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filtered departments based on search and active filter
  const filteredDepartments = useMemo(() => {
    let filtered = departments;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dept => 
        dept.name.toLowerCase().includes(query) ||
        dept.code.toLowerCase().includes(query) ||
        dept.description.toLowerCase().includes(query) ||
        dept.metadata.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      const filterOption = FILTER_OPTIONS.find(f => f.id === activeFilter);
      if (filterOption?.match) {
        filtered = filtered.filter(filterOption.match);
      }
    }

    return filtered;
  }, [departments, searchQuery, activeFilter]);

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
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Department <span className="text-gradient">Explorer</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Discover your perfect fit among 6 specialized departments. Filter by skills, interests, and career goals.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search departments, careers, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-12 bg-surface border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-surface hover:bg-gray-100 text-text-secondary hover:text-primary'
              }`}
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-text-secondary">
            Showing <span className="font-bold text-primary">{filteredDepartments.length}</span> of {departments.length} departments
          </p>
        </div>

        {/* Departments Grid */}
        {filteredDepartments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No departments found</h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Still unsure which department is right for you?</h2>
          <p className="text-text-secondary mb-6">
            Take our personalized assessment to discover your perfect fit in under 5 minutes!
          </p>
          <Link to="/assessment" className="btn btn-primary">
            Take Assessment →
          </Link>
        </div>
      </div>
    </div>
  );
}

function DepartmentCard({ department }) {
  const { code, name, description, career_paths, metadata } = department;

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

  // Badge colors based on intensity
  const getMathBadgeColor = (intensity) => {
    const colors = {
      'Very High': 'bg-red-100 text-red-700 border-red-300',
      'High': 'bg-orange-100 text-orange-700 border-orange-300',
      'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Low': 'bg-green-100 text-green-700 border-green-300'
    };
    return colors[intensity] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getCodingBadgeColor = (level) => {
    const colors = {
      'Very High': 'bg-purple-100 text-purple-700 border-purple-300',
      'High': 'bg-blue-100 text-blue-700 border-blue-300',
      'Medium': 'bg-teal-100 text-teal-700 border-teal-300',
      'Low': 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return colors[level] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <Link
      to={`/departments/${code}`}
      className="group relative bg-surface rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
    >
      {/* Gradient Header */}
      <div className={`h-3 bg-gradient-to-r ${gradient}`}></div>
      
      {/* Content */}
      <div className="p-6">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`px-3 py-1 rounded-lg text-sm font-bold bg-gradient-to-r ${gradient} text-white shadow-sm`}>
              {code}
            </span>
          </div>
          <span className="text-3xl opacity-60 group-hover:scale-110 transition-transform">
            {getIcon(code)}
          </span>
        </div>

        {/* Department Name & Focus */}
        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-primary mb-3 font-medium">
          {metadata.focus}
        </p>

        {/* Tag Badges - Key Metrics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Math Intensity */}
          <span className={`text-xs px-2 py-1 rounded-md border ${getMathBadgeColor(metadata.mathIntensity)}`}>
            📐 Math: {metadata.mathIntensity}
          </span>
          
          {/* Coding Level */}
          <span className={`text-xs px-2 py-1 rounded-md border ${getCodingBadgeColor(metadata.codingLevel)}`}>
            💻 Code: {metadata.codingLevel}
          </span>
          
          {/* Theory/Practice Ratio */}
          <span className="text-xs px-2 py-1 rounded-md border bg-indigo-100 text-indigo-700 border-indigo-300">
            ⚖️ {metadata.theoryPractice}
          </span>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {metadata.tags?.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-background rounded-full text-text-secondary border border-gray-200"
            >
              {tag}
            </span>
          ))}
          {metadata.tags?.length > 2 && (
            <span className="text-xs px-2 py-1 text-primary font-medium">
              +{metadata.tags.length - 2}
            </span>
          )}
        </div>

        {/* Sample Career Paths */}
        {career_paths && career_paths.length > 0 && (
          <div className="mb-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-text-secondary mb-2 font-medium">Top Careers:</p>
            <div className="flex flex-col gap-1">
              {career_paths.slice(0, 2).map((path, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-primary mr-2 text-xs">→</span>
                  <span className="text-xs text-text-secondary">{path}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learn More Link */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm font-medium text-primary group-hover:text-primary-dark transition-colors">
            Explore Program
          </span>
          <svg
            className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform"
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
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}></div>
    </Link>
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

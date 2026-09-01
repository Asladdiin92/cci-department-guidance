import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDepartment } from '../services/api';
import { CAREER_PATHWAYS, DEPARTMENT_FIT_CHECKLIST, KEY_TRAITS } from '../data/careerData';

function DepartmentDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDepartment();
  }, [code]);

  const fetchDepartment = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDepartment(code);
      setDepartment(data);
    } catch (err) {
      console.error('Failed to fetch department:', err);
      setError('Department not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading department details...</p>
        </div>
      </div>
    );
  }

  if (error || !department) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-4">Department Not Found</h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <Link to="/departments" className="btn btn-primary">
            Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  const colorMap = {
    CS: 'from-blue-500 to-purple-500',
    SWE: 'from-green-500 to-teal-500',
    IT: 'from-orange-500 to-red-500',
    IS: 'from-yellow-500 to-orange-500',
    ISC: 'from-purple-500 to-pink-500',
    STAT: 'from-cyan-500 to-blue-500',
  };

  const gradient = colorMap[department.code] || 'from-primary to-secondary';

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/departments')}
          className="mb-6 flex items-center text-text-secondary hover:text-primary transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Departments
        </button>

        {/* Header Section */}
        <div className={`relative bg-gradient-to-r ${gradient} rounded-xl p-8 mb-8 text-white overflow-hidden`}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                {department.code}
              </span>
              <span className="text-5xl opacity-30">{getIcon(department.code)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {department.name}
            </h1>
            <p className="text-lg opacity-90 max-w-3xl">
              {department.description}
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon="🎓"
            title="Program Duration"
            value="4 Years"
            subtitle="Bachelor's Degree"
          />
          <StatCard
            icon="💼"
            title="Career Paths"
            value={department.career_paths?.length || 'Multiple'}
            subtitle="Opportunities"
          />
          <StatCard
            icon="📚"
            title="Curriculum"
            value="120+ Credits"
            subtitle="Core & Electives"
          />
        </div>

        {/* Career Paths Section */}
        {department.career_paths && department.career_paths.length > 0 && (
          <div className="bg-surface rounded-xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">💼</span>
              <h2 className="text-2xl font-bold">Career Opportunities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {department.career_paths.map((path, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-background rounded-lg hover:bg-background/50 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-text">{path}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What You'll Learn Section */}
        <div className="bg-surface rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">📖</span>
            <h2 className="text-2xl font-bold">What You'll Learn</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getLearningAreas(department.code).map((area, index) => (
              <div key={index} className="flex items-start">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold mr-4 flex-shrink-0`}>
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{area.title}</h3>
                  <p className="text-text-secondary text-sm">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills You'll Develop */}
        <div className="bg-surface rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">⚡</span>
            <h2 className="text-2xl font-bold">Skills You'll Develop</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {getSkills(department.code).map((skill, index) => (
              <span
                key={index}
                className={`px-4 py-2 bg-gradient-to-r ${gradient} text-white rounded-full text-sm font-medium`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Is This Department For You? */}
        <div className="bg-surface rounded-xl p-8 mb-8 border-2 border-primary/20">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">✅</span>
            <h2 className="text-2xl font-bold">Is This Department For You?</h2>
          </div>
          
          {/* Key Traits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3 text-primary">Strengths Needed</h3>
              <ul className="space-y-2">
                {KEY_TRAITS[department.code]?.strengths.map((trait, index) => (
                  <li key={index} className="text-sm text-text-secondary flex items-start">
                    <span className="text-primary mr-2">💪</span>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-primary">Common Interests</h3>
              <ul className="space-y-2">
                {KEY_TRAITS[department.code]?.interests.map((interest, index) => (
                  <li key={index} className="text-sm text-text-secondary flex items-start">
                    <span className="text-primary mr-2">🎯</span>
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-primary">Personality Traits</h3>
              <ul className="space-y-2">
                {KEY_TRAITS[department.code]?.personality.map((trait, index) => (
                  <li key={index} className="text-sm text-text-secondary flex items-start">
                    <span className="text-primary mr-2">⭐</span>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Self-Check Indicators */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-semibold mb-4">Self-Check: You might be a great fit if...</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DEPARTMENT_FIT_CHECKLIST[department.code]?.map((indicator, index) => (
                <label key={index} className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-1 mr-3 w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text transition-colors">
                    {indicator}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-4 text-sm text-primary font-medium">
              ✨ Check 4 or more? This department is likely a strong match for you!
            </p>
          </div>
        </div>

        {/* Career Pathway Matrix */}
        <div className="bg-surface rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">💼</span>
            <h2 className="text-2xl font-bold">Career Pathway Matrix</h2>
          </div>
          <p className="text-text-secondary mb-6">
            Explore job roles, salary ranges (in Ethiopian Birr), and career progression opportunities.
          </p>
          
          {/* Career Cards */}
          <div className="space-y-4">
            {CAREER_PATHWAYS[department.code]?.careers.map((career, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold mb-1">{career.title}</h3>
                    <p className="text-sm text-text-secondary">{career.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">Entry Level (0-2 years)</div>
                      <div className="font-semibold text-green-600">ETB {career.entryLevel}/month</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                      <span className="text-2xl">👔</span>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary">Senior Level (5+ years)</div>
                      <div className="font-semibold text-purple-600">ETB {career.seniorLevel}/month</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Salary Growth Note */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>💡 Note:</strong> Salary ranges reflect current Ethiopian market rates (2026) and vary based on company size, 
              location (Addis Ababa vs. regions), experience, and specific technical skills.
            </p>
          </div>
        </div>

        {/* Top Employers in Ethiopia */}
        <div className="bg-surface rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">🏢</span>
            <h2 className="text-2xl font-bold">Top Employers in Ethiopia</h2>
          </div>
          <p className="text-text-secondary mb-6">
            Major organizations actively hiring {department.code} graduates
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAREER_PATHWAYS[department.code]?.employers.map((employer, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-100 text-center"
              >
                <div className="text-4xl mb-2">{employer.logo}</div>
                <h3 className="font-semibold mb-1">{employer.name}</h3>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {employer.type}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>🎯 Job Market Insight:</strong> The Ethiopian tech industry is rapidly growing, 
              with increasing demand for skilled {department.code} professionals. International companies 
              are also establishing presence in Ethiopia, creating new opportunities.
            </p>
          </div>
        </div>

        {/* Why Choose This Department */}
        <div className="bg-surface rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">⭐</span>
            <h2 className="text-2xl font-bold">Why Choose {department.code}?</h2>
          </div>
          <div className="space-y-4">
            {getWhyChoose(department.code).map((reason, index) => (
              <div key={index} className="flex items-start">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} mt-2 mr-4 flex-shrink-0`}></div>
                <p className="text-text-secondary">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`bg-gradient-to-r ${gradient} rounded-xl p-8 text-white text-center`}>
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="mb-6 opacity-90">
            Take our personalized assessment to see if {department.name} is the right fit for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/assessment"
              className="px-6 py-3 bg-white text-background font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Take Assessment
            </Link>
            <Link
              to="/departments"
              className="px-6 py-3 bg-white/20 backdrop-blur-sm font-semibold rounded-lg hover:bg-white/30 transition-colors"
            >
              Compare Departments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="bg-surface rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-sm text-text-secondary mb-1">{title}</div>
      <div className="text-2xl font-bold text-primary mb-1">{value}</div>
      <div className="text-xs text-text-secondary">{subtitle}</div>
    </div>
  );
}

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

function getLearningAreas(code) {
  const areas = {
    CS: [
      { title: 'Algorithms & Data Structures', description: 'Master efficient problem-solving and computational thinking' },
      { title: 'Artificial Intelligence', description: 'Explore machine learning and intelligent systems' },
      { title: 'Theory of Computation', description: 'Understand the mathematical foundations of computing' },
      { title: 'Computer Architecture', description: 'Learn how computers work at the hardware level' },
    ],
    SWE: [
      { title: 'Software Development', description: 'Build robust applications using modern frameworks' },
      { title: 'Software Architecture', description: 'Design scalable and maintainable systems' },
      { title: 'DevOps & CI/CD', description: 'Automate deployment and infrastructure management' },
      { title: 'Quality Assurance', description: 'Implement testing strategies and ensure software quality' },
    ],
    IT: [
      { title: 'Network Administration', description: 'Manage and secure computer networks' },
      { title: 'Cybersecurity', description: 'Protect systems from threats and vulnerabilities' },
      { title: 'Cloud Computing', description: 'Deploy and manage cloud infrastructure' },
      { title: 'Systems Administration', description: 'Configure and maintain IT infrastructure' },
    ],
    IS: [
      { title: 'Business Analysis', description: 'Bridge technology and business requirements' },
      { title: 'Database Management', description: 'Design and optimize data storage solutions' },
      { title: 'Enterprise Systems', description: 'Implement ERP and business software' },
      { title: 'Project Management', description: 'Lead IT projects from conception to delivery' },
    ],
    ISC: [
      { title: 'Information Retrieval', description: 'Build search engines and recommendation systems' },
      { title: 'Data Curation', description: 'Organize and preserve digital information' },
      { title: 'User Experience', description: 'Design intuitive interfaces and interactions' },
      { title: 'Information Architecture', description: 'Structure information for optimal access' },
    ],
    STAT: [
      { title: 'Statistical Methods', description: 'Apply statistical techniques to real-world problems' },
      { title: 'Data Analysis', description: 'Extract insights from complex datasets' },
      { title: 'Probability Theory', description: 'Understand randomness and uncertainty' },
      { title: 'Research Methods', description: 'Design experiments and interpret results' },
    ],
  };
  return areas[code] || [];
}

function getSkills(code) {
  const skills = {
    CS: ['Python', 'Java', 'C++', 'Machine Learning', 'Algorithms', 'Data Structures', 'AI', 'Research'],
    SWE: ['JavaScript', 'React', 'Node.js', 'Docker', 'Git', 'Agile', 'Testing', 'CI/CD'],
    IT: ['Networking', 'Linux', 'Security', 'Cloud (AWS/Azure)', 'Troubleshooting', 'Virtualization'],
    IS: ['SQL', 'Business Analysis', 'ERP Systems', 'Project Management', 'Requirements Engineering'],
    ISC: ['Information Architecture', 'UX Design', 'Metadata', 'Search Systems', 'Content Management'],
    STAT: ['R', 'Python', 'Statistical Modeling', 'Data Visualization', 'Probability', 'Research Design'],
  };
  return skills[code] || [];
}

function getWhyChoose(code) {
  const reasons = {
    CS: [
      'Strong theoretical foundation for research and innovation in computing',
      'Excellent preparation for graduate studies in AI, ML, and computer science',
      'High demand for algorithm experts and computational thinkers',
      'Opportunities to work on cutting-edge technologies and research projects',
    ],
    SWE: [
      'Focus on practical software development skills used in industry',
      'Learn modern development methodologies and best practices',
      'High job placement rates in tech companies',
      'Build a strong portfolio of real-world projects',
    ],
    IT: [
      'Comprehensive understanding of IT infrastructure and networks',
      'Hands-on experience with industry-standard tools and technologies',
      'Strong job market for network and systems administrators',
      'Critical role in every modern organization',
    ],
    IS: [
      'Bridge between business needs and technology solutions',
      'Develop both technical and business analysis skills',
      'Work in diverse industries and sectors',
      'Project management and leadership opportunities',
    ],
    ISC: [
      'Unique blend of information science and user experience',
      'Work with data organization and digital libraries',
      'Growing field with increasing demand',
      'Contribute to making information accessible to all',
    ],
    STAT: [
      'Essential skills for data-driven decision making',
      'Applications across all fields: business, science, healthcare',
      'Strong foundation for careers in data science and analytics',
      'Critical thinking and problem-solving expertise',
    ],
  };
  return reasons[code] || [];
}

export default DepartmentDetails;

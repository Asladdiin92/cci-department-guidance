import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getDepartment } from '../services/api';
import { 
  INTENSITY_METRICS, 
  KEY_DIFFERENTIATORS, 
  COMPARISON_CATEGORIES,
  QUICK_COMPARISONS,
  DEPARTMENT_OPTIONS 
} from '../data/comparisonData';
import { CAREER_PATHWAYS } from '../data/careerData';

function Compare() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const deptCodes = searchParams.get('departments')?.split(',').filter(Boolean) || [];
    
    if (deptCodes.length === 0) {
      setShowSelector(true);
      setLoading(false);
      return;
    }

    if (deptCodes.length < 2) {
      setError('Please select at least 2 departments to compare');
      setShowSelector(true);
      setLoading(false);
      return;
    }

    if (deptCodes.length > 3) {
      setError('You can compare up to 3 departments at once');
      setLoading(false);
      return;
    }

    setSelectedDepts(deptCodes);
    loadDepartments(deptCodes);
  }, [searchParams]);

  const loadDepartments = async (codes) => {
    try {
      setLoading(true);
      setError(null);
      const promises = codes.map(code => getDepartment(code));
      const results = await Promise.all(promises);
      setDepartments(results);
      setShowSelector(false);
    } catch (err) {
      console.error('Error loading departments:', err);
      setError('Failed to load departments for comparison. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentToggle = (code) => {
    let newSelected = [...selectedDepts];
    
    if (newSelected.includes(code)) {
      newSelected = newSelected.filter(c => c !== code);
    } else {
      if (newSelected.length < 3) {
        newSelected.push(code);
      }
    }
    
    setSelectedDepts(newSelected);
  };

  const handleCompare = () => {
    if (selectedDepts.length < 2) {
      setError('Please select at least 2 departments');
      return;
    }
    setSearchParams({ departments: selectedDepts.join(',') });
  };

  const handleChangeSelection = () => {
    setShowSelector(true);
    setDepartments([]);
  };

  // Department Selector View
  if (showSelector || departments.length === 0) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⚖️</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Compare <span className="text-gradient">Departments</span>
            </h1>
            <p className="text-text-secondary text-lg">
              Select 2 or 3 departments to see side-by-side comparison
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-800">
              ⚠️ {error}
            </div>
          )}

          {/* Selection Progress */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-text-secondary">Selected Departments</span>
              <span className="text-2xl font-bold text-primary">{selectedDepts.length}/3</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${(selectedDepts.length / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Department Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {DEPARTMENT_OPTIONS.map((dept) => {
              const isSelected = selectedDepts.includes(dept.code);
              const isDisabled = !isSelected && selectedDepts.length >= 3;
              
              return (
                <button
                  key={dept.code}
                  onClick={() => !isDisabled && handleDepartmentToggle(dept.code)}
                  disabled={isDisabled}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-lg scale-105'
                      : isDisabled
                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 bg-white hover:border-primary hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">{dept.code}</span>
                    {isSelected && <span className="text-2xl">✓</span>}
                  </div>
                  <div className={`text-sm ${isSelected ? 'text-white' : 'text-text-secondary'}`}>
                    {dept.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Comparison Hints */}
          {selectedDepts.length === 2 && (
            <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>💡 Quick comparison:</strong>{' '}
                {QUICK_COMPARISONS[selectedDepts.sort().join('-')] || 'Compare these two departments'}
              </p>
            </div>
          )}

          {/* Compare Button */}
          <div className="text-center">
            <button
              onClick={handleCompare}
              disabled={selectedDepts.length < 2}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                selectedDepts.length >= 2
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-xl hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {selectedDepts.length < 2
                ? `Select ${2 - selectedDepts.length} more department${2 - selectedDepts.length > 1 ? 's' : ''}`
                : `Compare ${selectedDepts.length} Departments →`
              }
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading comparison...</p>
        </div>
      </div>
    );
  }

  // Get key differentiator if comparing 2 specific departments
  const comparisonKey = departments.length === 2 
    ? `${departments[0].code}_vs_${departments[1].code}`
    : null;
  const differentiator = comparisonKey ? KEY_DIFFERENTIATORS[comparisonKey] : null;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Side-by-Side <span className="text-gradient">Comparison</span>
          </h1>
          <p className="text-text-secondary text-lg mb-4">
            {departments.map(d => d.name).join(' vs. ')}
          </p>
          <button
            onClick={handleChangeSelection}
            className="text-primary hover:text-primary-dark font-medium"
          >
            ← Change Selection
          </button>
        </div>

        {/* Key Differentiator Card (for 2-dept comparisons) */}
        {differentiator && (
          <KeyDifferentiatorCard differentiator={differentiator} departments={departments} />
        )}

        {/* Intensity Sliders */}
        <IntensityComparison departments={departments} />

        {/* Detailed Comparison Sections */}
        <DetailedComparison departments={departments} />

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {departments.map((dept) => (
            <button
              key={dept.code}
              onClick={() => navigate(`/departments/${dept.code}`)}
              className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-medium transition-all"
            >
              View {dept.code} Full Details
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Key Differentiator Card Component
function KeyDifferentiatorCard({ differentiator, departments }) {
  const dept1 = departments[0];
  const dept2 = departments[1];
  const data1 = differentiator[dept1.code.toLowerCase()];
  const data2 = differentiator[dept2.code.toLowerCase()];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8 border-2 border-primary/20">
      <h2 className="text-2xl font-bold text-center mb-6">{differentiator.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department 1 */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-blue-600">{dept1.name}</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
              {dept1.code}
            </span>
          </div>
          <div className="mb-4">
            <span className="text-sm text-text-secondary">Primary Focus</span>
            <p className="text-lg font-semibold text-primary">{data1.focus}</p>
          </div>
          <div className="mb-4">
            <span className="text-sm text-text-secondary font-medium">Key Strengths</span>
            <ul className="mt-2 space-y-2">
              {data1.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Best for:</strong> {data1.bestFor}
            </p>
          </div>
        </div>

        {/* Department 2 */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-purple-600">{dept2.name}</h3>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
              {dept2.code}
            </span>
          </div>
          <div className="mb-4">
            <span className="text-sm text-text-secondary">Primary Focus</span>
            <p className="text-lg font-semibold text-primary">{data2.focus}</p>
          </div>
          <div className="mb-4">
            <span className="text-sm text-text-secondary font-medium">Key Strengths</span>
            <ul className="mt-2 space-y-2">
              {data2.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>Best for:</strong> {data2.bestFor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Intensity Comparison Component with Sliders
function IntensityComparison({ departments }) {
  const metrics = ['math', 'coding', 'business', 'hardware'];
  const metricLabels = {
    math: { label: 'Math Intensity', icon: '📐', color: 'blue' },
    coding: { label: 'Coding Level', icon: '💻', color: 'green' },
    business: { label: 'Business Focus', icon: '📊', color: 'yellow' },
    hardware: { label: 'Hardware/Infrastructure', icon: '🖥️', color: 'orange' }
  };

  const getBarColor = (value, color) => {
    if (value >= 80) return `bg-${color}-600`;
    if (value >= 60) return `bg-${color}-500`;
    if (value >= 40) return `bg-${color}-400`;
    return `bg-${color}-300`;
  };

  return (
    <div className="bg-surface rounded-xl p-8 mb-8">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">📊</span>
        <h2 className="text-2xl font-bold">Intensity Comparison</h2>
      </div>
      <p className="text-text-secondary mb-6">Visual comparison of key program characteristics (0-100 scale)</p>

      <div className="space-y-6">
        {metrics.map(metric => {
          const config = metricLabels[metric];
          
          return (
            <div key={metric} className="bg-white rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">{config.icon}</span>
                <h3 className="font-semibold text-lg">{config.label}</h3>
              </div>

              <div className="space-y-4">
                {departments.map((dept, idx) => {
                  const value = INTENSITY_METRICS[dept.code]?.[metric] || 0;
                  const colors = ['blue', 'purple', 'green'];
                  const color = colors[idx];
                  
                  return (
                    <div key={dept.code}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{dept.code}</span>
                        <span className="text-sm font-bold text-primary">{value}%</span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${color}-500 transition-all duration-500 flex items-center justify-end pr-2`}
                          style={{ width: `${value}%` }}
                        >
                          {value > 15 && (
                            <span className="text-xs text-white font-bold">{value}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Detailed Comparison Component
function DetailedComparison({ departments }) {
  return (
    <div className="space-y-6">
      {/* Career Paths Comparison */}
      <div className="bg-surface rounded-xl p-8">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3">💼</span>
          <h2 className="text-2xl font-bold">Career Opportunities</h2>
        </div>

        <div className="grid grid-cols-1 gap-6" style={{ gridTemplateColumns: `repeat(${departments.length}, 1fr)` }}>
          {departments.map((dept, idx) => (
            <div key={dept.code} className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4 text-primary">{dept.name}</h3>
              <div className="space-y-2">
                {CAREER_PATHWAYS[dept.code]?.careers.slice(0, 5).map((career, careerIdx) => (
                  <div key={careerIdx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-sm">{career.title}</div>
                    <div className="text-xs text-text-secondary mt-1">
                      Entry: ETB {career.entryLevel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Courses Comparison */}
      <div className="bg-surface rounded-xl p-8">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3">📚</span>
          <h2 className="text-2xl font-bold">Sample Courses</h2>
        </div>

        <div className="grid grid-cols-1 gap-6" style={{ gridTemplateColumns: `repeat(${departments.length}, 1fr)` }}>
          {departments.map((dept) => (
            <div key={dept.code} className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4 text-primary">{dept.name}</h3>
              <ul className="space-y-2">
                {dept.core_courses?.slice(0, 6).map((course, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <span className="text-primary mr-2">→</span>
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Comparison */}
      <div className="bg-surface rounded-xl p-8">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3">⚡</span>
          <h2 className="text-2xl font-bold">Required Skills</h2>
        </div>

        <div className="grid grid-cols-1 gap-6" style={{ gridTemplateColumns: `repeat(${departments.length}, 1fr)` }}>
          {departments.map((dept) => (
            <div key={dept.code} className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4 text-primary">{dept.name}</h3>
              <div className="flex flex-wrap gap-2">
                {dept.required_skills?.slice(0, 8).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Compare;

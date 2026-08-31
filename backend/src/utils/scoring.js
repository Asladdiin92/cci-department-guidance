/**
 * Scoring Algorithm for Department Recommendations
 * Calculates department scores based on student responses
 */

/**
 * Calculate department scores from assessment responses
 * @param {Array} responses - Array of assessment responses with option scores
 * @returns {Array} Ranked department recommendations
 */
const calculateDepartmentScores = (responses) => {
  // Initialize score accumulator for each department
  const departmentScores = {
    CS: 0,
    SWE: 0,
    IT: 0,
    IS: 0,
    ISC: 0,
    STAT: 0
  };

  // Track category weights for balanced scoring
  const categoryCount = {
    problem_solving: 0,
    interests: 0,
    career_goals: 0,
    learning_style: 0,
    skills: 0
  };

  // Accumulate scores from each response
  responses.forEach(response => {
    const { scores, category } = response;
    
    if (scores && typeof scores === 'object') {
      // Add scores for each department
      Object.keys(departmentScores).forEach(dept => {
        const score = scores[dept] || 0;
        departmentScores[dept] += score;
      });

      // Track category distribution
      if (category && categoryCount.hasOwnProperty(category)) {
        categoryCount[category]++;
      }
    }
  });

  // Calculate total possible score
  const totalResponses = responses.length;
  const maxScorePerQuestion = 3; // Max score per department per question
  const maxTotalScore = totalResponses * maxScorePerQuestion;

  // Convert to array and calculate match percentages
  const recommendations = Object.entries(departmentScores).map(([dept, score]) => {
    const matchPercentage = maxTotalScore > 0 
      ? Math.round((score / maxTotalScore) * 100) 
      : 0;

    return {
      department_code: dept,
      score: score,
      match_percentage: Math.min(matchPercentage, 100), // Cap at 100%
      raw_score: score
    };
  });

  // Sort by score (descending) and assign ranks
  recommendations.sort((a, b) => b.score - a.score);
  
  recommendations.forEach((rec, index) => {
    rec.rank = index + 1;
  });

  return {
    recommendations,
    metadata: {
      total_responses: totalResponses,
      max_possible_score: maxTotalScore,
      category_distribution: categoryCount
    }
  };
};

/**
 * Calculate confidence level based on score distribution
 * @param {Array} recommendations - Ranked recommendations
 * @returns {String} Confidence level (HIGH, MEDIUM, LOW)
 */
const calculateConfidence = (recommendations) => {
  if (recommendations.length < 2) return 'LOW';

  const topScore = recommendations[0].score;
  const secondScore = recommendations[1].score;
  
  // Calculate score difference percentage
  const scoreDiff = topScore - secondScore;
  const diffPercentage = topScore > 0 ? (scoreDiff / topScore) * 100 : 0;

  // Determine confidence based on score separation
  if (diffPercentage >= 20) return 'HIGH';
  if (diffPercentage >= 10) return 'MEDIUM';
  return 'LOW';
};

/**
 * Generate recommendation insights
 * @param {Object} topRecommendation - Top ranked department
 * @param {Array} allRecommendations - All department recommendations
 * @returns {Object} Insights and suggestions
 */
const generateInsights = (topRecommendation, allRecommendations) => {
  const insights = {
    primary_match: topRecommendation.department_code,
    match_strength: topRecommendation.match_percentage,
    confidence: calculateConfidence(allRecommendations),
    alternative_options: []
  };

  // Find strong alternative options (within 15% of top score)
  const threshold = topRecommendation.score * 0.85;
  insights.alternative_options = allRecommendations
    .filter(rec => 
      rec.department_code !== topRecommendation.department_code && 
      rec.score >= threshold
    )
    .map(rec => rec.department_code);

  // Add interpretation message
  if (insights.match_strength >= 75) {
    insights.interpretation = 'Excellent match! Your responses strongly align with this department.';
  } else if (insights.match_strength >= 60) {
    insights.interpretation = 'Good match! This department suits your interests and skills well.';
  } else if (insights.match_strength >= 45) {
    insights.interpretation = 'Moderate match. Consider exploring this department along with alternatives.';
  } else {
    insights.interpretation = 'Multiple departments may suit you. Review all options carefully.';
  }

  return insights;
};

/**
 * Validate scoring data integrity
 * @param {Array} responses - Response array to validate
 * @returns {Object} Validation result
 */
const validateScoringData = (responses) => {
  const issues = [];
  
  if (!Array.isArray(responses) || responses.length === 0) {
    return { valid: false, issues: ['No responses provided'] };
  }

  responses.forEach((response, index) => {
    if (!response.scores || typeof response.scores !== 'object') {
      issues.push(`Response ${index + 1}: Missing or invalid scores object`);
    }
  });

  return {
    valid: issues.length === 0,
    issues
  };
};

module.exports = {
  calculateDepartmentScores,
  calculateConfidence,
  generateInsights,
  validateScoringData
};

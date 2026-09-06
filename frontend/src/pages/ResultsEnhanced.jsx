/**
 * Enhanced Results Dashboard - Day 4
 * Clear, interactive visuals with actionable insights
 * Focus: Making complex data understandable and actionable
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Stack,
  Chip,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import {
  EmojiEvents,
  Download,
  RestartAlt,
  CompareArrows,
  Psychology,
  TrendingUp,
} from '@mui/icons-material';
import { getAssessmentResults } from '../services/api';
import MatchBarChart from '../components/MatchBarChart';
import SkillsRadarChart from '../components/SkillsRadarChart';
import DepartmentResultCard from '../components/DepartmentResultCard';
import ComparisonView from '../components/ComparisonView';
import NextStepsSection from '../components/NextStepsSection';

const ResultsEnhanced = () => {
  const theme = useTheme();
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await getAssessmentResults(assessmentId);
        setResults(data);
      } catch (err) {
        setError(err.message || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    if (assessmentId) {
      fetchResults();
    }
  }, [assessmentId]);

  const handleDownloadReport = () => {
    // TODO: Implement PDF download
    console.log('Download report clicked');
    alert('PDF download feature coming soon!');
  };

  const handleRetakeAssessment = () => {
    navigate('/assessment');
  };

  const handleCompare = () => {
    navigate('/compare');
  };

  // Loading State
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
          Analyzing your results...
        </Typography>
      </Container>
    );
  }

  // Error State
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/assessment')}>
          Take Assessment
        </Button>
      </Container>
    );
  }

  // No Results
  if (!results || !results.recommendations || results.recommendations.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="info">
          No results found. Please take the assessment first.
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/assessment')}
          sx={{ mt: 2 }}
        >
          Take Assessment
        </Button>
      </Container>
    );
  }

  const topMatch = results.recommendations[0];
  const top2Departments = results.recommendations.slice(0, 2);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Chip
            icon={<EmojiEvents />}
            label="Your Results Are Ready!"
            color="primary"
            sx={{
              mb: 2,
              px: 2,
              py: 3,
              fontSize: '1rem',
              fontWeight: 700,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Your Perfect Match
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
          >
            Based on your interests, skills, and career goals, we've identified the best
            computing departments for you.
          </Typography>

          {/* Quick Actions */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Download />}
              onClick={handleDownloadReport}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'none',
              }}
            >
              Download Report
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<CompareArrows />}
              onClick={handleCompare}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'none',
              }}
            >
              Compare Departments
            </Button>
            <Button
              variant="text"
              size="large"
              startIcon={<RestartAlt />}
              onClick={handleRetakeAssessment}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Retake Assessment
            </Button>
          </Stack>
        </Box>

        {/* Top Match Highlight */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 4,
            border: `3px solid ${theme.palette.primary.main}`,
            bgcolor: alpha(theme.palette.primary.main, 0.04),
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            }}
          />
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <EmojiEvents sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700 }}>
                Your #1 Match
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800 }}>
                {topMatch.department_name}
              </Typography>
            </Box>
          </Stack>
          <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 800, mb: 2 }}>
            {topMatch.match_percentage}% Match
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            {topMatch.description ||
              `This department aligns perfectly with your interests, skills, and career aspirations. 
              You have a ${topMatch.match_percentage}% compatibility based on our comprehensive analysis.`}
          </Typography>
        </Paper>

        {/* Match Bar Chart */}
        <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <TrendingUp sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              All Recommendations
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            Here's how you match with each computing department based on your profile.
          </Typography>
          <MatchBarChart recommendations={results.recommendations} maxDisplay={6} />
        </Paper>

        {/* Skills Radar Chart */}
        {results.skills_analysis && results.skills_analysis.length > 0 && (
          <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Psychology sx={{ fontSize: 32, color: 'secondary.main' }} />
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                Your Skills Profile
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
              Visual representation of your strengths across different skill areas.
            </Typography>
            <SkillsRadarChart skills={results.skills_analysis} />
          </Paper>
        )}

        {/* Department Cards Grid */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
            Detailed Department Matches
          </Typography>
          <Grid container spacing={3}>
            {results.recommendations.slice(0, 6).map((rec, index) => (
              <Grid item xs={12} md={6} lg={4} key={rec.department_code}>
                <DepartmentResultCard recommendation={rec} rank={index + 1} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Comparison View for Top 2 */}
        {top2Departments.length >= 2 && (
          <Box sx={{ mb: 6 }} id="comparison-section">
            <ComparisonView dept1={top2Departments[0]} dept2={top2Departments[1]} />
          </Box>
        )}

        <Divider sx={{ my: 6 }} />

        {/* Next Steps Section */}
        <NextStepsSection
          topDepartment={topMatch.department_name}
          onDownloadReport={handleDownloadReport}
        />
      </Container>
    </Box>
  );
};

export default ResultsEnhanced;

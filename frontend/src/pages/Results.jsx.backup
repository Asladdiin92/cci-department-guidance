import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Chip,
  LinearProgress,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { getAssessmentResults } from '../services/api';

function Results() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Check if results passed via navigation state
    if (location.state?.results) {
      setResults(location.state.results);
      setLoading(false);
    } else if (assessmentId) {
      // Fetch results from API
      loadResults();
    } else {
      setError('No assessment ID provided');
      setLoading(false);
    }
  }, [assessmentId, location.state]);

  const loadResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAssessmentResults(assessmentId);
      setResults(data);
    } catch (err) {
      console.error('Error loading results:', err);
      setError('Failed to load results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = () => {
    if (results?.recommendations) {
      const topThree = results.recommendations.slice(0, 3).map(r => r.department_code);
      navigate(`/compare?departments=${topThree.join(',')}`);
    }
  };

  const handleRetakeAssessment = () => {
    navigate('/assessment');
  };

  const handleViewDepartment = (code) => {
    navigate(`/departments/${code}`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Calculating Your Results...
        </Typography>
      </Container>
    );
  }

  if (error || !results) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'No results available'}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/assessment')}>
          Take Assessment
        </Button>
      </Container>
    );
  }

  const topThree = results.recommendations?.slice(0, 3) || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <EmojiEventsIcon sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Your Recommendations
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Based on your assessment, here are the top departments that match your interests and strengths
        </Typography>
      </Box>

      {/* Top 3 Recommendations */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {topThree.map((rec, index) => (
          <Grid item xs={12} md={4} key={rec.department_code}>
            <Paper
              elevation={index === 0 ? 8 : 3}
              sx={{
                p: 3,
                height: '100%',
                position: 'relative',
                border: index === 0 ? '3px solid' : 'none',
                borderColor: index === 0 ? 'warning.main' : 'transparent',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                }
              }}
            >
              {/* Rank Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -15,
                  right: 20,
                  bgcolor: index === 0 ? 'warning.main' : index === 1 ? 'grey.400' : 'grey.300',
                  color: 'white',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: 18,
                  boxShadow: 2
                }}
              >
                #{index + 1}
              </Box>

              {/* Best Match Badge */}
              {index === 0 && (
                <Chip
                  label="Best Match"
                  color="warning"
                  size="small"
                  icon={<EmojiEventsIcon />}
                  sx={{ mb: 2 }}
                />
              )}

              {/* Department Info */}
              <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mt: index === 0 ? 0 : 2 }}>
                {rec.department_name}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {rec.description}
              </Typography>

              {/* Match Score */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Match Score
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    {rec.match_percentage}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={rec.match_percentage}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: index === 0 ? 'warning.main' : 'primary.main'
                    }
                  }}
                />
              </Box>

              {/* Match Reason */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight="medium" gutterBottom>
                  Why this match:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {rec.reason}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Actions */}
              <Button
                variant={index === 0 ? 'contained' : 'outlined'}
                fullWidth
                onClick={() => handleViewDepartment(rec.department_code)}
                startIcon={<SchoolIcon />}
              >
                Learn More
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* All Recommendations */}
      {results.recommendations?.length > 3 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUpIcon sx={{ mr: 1 }} />
            All Department Matches
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Complete ranking of all departments based on your assessment
          </Typography>

          <Grid container spacing={2}>
            {results.recommendations.slice(3).map((rec, index) => (
              <Grid item xs={12} sm={6} key={rec.department_code}>
                <Box
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => handleViewDepartment(rec.department_code)}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="medium">
                      #{index + 4} {rec.department_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {rec.match_percentage}% match
                    </Typography>
                  </Box>
                  <Button size="small">View</Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<CompareArrowsIcon />}
          onClick={handleCompare}
        >
          Compare Top 3 Departments
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<RestartAltIcon />}
          onClick={handleRetakeAssessment}
        >
          Retake Assessment
        </Button>
      </Box>

      {/* Info Box */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'info.light' }}>
        <Typography variant="body2" color="text.secondary">
          💡 <strong>Next Steps:</strong> Review the department details, compare your top matches, 
          and consider visiting the departments during open houses to get a better feel for each program.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Results;

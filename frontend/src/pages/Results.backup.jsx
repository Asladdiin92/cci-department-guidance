import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
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
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  useTheme,
  alpha
} from '@mui/material';
import {
  EmojiEvents,
  School,
  TrendingUp,
  CompareArrows,
  RestartAlt,
  Psychology,
  Lightbulb,
  CheckCircle,
  ArrowForward
} from '@mui/icons-material';
import { getAssessmentResults } from '../services/api';

// Persona profiles based on top match - Haramaya University themed
const PERSONA_PROFILES = {
  CS: {
    title: 'The Computational Scientist',
    icon: '🧪',
    description: 'You thrive on theoretical challenges and love understanding how things work at a fundamental level.',
    traits: ['Analytical Thinker', 'Problem Solver', 'Research-Oriented', 'Mathematically Strong'],
    color: '#2e7d32' // Haramaya green
  },
  SWE: {
    title: 'The Software Architect',
    icon: '🏗️',
    description: 'You enjoy building robust systems and bringing ideas to life through code.',
    traits: ['Practical Builder', 'Team Player', 'Product-Focused', 'Quality-Driven'],
    color: '#f57c00' // Haramaya gold
  },
  IT: {
    title: 'The Systems Engineer',
    icon: '⚙️',
    description: 'You excel at managing infrastructure and keeping systems running smoothly.',
    traits: ['Technical Expert', 'Problem Fixer', 'Infrastructure-Minded', 'Hands-On'],
    color: '#1976d2' // Haramaya blue
  },
  IS: {
    title: 'The Enterprise Strategist',
    icon: '📊',
    description: 'You bridge the gap between business needs and technology solutions.',
    traits: ['Business-Savvy', 'Strategic Thinker', 'Process Optimizer', 'Communicator'],
    color: '#c62828' // Haramaya red
  },
  ISC: {
    title: 'The Information Curator',
    icon: '📚',
    description: 'You organize and structure information to make it accessible and useful.',
    traits: ['Detail-Oriented', 'User-Focused', 'Knowledge Manager', 'Systematic'],
    color: '#6a1b9a' // Purple
  },
  STAT: {
    title: 'The Data Scientist',
    icon: '📈',
    description: 'You find patterns in data and use statistics to drive insights.',
    traits: ['Analytical', 'Data-Driven', 'Research-Minded', 'Quantitative Thinker'],
    color: '#f57c00' // Haramaya gold
  }
};

// Why it fits explanations
const FIT_REASONS = {
  CS: [
    'Your strong analytical and problem-solving skills align with theoretical computing',
    'You showed interest in understanding fundamental algorithms and systems',
    'Your mathematical aptitude matches the theory-heavy curriculum',
    'You prefer deep understanding over quick implementation'
  ],
  SWE: [
    'Your practical approach and desire to build things match software development',
    'You showed enthusiasm for creating applications and working in teams',
    'Your focus on product quality aligns with software engineering practices',
    'You prefer hands-on coding over theoretical study'
  ],
  IT: [
    'Your technical troubleshooting skills match infrastructure management',
    'You showed interest in networks, systems, and hardware',
    'Your practical approach fits the hands-on nature of IT',
    'You prefer fixing and maintaining systems over abstract theory'
  ],
  IS: [
    'Your interest in both business and technology makes you ideal for this field',
    'You showed aptitude for process analysis and optimization',
    'Your communication skills match the business-facing role',
    'You prefer working with databases and enterprise systems'
  ],
  ISC: [
    'Your attention to detail fits information organization perfectly',
    'You showed interest in knowledge management and accessibility',
    'Your systematic approach matches information architecture work',
    'You care about user experience and finding information'
  ],
  STAT: [
    'Your strong mathematical foundation aligns with statistical analysis',
    'You showed interest in data patterns and research methodology',
    'Your analytical mindset fits quantitative problem-solving',
    'You enjoy working with numbers and drawing insights from data'
  ]
};

function Results() {
  const theme = useTheme();
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (location.state?.results) {
      setResults(location.state.results);
      setLoading(false);
    } else if (assessmentId) {
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={80} thickness={4} />
        <Typography variant="h5" sx={{ mt: 3, fontWeight: 600 }}>
          Analyzing Your Responses...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Creating your personalized match report
        </Typography>
      </Container>
    );
  }

  if (error || !results) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'No results available'}
        </Alert>
        <Button
          component={Link}
          to="/assessment"
          variant="contained"
          size="large"
          startIcon={<RestartAlt />}
        >
          Take Assessment
        </Button>
      </Container>
    );
  }

  const recommendations = results.recommendations || [];
  const topMatch = recommendations[0];
  const persona = PERSONA_PROFILES[topMatch?.department_code] || PERSONA_PROFILES.CS;
  const fitReasons = FIT_REASONS[topMatch?.department_code] || FIT_REASONS.CS;

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh', 
      py: { xs: 4, md: 8 },
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 30%, ${alpha('#2e7d32', 0.05)} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${alpha('#f57c00', 0.05)} 0%, transparent 50%)`,
        pointerEvents: 'none'
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section - Glassmorphism */}
        <Paper
          elevation={0}
          sx={{
            background: `linear-gradient(135deg, ${alpha(persona.color, 0.08)} 0%, ${alpha('#2e7d32', 0.06)} 100%)`,
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            p: { xs: 3, md: 6 },
            mb: 4,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${alpha(persona.color, 0.1)}`,
            boxShadow: `0 8px 32px ${alpha(persona.color, 0.15)}`,
            '&::before': {
              content: '"HU"',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: { xs: '120px', md: '200px' },
              fontWeight: 900,
              color: alpha(persona.color, 0.03),
              zIndex: 0,
              userSelect: 'none',
              pointerEvents: 'none'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Chip
              icon={<CheckCircle />}
              label="Assessment Complete"
              color="success"
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                bgcolor: alpha('#2e7d32', 0.9),
                color: 'white',
                boxShadow: `0 4px 12px ${alpha('#2e7d32', 0.3)}`
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 800,
                mb: 2,
                background: `linear-gradient(135deg, ${persona.color} 0%, #2e7d32 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Your Match Results
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Based on your responses, we've identified your ideal department matches and created your personalized academic profile.
            </Typography>
          </Box>
        </Paper>

        {/* Persona Profile Badge - Glassmorphism */}
        <Card
          sx={{
            mb: 4,
            borderRadius: 4,
            border: `2px solid ${alpha(persona.color, 0.2)}`,
            background: `linear-gradient(135deg, ${alpha(persona.color, 0.05)} 0%, ${alpha('#2e7d32', 0.03)} 100%)`,
            backdropFilter: 'blur(10px)',
            boxShadow: `0 8px 32px ${alpha(persona.color, 0.12)}`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 48px ${alpha(persona.color, 0.2)}`,
              border: `2px solid ${alpha(persona.color, 0.4)}`
            }
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Avatar
                  sx={{
                    width: { xs: 100, md: 120 },
                    height: { xs: 100, md: 120 },
                    bgcolor: persona.color,
                    fontSize: { xs: '3rem', md: '4rem' },
                    mx: { xs: 'auto', md: 0 }
                  }}
                >
                  {persona.icon}
                </Avatar>
              </Grid>
              <Grid item xs={12} md={9}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                  <Psychology sx={{ color: persona.color, fontSize: 32 }} />
                  <Typography variant="h4" fontWeight={800} sx={{ color: persona.color }}>
                    {persona.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {persona.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {persona.traits.map((trait, idx) => (
                    <Chip
                      key={idx}
                      label={trait}
                      size="small"
                      sx={{
                        bgcolor: alpha(persona.color, 0.1),
                        color: persona.color,
                        fontWeight: 600
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Top 3 Matches with Percentage Bars */}
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
          <EmojiEvents sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
          Your Top Matches
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {recommendations.slice(0, 3).map((rec, index) => (
            <Grid item xs={12} key={rec.department_code}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: index === 0 ? `2px solid ${persona.color}` : `1px solid ${alpha('#2e7d32', 0.15)}`,
                  position: 'relative',
                  overflow: 'visible',
                  background: index === 0 
                    ? `linear-gradient(135deg, ${alpha(persona.color, 0.05)} 0%, ${alpha('#2e7d32', 0.03)} 100%)`
                    : 'background.paper',
                  backdropFilter: 'blur(10px)',
                  boxShadow: index === 0 
                    ? `0 8px 32px ${alpha(persona.color, 0.15)}`
                    : `0 4px 16px ${alpha('#000', 0.05)}`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.01)',
                    boxShadow: `0 20px 60px ${alpha(persona.color, index === 0 ? 0.25 : 0.15)}`,
                    border: `2px solid ${persona.color}`
                  }
                }}
              >
                {index === 0 && (
                  <Chip
                    icon={<EmojiEvents />}
                    label="Best Match"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      right: 20,
                      fontWeight: 700,
                      bgcolor: '#2e7d32',
                      color: 'white',
                      zIndex: 1,
                      boxShadow: `0 4px 16px ${alpha('#2e7d32', 0.4)}`
                    }}
                  />
                )}
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={8}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: alpha(persona.color, index === 0 ? 1 : 0.7),
                            width: 56,
                            height: 56,
                            fontSize: '2rem',
                            mr: 2
                          }}
                        >
                          {['🥇', '🥈', '🥉'][index]}
                        </Avatar>
                        <Box>
                          <Typography variant="h5" fontWeight={700}>
                            {rec.department_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {rec.department_code}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Match Score Bar */}
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" fontWeight={600}>
                            Match Score
                          </Typography>
                          <Typography variant="h6" fontWeight={800} sx={{ color: persona.color }}>
                            {Math.round(rec.score)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={rec.score}
                          sx={{
                            height: 12,
                            borderRadius: 2,
                            bgcolor: alpha(persona.color, 0.1),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: index === 0 ? persona.color : alpha(persona.color, 0.7),
                              borderRadius: 2
                            }
                          }}
                        />
                      </Box>

                      {rec.match_reasons && rec.match_reasons.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary">
                            Key Strengths:
                          </Typography>
                          <Box sx={{ mt: 0.5 }}>
                            {rec.match_reasons.slice(0, 2).map((reason, idx) => (
                              <Typography key={idx} variant="body2" sx={{ display: 'flex', alignItems: 'flex-start', mt: 0.5 }}>
                                <CheckCircle sx={{ fontSize: 16, mr: 1, color: 'success.main' }} />
                                {reason}
                              </Typography>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                      <Button
                        component={Link}
                        to={`/departments/${rec.department_code}`}
                        variant={index === 0 ? 'contained' : 'outlined'}
                        fullWidth
                        endIcon={<ArrowForward />}
                        sx={{
                          mb: 1,
                          bgcolor: index === 0 ? persona.color : 'transparent',
                          borderColor: index === 0 ? persona.color : 'primary.main',
                          '&:hover': {
                            bgcolor: index === 0 ? persona.color : alpha(persona.color, 0.1),
                            borderColor: persona.color
                          }
                        }}
                      >
                        View Details
                      </Button>
                      {index === 0 && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          Recommended for you
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Why This Fits You Section - Glassmorphism */}
        <Card sx={{ 
          mb: 4, 
          borderRadius: 4, 
          background: `linear-gradient(135deg, ${alpha(persona.color, 0.04)} 0%, ${alpha('#2e7d32', 0.02)} 100%)`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(persona.color, 0.15)}`,
          boxShadow: `0 8px 32px ${alpha(persona.color, 0.1)}`
        }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Lightbulb sx={{ fontSize: 40, mr: 2, color: persona.color }} />
              <Typography variant="h5" fontWeight={700}>
                Why {topMatch.department_name} Fits You
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {fitReasons.map((reason, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      border: `1px solid ${alpha(persona.color, 0.2)}`,
                      borderRadius: 2,
                      height: '100%'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <CheckCircle sx={{ color: persona.color, mr: 1.5, mt: 0.5 }} />
                      <Typography variant="body2">{reason}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* All Departments Overview - Glassmorphism */}
        <Card sx={{ 
          mb: 4, 
          borderRadius: 4,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha('#2e7d32', 0.15)}`,
          boxShadow: `0 8px 32px ${alpha('#000', 0.08)}`
        }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
              <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
              Complete Match Breakdown
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Here's how you matched with all 6 departments:
            </Typography>
            {recommendations.map((rec, idx) => (
              <Box key={rec.department_code} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {rec.department_code} - {rec.department_name}
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {Math.round(rec.score)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={rec.score}
                  sx={{
                    height: 8,
                    borderRadius: 1,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: idx < 3 ? persona.color : 'grey.400',
                      borderRadius: 1
                    }
                  }}
                />
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons - Glassmorphism */}
        <Paper elevation={0} sx={{ 
          p: 4, 
          borderRadius: 4, 
          textAlign: 'center', 
          background: `linear-gradient(135deg, ${alpha('#2e7d32', 0.05)} 0%, ${alpha('#f57c00', 0.05)} 100%)`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha('#2e7d32', 0.15)}`,
          boxShadow: `0 8px 32px ${alpha('#2e7d32', 0.12)}`
        }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Ready for the Next Step?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Compare your top matches or explore detailed information about each department
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CompareArrows />}
              onClick={() => {
                const topThree = recommendations.slice(0, 3).map(r => r.department_code);
                navigate(`/compare?departments=${topThree.join(',')}`);
              }}
              sx={{
                bgcolor: '#2e7d32',
                color: 'white',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                boxShadow: `0 4px 16px ${alpha('#2e7d32', 0.3)}`,
                '&:hover': { 
                  bgcolor: '#1b5e20',
                  boxShadow: `0 6px 24px ${alpha('#2e7d32', 0.4)}`,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Compare Top 3
            </Button>
            <Button
              component={Link}
              to="/departments"
              variant="outlined"
              size="large"
              startIcon={<School />}
              sx={{ 
                borderColor: '#2e7d32', 
                color: '#2e7d32',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderWidth: 2,
                '&:hover': {
                  borderColor: '#1b5e20',
                  bgcolor: alpha('#2e7d32', 0.08),
                  borderWidth: 2,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Explore All Departments
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<RestartAlt />}
              onClick={() => navigate('/assessment')}
            >
              Retake Assessment
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Results;

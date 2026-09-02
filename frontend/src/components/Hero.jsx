import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import {
  School,
  TrendingUp,
  Speed,
  CompareArrows,
  EmojiObjects,
  Work,
  CheckCircle,
  ArrowForward,
  Psychology,
  Laptop,
  Code,
  Science
} from '@mui/icons-material';

const Hero = () => {
  const theme = useTheme();
  const [currentStat, setCurrentStat] = useState(0);
  const stats = [
    { value: '6', label: 'Computing Departments', icon: <School fontSize="large" />, color: '#4f46e5' },
    { value: '20', label: 'Smart Questions', icon: <Psychology fontSize="large" />, color: '#ea580c' },
    { value: '500+', label: 'Students Helped', icon: <TrendingUp fontSize="large" />, color: '#0d9488' },
    { value: '10min', label: 'Quick Assessment', icon: <Speed fontSize="large" />, color: '#db2777' },
  ];

  const features = [
    {
      icon: <Psychology sx={{ fontSize: 40 }} />,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithm analyzes your responses to recommend the perfect department match based on your skills and interests.',
      color: '#4f46e5'
    },
    {
      icon: <CompareArrows sx={{ fontSize: 40 }} />,
      title: 'Side-by-Side Comparison',
      description: 'Compare departments with detailed curriculum, career paths, salary ranges, and real job market data.',
      color: '#ea580c'
    },
    {
      icon: <Work sx={{ fontSize: 40 }} />,
      title: 'Career Insights',
      description: 'Explore Ethiopian job market data, salary expectations, top employers, and growth opportunities.',
      color: '#0d9488'
    },
    {
      icon: <EmojiObjects sx={{ fontSize: 40 }} />,
      title: 'Personalized Guidance',
      description: 'Get customized recommendations with "Is this for you?" checklists and detailed department profiles.',
      color: '#db2777'
    },
  ];

  const departments = [
    { code: 'CS', name: 'Computer Science', icon: <Science />, color: '#4f46e5', desc: 'Algorithms & Theory' },
    { code: 'SWE', name: 'Software Engineering', icon: <Code />, color: '#ea580c', desc: 'Build & Deploy' },
    { code: 'IT', name: 'Information Technology', icon: <Laptop />, color: '#0d9488', desc: 'Networks & Systems' },
    { code: 'IS', name: 'Information Systems', icon: <Work />, color: '#db2777', desc: 'Business & Tech' },
    { code: 'ISC', name: 'Information Science', icon: <School />, color: '#7c3aed', desc: 'Data & Knowledge' },
    { code: 'STAT', name: 'Statistics', icon: <TrendingUp />, color: '#eab308', desc: 'Data Analysis' },
  ];

  const steps = [
    { number: '1', icon: <Psychology />, title: 'Answer Questions', desc: '20 carefully designed questions' },
    { number: '2', icon: <Speed />, title: 'Instant Analysis', desc: 'AI matches your profile' },
    { number: '3', icon: <CheckCircle />, title: 'Get Results', desc: 'Top 3 recommendations' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <Box sx={{ bgcolor: 'background.default', overflow: 'hidden' }}>
      {/* Hero Section with Gradient Background */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(74, 144, 226, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Chip 
                  icon={<School />}
                  label="Haramaya University - College of Computing & Informatics"
                  sx={{ 
                    bgcolor: alpha('#2e7d32', 0.1),
                    color: '#2e7d32',
                    fontWeight: 600,
                    px: 1,
                    border: '1px solid',
                    borderColor: alpha('#2e7d32', 0.3)
                  }}
                />
              </Box>

              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  color: 'text.primary',
                  '& .gradient-text': {
                    background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }
                }}
              >
                Find Your <Box component="span" className="gradient-text">Perfect Department</Box>
              </Typography>

              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'text.secondary',
                  mb: 4,
                  lineHeight: 1.6,
                  fontWeight: 400
                }}
              >
                Take our AI-powered 20-question assessment and discover which computing department at CCI Haramaya University matches your skills, interests, and career goals.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button
                  component={Link}
                  to="/assessment"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                    boxShadow: '0 4px 14px rgba(46, 125, 50, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1b5e20 0%, #0d4717 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(46, 125, 50, 0.5)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Start Assessment
                </Button>

                <Button
                  component={Link}
                  to="/departments"
                  variant="outlined"
                  size="large"
                  endIcon={<School />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4]
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Explore Departments
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {[
                  { icon: <CheckCircle fontSize="small" />, text: 'Free & Anonymous' },
                  { icon: <CheckCircle fontSize="small" />, text: '10 Minutes' },
                  { icon: <CheckCircle fontSize="small" />, text: 'Instant Results' }
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ color: 'success.main' }}>{item.icon}</Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Right Visual */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}
              >
                <Card
                  elevation={4}
                  sx={{
                    width: '100%',
                    maxWidth: 450,
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        p: 1,
                        borderRadius: 2,
                        mr: 2
                      }}>
                        <CheckCircle sx={{ color: 'success.main' }} />
                      </Box>
                      <Typography variant="h6" fontWeight={700}>
                        Your Match Results
                      </Typography>
                    </Box>

                    {[
                      { dept: 'Software Engineering', score: 92, color: '#ea580c' },
                      { dept: 'Computer Science', score: 88, color: '#4f46e5' },
                      { dept: 'Information Tech', score: 75, color: '#0d9488' }
                    ].map((item, idx) => (
                      <Box key={idx} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {item.dept}
                          </Typography>
                          <Typography variant="body2" fontWeight={700} sx={{ color: item.color }}>
                            {item.score}%
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            height: 8,
                            bgcolor: alpha(item.color, 0.1),
                            borderRadius: 1,
                            overflow: 'hidden'
                          }}
                        >
                          <Box
                            sx={{
                              height: '100%',
                              width: `${item.score}%`,
                              bgcolor: item.color,
                              borderRadius: 1,
                              animation: `slideIn${idx} 1s ease-out`,
                              [`@keyframes slideIn${idx}`]: {
                                '0%': { width: 0 },
                                '100%': { width: `${item.score}%` }
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    ))}

                    <Chip
                      label="Best Match 🎯"
                      size="small"
                      sx={{
                        mt: 2,
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: 'success.main',
                        fontWeight: 600
                      }}
                    />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Animated Stats Section - Haramaya University Branded */}
      <Box sx={{ py: 6, bgcolor: alpha('#f5f5f5', 0.5) }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, idx) => (
              <Grid item xs={6} sm={6} md={3} key={idx}>
                <Card
                  elevation={0}
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    bgcolor: 'white',
                    border: `3px solid transparent`,
                    borderRadius: 4,
                    background: `linear-gradient(white, white) padding-box,
                                linear-gradient(135deg, ${stat.color} 0%, ${alpha(stat.color, 0.6)} 100%) border-box`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${stat.color}, ${alpha(stat.color, 0.5)})`,
                    },
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: `0 20px 40px ${alpha(stat.color, 0.2)}`,
                      '& .stat-icon': {
                        transform: 'scale(1.2) rotate(10deg)',
                      }
                    }
                  }}
                >
                  <Box 
                    className="stat-icon"
                    sx={{ 
                      color: stat.color, 
                      mb: 2,
                      transition: 'transform 0.4s ease',
                      display: 'inline-flex',
                      padding: 2,
                      borderRadius: '50%',
                      bgcolor: alpha(stat.color, 0.1)
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" fontWeight={900} sx={{ 
                    color: stat.color, 
                    mb: 1,
                    textShadow: `0 2px 10px ${alpha(stat.color, 0.2)}`
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Modern Glassmorphism Style */}
      <Box sx={{ py: 10, position: 'relative', overflow: 'hidden' }}>
        {/* Haramaya University Watermark Background */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '15rem',
            fontWeight: 900,
            color: alpha('#2e7d32', 0.02),
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0
          }}
        >
          HU
        </Box>
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="🎓 Why Choose Haramaya CCI"
              sx={{ 
                mb: 2,
                bgcolor: alpha('#2e7d32', 0.1),
                color: '#2e7d32',
                fontWeight: 700,
                px: 2,
                py: 2.5,
                fontSize: '0.95rem',
                border: `2px solid ${alpha('#2e7d32', 0.2)}`
              }}
            />
            <Typography variant="h2" fontWeight={900} gutterBottom>
              Smart Features for{' '}
              <Box component="span" sx={{ 
                background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Better Decisions
              </Box>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Our intelligent system combines academic expertise with career insights to guide you to the perfect department.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 4,
                    bgcolor: alpha('#ffffff', 0.8),
                    backdropFilter: 'blur(10px)',
                    border: `3px solid ${alpha(feature.color, 0.15)}`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '6px',
                      background: `linear-gradient(90deg, ${feature.color}, ${alpha(feature.color, 0.5)})`,
                    },
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.03)',
                      boxShadow: `0 25px 50px ${alpha(feature.color, 0.25)}`,
                      borderColor: feature.color,
                      bgcolor: 'white',
                      '& .feature-icon-box': {
                        transform: 'scale(1.15) rotate(-5deg)',
                        bgcolor: feature.color,
                        color: 'white',
                      }
                    }
                  }}
                >
                  <Box
                    className="feature-icon-box"
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: 3,
                      bgcolor: alpha(feature.color, 0.1),
                      color: feature.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: 'all 0.4s ease',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: 'text.primary' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Departments Grid - Haramaya Branded */}
      <Box sx={{ 
        py: 10, 
        background: `linear-gradient(180deg, 
          ${alpha('#f5f5f5', 0.3)} 0%, 
          ${alpha('#e8f5e9', 0.3)} 100%)`
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="🎯 Explore Your Future"
              sx={{ 
                mb: 2,
                bgcolor: alpha('#f57c00', 0.15),
                color: '#f57c00',
                fontWeight: 700,
                px: 2,
                py: 2.5,
                fontSize: '0.95rem',
                border: `2px solid ${alpha('#f57c00', 0.3)}`
              }}
            />
            <Typography variant="h2" fontWeight={900} gutterBottom>
              Six Computing{' '}
              <Box component="span" sx={{ 
                background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Departments
              </Box>
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Each with unique curriculum, career paths, and opportunities
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {departments.map((dept, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  component={Link}
                  to={`/departments/${dept.code}`}
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    textDecoration: 'none',
                    bgcolor: 'white',
                    border: `3px solid ${alpha(dept.color, 0.15)}`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: `0 4px 20px ${alpha(dept.color, 0.08)}`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '5px',
                      bgcolor: dept.color,
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at top right, ${alpha(dept.color, 0.03)}, transparent 70%)`,
                      opacity: 0,
                      transition: 'opacity 0.5s ease'
                    },
                    '&:hover': {
                      transform: 'translateY(-16px) scale(1.02)',
                      boxShadow: `0 32px 64px ${alpha(dept.color, 0.25)}`,
                      borderColor: dept.color,
                      '&::before': {
                        transform: 'scaleX(1)'
                      },
                      '&::after': {
                        opacity: 1
                      },
                      '& .dept-icon-container .MuiBox-root:first-of-type': {
                        transform: 'scale(1.2)',
                        bgcolor: alpha(dept.color, 0.2)
                      },
                      '& .dept-icon-container .MuiBox-root:last-of-type': {
                        transform: 'scale(1.1) rotate(10deg)',
                        borderColor: dept.color,
                        bgcolor: alpha(dept.color, 0.05),
                        boxShadow: `0 12px 32px ${alpha(dept.color, 0.3)}`
                      },
                      '& .MuiChip-root': {
                        bgcolor: dept.color,
                        color: 'white',
                        transform: 'scale(1.05)'
                      },
                      '& .MuiTypography-h5': {
                        color: dept.color
                      },
                      '& .MuiBox-root:last-child': {
                        borderColor: dept.color,
                        '& .MuiSvgIcon-root': {
                          transform: 'translateX(8px)'
                        }
                      }
                    }
                  }}
                >
                  {/* Icon and Badge Section */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    justifyContent: 'space-between',
                    mb: 3 
                  }}>
                    <Box
                      className="dept-icon-container"
                      sx={{
                        position: 'relative',
                        width: 80,
                        height: 80
                      }}
                    >
                      {/* Animated Background Circle */}
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          bgcolor: alpha(dept.color, 0.1),
                          transition: 'all 0.4s ease'
                        }}
                      />
                      {/* Icon */}
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                          bgcolor: 'white',
                          borderRadius: '50%',
                          border: `4px solid ${alpha(dept.color, 0.2)}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: dept.color,
                          fontSize: '2.5rem',
                          transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                          boxShadow: `0 8px 24px ${alpha(dept.color, 0.2)}`
                        }}
                      >
                        {dept.icon}
                      </Box>
                    </Box>
                    
                    <Chip 
                      label={dept.code}
                      sx={{ 
                        bgcolor: alpha(dept.color, 0.15),
                        color: dept.color,
                        fontWeight: 900,
                        fontSize: '0.85rem',
                        px: 1.5,
                        border: `2px solid ${alpha(dept.color, 0.3)}`,
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </Box>
                  
                  {/* Text Content */}
                  <Typography 
                    variant="h5" 
                    fontWeight={900} 
                    gutterBottom 
                    color="text.primary"
                    sx={{
                      mb: 1.5,
                      lineHeight: 1.3,
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {dept.name}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 3,
                      lineHeight: 1.7,
                      fontWeight: 500
                    }}
                  >
                    {dept.desc}
                  </Typography>
                  
                  {/* Action Footer */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5,
                      pt: 2,
                      mt: 'auto',
                      borderTop: `2px solid ${alpha(dept.color, 0.1)}`,
                      color: dept.color,
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span>Explore Program</span>
                    <ArrowForward 
                      fontSize="small" 
                      sx={{ 
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={Link}
              to="/compare"
              variant="outlined"
              size="large"
              endIcon={<CompareArrows />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              Compare Departments Side-by-Side
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How It Works */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="Simple Process"
              sx={{ 
                mb: 2,
                bgcolor: alpha(theme.palette.info.main, 0.1),
                color: 'info.main',
                fontWeight: 600
              }}
            />
            <Typography variant="h2" fontWeight={800} gutterBottom>
              How It{' '}
              <Box component="span" sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Works
              </Box>
            </Typography>
          </Box>

          <Grid container spacing={4} alignItems="center">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <Grid item xs={12} md={idx === 1 ? 4 : 4}>
                  <Card
                    elevation={4}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      borderRadius: 3,
                      position: 'relative',
                      height: '100%',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        mx: 'auto',
                        mb: 2
                      }}
                    >
                      {step.number}
                    </Box>
                    <Box sx={{ color: 'primary.main', mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {React.cloneElement(step.icon, { sx: { fontSize: 40 } })}
                    </Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.desc}
                    </Typography>
                  </Card>
                </Grid>
                {idx < steps.length - 1 && (
                  <Grid item xs={12} md={0} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                    <ArrowForward sx={{ color: 'primary.main', fontSize: 40 }} />
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={Link}
              to="/assessment"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.2rem',
                fontWeight: 700,
                borderRadius: 2,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[12]
                },
                transition: 'all 0.3s ease'
              }}
            >
              Begin Your Journey
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={800} gutterBottom>
            Ready to Find Your Perfect Department?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join hundreds of students who have made confident decisions with our AI-powered guidance system.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/assessment"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                py: 2,
                px: 5,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: 2,
                textTransform: 'none',
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[12]
                }
              }}
            >
              Take Free Assessment
            </Button>
            <Button
              component={Link}
              to="/departments"
              variant="outlined"
              size="large"
              endIcon={<School />}
              sx={{
                py: 2,
                px: 5,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: 2,
                textTransform: 'none',
                borderColor: 'white',
                color: 'white',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: alpha('#ffffff', 0.1),
                  transform: 'translateY(-4px)'
                }
              }}
            >
              Explore Departments
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;

/**
 * Enhanced Hero Section - Day 2 Premium Homepage
 * Features: Split layout, benefit-driven copy, high-contrast CTAs, animated elements
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import {
  ArrowForward,
  PlayCircleOutlined,
  CheckCircle,
  Speed,
  Psychology,
  TrendingUp,
} from '@mui/icons-material';

const HeroNew = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      aria-label="Hero section"
      sx={{
        position: 'relative',
        minHeight: { xs: '85vh', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.main, 0.03)} 0%, 
          ${alpha(theme.palette.background.default, 1)} 50%,
          ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
        pt: { xs: 8, md: 0 },
        pb: { xs: 6, md: 0 },
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(30px, -30px) scale(1.1)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.06)} 0%, transparent 70%)`,
          animation: 'float 15s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center',
          }}
        >
          {/* LEFT SIDE - Content */}
          <Box
            sx={{
              animation: 'slideInLeft 0.8s ease-out',
              '@keyframes slideInLeft': {
                '0%': { opacity: 0, transform: 'translateX(-50px)' },
                '100%': { opacity: 1, transform: 'translateX(0)' },
              },
            }}
          >
            {/* Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                mb: 3,
                borderRadius: 50,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: theme.palette.success.main,
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                    '50%': { opacity: 0.6, transform: 'scale(1.2)' },
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                  fontSize: '0.875rem',
                }}
              >
                🎓 Haramaya University - College of Computing & Informatics
              </Typography>
            </Box>

            {/* Main Headline - Benefit-Driven */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.25rem', lg: '4.75rem' },
                fontWeight: 900,
                lineHeight: 1.1,
                mb: 3,
                color: 'text.primary',
                letterSpacing: '-0.02em',
              }}
            >
              Discover Your{' '}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 8,
                    left: 0,
                    right: 0,
                    height: 12,
                    background: alpha(theme.palette.primary.main, 0.2),
                    borderRadius: 2,
                    zIndex: -1,
                  },
                }}
              >
                Perfect Career Path
              </Box>{' '}
              in Computing
            </Typography>

            {/* Subheadline - Clear Value Proposition */}
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.125rem', md: '1.375rem' },
                color: 'text.secondary',
                mb: 4,
                lineHeight: 1.6,
                fontWeight: 400,
                maxWidth: 580,
              }}
            >
              Take our AI-powered 10-minute assessment and get personalized department recommendations based on your unique skills, interests, and career goals.
            </Typography>

            {/* Trust Indicators */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              sx={{ mb: 5 }}
            >
              {[
                { icon: <CheckCircle />, text: 'Free & Anonymous', color: 'success.main' },
                { icon: <Speed />, text: 'Results in 10 Minutes', color: 'primary.main' },
                { icon: <Psychology />, text: 'AI-Powered Matching', color: 'secondary.main' },
              ].map((item, idx) => (
                <Stack key={idx} direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      color: item.color,
                      display: 'flex',
                      fontSize: '1.25rem',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      fontSize: '0.9rem',
                    }}
                  >
                    {item.text}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            {/* CTA Buttons - High Contrast & Impossible to Miss */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mb: 4 }}
            >
              {/* Primary CTA - Large & High Contrast */}
              <Button
                component={Link}
                to="/assessment"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  textTransform: 'none',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
                  minWidth: { xs: '100%', sm: 240 },
                  minHeight: 56,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, #0a3a0f 100%)`,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.5)}`,
                  },
                  '&:active': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Start Assessment Now
              </Button>

              {/* Secondary CTA */}
              <Button
                component={Link}
                to="/departments"
                variant="outlined"
                size="large"
                startIcon={<PlayCircleOutlined />}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: 'none',
                  borderWidth: 2,
                  minWidth: { xs: '100%', sm: 220 },
                  minHeight: 56,
                  color: 'text.primary',
                  borderColor: alpha(theme.palette.text.primary, 0.2),
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: theme.palette.primary.main,
                    color: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                Learn How It Works
              </Button>
            </Stack>

            {/* Social Proof Mini */}
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <TrendingUp sx={{ fontSize: '1.25rem', color: 'success.main' }} />
              <strong>500+ students</strong> have found their perfect department
            </Typography>
          </Box>

          {/* RIGHT SIDE - Visual/Illustration */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              animation: 'slideInRight 0.8s ease-out',
              '@keyframes slideInRight': {
                '0%': { opacity: 0, transform: 'translateX(50px)' },
                '100%': { opacity: 1, transform: 'translateX(0)' },
              },
            }}
          >
            {/* Interactive Results Preview Card */}
            <Box
              sx={{
                position: 'relative',
                p: 4,
                borderRadius: 4,
                bgcolor: 'background.paper',
                boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.15)}`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transform: 'perspective(1000px) rotateY(-5deg)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'perspective(1000px) rotateY(0deg)',
                },
              }}
            >
              {/* Header */}
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle sx={{ color: 'success.main', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    Your Results
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    Top Matches Found
                  </Typography>
                </Box>
              </Stack>

              {/* Mock Results */}
              {[
                { dept: 'Software Engineering', score: 94, color: theme.palette.secondary.main },
                { dept: 'Computer Science', score: 89, color: theme.palette.primary.main },
                { dept: 'Information Technology', score: 82, color: theme.palette.info.main },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    mb: 2.5,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(item.color, 0.04),
                    border: `2px solid ${alpha(item.color, idx === 0 ? 0.2 : 0.1)}`,
                    transition: 'all 0.3s ease',
                    animation: `slideUp${idx} 0.6s ease-out ${idx * 0.15}s both`,
                    '@keyframes slideUp0': {
                      '0%': { opacity: 0, transform: 'translateY(20px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                    '@keyframes slideUp1': {
                      '0%': { opacity: 0, transform: 'translateY(20px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                    '@keyframes slideUp2': {
                      '0%': { opacity: 0, transform: 'translateY(20px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                    '&:hover': {
                      bgcolor: alpha(item.color, 0.08),
                      transform: 'translateX(8px)',
                      borderColor: item.color,
                    },
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {idx + 1}. {item.dept}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: item.color,
                      }}
                    >
                      {item.score}%
                    </Typography>
                  </Stack>
                  {/* Progress Bar */}
                  <Box
                    sx={{
                      height: 6,
                      borderRadius: 1,
                      bgcolor: alpha(item.color, 0.15),
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${item.score}%`,
                        bgcolor: item.color,
                        borderRadius: 1,
                        animation: `expand${idx} 1.5s ease-out ${idx * 0.15 + 0.3}s both`,
                        [`@keyframes expand${idx}`]: {
                          '0%': { width: 0 },
                          '100%': { width: `${item.score}%` },
                        },
                      }}
                    />
                  </Box>
                </Box>
              ))}

              {/* Badge */}
              <Box
                sx={{
                  mt: 3,
                  pt: 2,
                  borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 50,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: 'success.main',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                  }}
                >
                  🎯 Best Match Based on Your Skills
                </Typography>
              </Box>
            </Box>

            {/* Floating Stats */}
            <Box
              sx={{
                position: 'absolute',
                top: '10%',
                right: '-10%',
                p: 2,
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[8],
                animation: 'float 6s ease-in-out infinite',
                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.main', mb: 0.5 }}>
                6
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Departments
              </Typography>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                bottom: '15%',
                left: '-8%',
                p: 2,
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[8],
                animation: 'float 8s ease-in-out infinite reverse',
                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 900, color: 'secondary.main', mb: 0.5 }}>
                20
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Questions
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroNew;

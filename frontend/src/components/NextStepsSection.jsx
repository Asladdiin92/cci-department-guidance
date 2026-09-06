/**
 * Next Steps Section Component
 * Clear, actionable guidance for students after viewing results
 * Helps students understand what to do next
 */

import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  Grid,
  useTheme,
  alpha,
} from '@mui/material';
import {
  School,
  Event,
  PersonOutline,
  Download,
  CompareArrows,
  MenuBook,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';

const NextStepsSection = ({ topDepartment, onDownloadReport }) => {
  const theme = useTheme();

  const steps = [
    {
      icon: <Download />,
      title: 'Download Your Report',
      description: 'Save a copy of your results for future reference',
      action: 'Download PDF',
      onClick: onDownloadReport,
      color: theme.palette.primary.main,
    },
    {
      icon: <MenuBook />,
      title: 'Read Department Details',
      description: `Learn more about ${topDepartment} curriculum and requirements`,
      action: 'View Syllabus',
      onClick: () => window.open('/departments/' + topDepartment, '_blank'),
      color: theme.palette.secondary.main,
    },
    {
      icon: <PersonOutline />,
      title: 'Talk to a Counselor',
      description: 'Schedule a meeting to discuss your results and options',
      action: 'Book Meeting',
      onClick: () => window.location.href = 'mailto:counselor@haramaya.edu.et',
      color: theme.palette.info.main,
    },
    {
      icon: <CompareArrows />,
      title: 'Compare Departments',
      description: 'Explore and compare other recommended departments',
      action: 'Compare Now',
      onClick: () => document.getElementById('comparison-section')?.scrollIntoView({ behavior: 'smooth' }),
      color: theme.palette.success.main,
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          What to Do Next
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
          Your results are ready! Follow these steps to make the most of your department recommendation.
        </Typography>
      </Box>

      {/* Steps Grid */}
      <Grid container spacing={3}>
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                border: `2px solid ${alpha(step.color, 0.2)}`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[12],
                  border: `2px solid ${step.color}`,
                },
              }}
              onClick={step.onClick}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Step Number & Icon */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(step.color, 0.1),
                      color: step.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: step.color,
                      fontSize: '2rem',
                    }}
                  >
                    {index + 1}
                  </Typography>
                </Stack>

                {/* Content */}
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 2, minHeight: 48 }}
                >
                  {step.description}
                </Typography>

                {/* Action Button */}
                <Button
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{
                    borderColor: step.color,
                    color: step.color,
                    fontWeight: 700,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: step.color,
                      bgcolor: alpha(step.color, 0.1),
                    },
                  }}
                >
                  {step.action}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Additional Resources */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <CheckCircle sx={{ color: 'primary.main', fontSize: 28, flexShrink: 0, mt: 0.5 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Need More Help?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Our academic advisors are here to support you. You can:
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Event sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2">
                  <strong>Visit the Registrar Office:</strong> Building A, Room 201
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <School sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2">
                  <strong>Email:</strong> registrar@haramaya.edu.et
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PersonOutline sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2">
                  <strong>Phone:</strong> +251-25-553-0325
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default NextStepsSection;

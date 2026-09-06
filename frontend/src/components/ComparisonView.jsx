/**
 * Comparison View Component
 * Side-by-side comparison of top 2 departments
 * Helps students make informed decisions
 */

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Stack,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  Paper,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  TrendingUp,
  School,
  Work,
  Timeline,
} from '@mui/icons-material';

const ComparisonView = ({ dept1, dept2 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!dept1 || !dept2) {
    return null;
  }

  // Comparison rows
  const comparisonData = [
    {
      label: 'Match Score',
      icon: <TrendingUp />,
      value1: `${dept1.match_percentage}%`,
      value2: `${dept2.match_percentage}%`,
      winner: dept1.match_percentage > dept2.match_percentage ? 1 : 2,
    },
    {
      label: 'Key Skills',
      icon: <School />,
      value1: dept1.key_skills?.slice(0, 3).join(', ') || 'N/A',
      value2: dept2.key_skills?.slice(0, 3).join(', ') || 'N/A',
      winner: null,
    },
    {
      label: 'Career Paths',
      icon: <Work />,
      value1: dept1.career_paths?.[0] || 'N/A',
      value2: dept2.career_paths?.[0] || 'N/A',
      winner: null,
    },
    {
      label: 'Difficulty Level',
      icon: <Timeline />,
      value1: dept1.difficulty || 'Moderate',
      value2: dept2.difficulty || 'Moderate',
      winner: null,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 3,
        border: `2px solid ${alpha(theme.palette.divider, 0.1)}`,
        bgcolor: alpha(theme.palette.background.paper, 0.6),
      }}
    >
      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          mb: 3,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Top 2 Department Comparison
      </Typography>

      <Grid container spacing={3}>
        {/* Department Headers */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  border: `2px solid ${theme.palette.primary.main}`,
                  textAlign: 'center',
                }}
              >
                <Chip
                  label="#1 Best Match"
                  color="primary"
                  size="small"
                  sx={{ mb: 1, fontWeight: 700 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {dept1.department_name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {dept1.department_code}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.secondary.main, 0.08),
                  border: `2px solid ${theme.palette.secondary.main}`,
                  textAlign: 'center',
                }}
              >
                <Chip
                  label="#2 Runner-up"
                  color="secondary"
                  size="small"
                  sx={{ mb: 1, fontWeight: 700 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {dept2.department_name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {dept2.department_code}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Comparison Rows */}
        {comparisonData.map((row, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.grey[500], 0.03),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              {/* Row Label */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Box sx={{ color: 'text.secondary' }}>{row.icon}</Box>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {row.label}
                </Typography>
              </Stack>

              <Grid container spacing={2}>
                {/* Department 1 Value */}
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      p: 1.5,
                      borderRadius: 1,
                      bgcolor:
                        row.winner === 1
                          ? alpha(theme.palette.success.main, 0.1)
                          : 'transparent',
                      border: `1px solid ${
                        row.winner === 1
                          ? theme.palette.success.main
                          : 'transparent'
                      }`,
                    }}
                  >
                    {row.winner === 1 && (
                      <CheckCircle
                        sx={{ color: 'success.main', fontSize: 20 }}
                      />
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        color: row.winner === 1 ? 'success.main' : 'text.primary',
                        fontWeight: row.winner === 1 ? 700 : 500,
                      }}
                    >
                      {row.value1}
                    </Typography>
                  </Stack>
                </Grid>

                {/* Department 2 Value */}
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      p: 1.5,
                      borderRadius: 1,
                      bgcolor:
                        row.winner === 2
                          ? alpha(theme.palette.success.main, 0.1)
                          : 'transparent',
                      border: `1px solid ${
                        row.winner === 2
                          ? theme.palette.success.main
                          : 'transparent'
                      }`,
                    }}
                  >
                    {row.winner === 2 && (
                      <CheckCircle
                        sx={{ color: 'success.main', fontSize: 20 }}
                      />
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        color: row.winner === 2 ? 'success.main' : 'text.primary',
                        fontWeight: row.winner === 2 ? 700 : 500,
                      }}
                    >
                      {row.value2}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Footer Note */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.info.main, 0.05),
          border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <strong>Note:</strong> Both departments are great matches for you. Consider
          your personal interests, career goals, and long-term aspirations when making
          your final decision.
        </Typography>
      </Box>
    </Paper>
  );
};

export default ComparisonView;

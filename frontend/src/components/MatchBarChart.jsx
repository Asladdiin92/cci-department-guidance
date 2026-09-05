/**
 * Match Bar Chart Component
 * Sorted bar chart showing top department matches with #1 highlighting
 * Uses design tokens for consistent branding
 */

import React from 'react';
import { Box, Typography, Stack, alpha, useTheme, Chip } from '@mui/material';
import { EmojiEvents, TrendingUp } from '@mui/icons-material';

const MatchBarChart = ({ recommendations = [], maxDisplay = 6 }) => {
  const theme = useTheme();

  // Sort by match percentage (already sorted from API, but ensure it)
  const sortedRecs = [...recommendations]
    .sort((a, b) => b.match_percentage - a.match_percentage)
    .slice(0, maxDisplay);

  const maxPercentage = Math.max(...sortedRecs.map((r) => r.match_percentage), 100);

  // Department colors from design tokens
  const departmentColors = {
    CS: theme.palette.primary.main,
    SWE: theme.palette.secondary.main,
    IT: theme.palette.info.main,
    IS: theme.palette.error.main,
    ISC: '#7c3aed',
    STAT: theme.palette.warning.main,
  };

  return (
    <Box>
      <Stack spacing={2.5}>
        {sortedRecs.map((rec, index) => {
          const isTopMatch = index === 0;
          const percentage = rec.match_percentage || 0;
          const barColor = departmentColors[rec.department_code] || theme.palette.primary.main;

          return (
            <Box key={rec.department_code}>
              {/* Department Name & Percentage */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  {/* Rank Badge */}
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: isTopMatch ? barColor : alpha(barColor, 0.15),
                      color: isTopMatch ? 'white' : barColor,
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Box>

                  {/* Department Name */}
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: isTopMatch ? 700 : 600,
                        color: isTopMatch ? barColor : 'text.primary',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                      }}
                    >
                      {rec.department_name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                      }}
                    >
                      {rec.department_code}
                    </Typography>
                  </Box>
                </Stack>

                {/* Percentage with Badge */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  {isTopMatch && (
                    <EmojiEvents
                      sx={{
                        color: barColor,
                        fontSize: 20,
                        display: { xs: 'none', sm: 'block' },
                      }}
                    />
                  )}
                  <Chip
                    label={`${percentage}%`}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      bgcolor: isTopMatch ? barColor : alpha(barColor, 0.15),
                      color: isTopMatch ? 'white' : barColor,
                      minWidth: 60,
                      height: 28,
                    }}
                  />
                </Stack>
              </Stack>

              {/* Progress Bar */}
              <Box
                sx={{
                  position: 'relative',
                  height: isTopMatch ? 48 : 40,
                  borderRadius: 2,
                  bgcolor: alpha(barColor, 0.08),
                  overflow: 'hidden',
                  border: isTopMatch
                    ? `3px solid ${barColor}`
                    : `2px solid ${alpha(barColor, 0.15)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: `0 4px 12px ${alpha(barColor, 0.2)}`,
                    border: `3px solid ${barColor}`,
                  },
                }}
              >
                {/* Animated Bar Fill */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${(percentage / maxPercentage) * 100}%`,
                    background: isTopMatch
                      ? `linear-gradient(90deg, ${barColor} 0%, ${alpha(barColor, 0.8)} 100%)`
                      : `linear-gradient(90deg, ${alpha(barColor, 0.9)} 0%, ${alpha(barColor, 0.7)} 100%)`,
                    borderRadius: 1,
                    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `expandBar${index} 1.2s ease-out ${index * 0.1}s both`,
                    [`@keyframes expandBar${index}`]: {
                      '0%': { width: 0 },
                      '100%': { width: `${(percentage / maxPercentage) * 100}%` },
                    },
                    // Shine effect for top match
                    ...(isTopMatch && {
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.3)}, transparent)`,
                        animation: 'shine 2s infinite',
                        '@keyframes shine': {
                          '0%': { left: '-100%' },
                          '50%, 100%': { left: '100%' },
                        },
                      },
                    }),
                  }}
                />

                {/* Percentage Label Inside Bar (for top match) */}
                {isTopMatch && (
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: 16,
                      transform: 'translateY(-50%)',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '1rem',
                      zIndex: 1,
                      textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }}
                  >
                    Best Match
                  </Typography>
                )}

                {/* Match Level Indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 16,
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      color: percentage > 50 ? 'white' : barColor,
                      textShadow:
                        percentage > 50 ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    {percentage >= 80
                      ? 'Excellent Match'
                      : percentage >= 60
                      ? 'Good Match'
                      : percentage >= 40
                      ? 'Fair Match'
                      : 'Consider'}
                  </Typography>
                </Box>
              </Box>

              {/* Percentile Info (for top match) */}
              {isTopMatch && (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 1, ml: 1 }}
                >
                  <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    You scored higher than <strong>{Math.round(percentage)}%</strong>{' '}
                    of students in this profile
                  </Typography>
                </Stack>
              )}
            </Box>
          );
        })}
      </Stack>

      {/* Legend */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          <strong>Match Percentage:</strong> Based on your interests, skills, and career goals
        </Typography>
      </Box>
    </Box>
  );
};

export default MatchBarChart;

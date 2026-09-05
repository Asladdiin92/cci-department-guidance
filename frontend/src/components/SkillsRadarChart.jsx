/**
 * Skills Radar Chart Component
 * Mobile-optimized radar chart showing skills match
 * Clean design without chart junk
 */

import React from 'react';
import { Box, Typography, Stack, useTheme, useMediaQuery, alpha } from '@mui/material';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SkillsRadarChart = ({ skills = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Transform skills data for radar chart
  const chartData = skills.map((skill) => ({
    skill: skill.name,
    value: skill.score || 0,
    fullMark: 100,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 1.5,
            borderRadius: 1,
            boxShadow: theme.shadows[8],
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
            {payload[0].payload.skill}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
            Score: {payload[0].value}%
          </Typography>
        </Box>
      );
    }
    return null;
  };

  if (!skills || skills.length === 0) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: alpha(theme.palette.grey[500], 0.05),
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No skills data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
        <RadarChart data={chartData}>
          {/* Simplified grid - no chart junk */}
          <PolarGrid
            stroke={alpha(theme.palette.divider, 0.3)}
            strokeWidth={1}
          />
          
          {/* Angle axis with skill names */}
          <PolarAngleAxis
            dataKey="skill"
            tick={{
              fill: theme.palette.text.secondary,
              fontSize: isMobile ? 11 : 13,
              fontWeight: 600,
            }}
            tickLine={false}
          />
          
          {/* Radius axis (percentage scale) */}
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{
              fill: theme.palette.text.disabled,
              fontSize: 10,
            }}
            tickCount={5}
          />
          
          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />
          
          {/* Data visualization */}
          <Radar
            name="Skills"
            dataKey="value"
            stroke={theme.palette.primary.main}
            fill={theme.palette.primary.main}
            fillOpacity={0.35}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: theme.palette.primary.main,
              strokeWidth: 2,
              stroke: '#fff',
            }}
            activeDot={{
              r: 6,
              fill: theme.palette.primary.main,
              strokeWidth: 3,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              bgcolor: theme.palette.primary.main,
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Your Skills Match
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SkillsRadarChart;

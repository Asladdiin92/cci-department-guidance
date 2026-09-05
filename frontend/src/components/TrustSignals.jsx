/**
 * Trust Signals Component
 * Displays social proof, student count, and trust indicators below hero
 */

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Avatar,
  AvatarGroup,
  alpha,
  useTheme,
} from '@mui/material';
import {
  School,
  Verified,
  TrendingUp,
  Star,
} from '@mui/icons-material';

const TrustSignals = () => {
  const theme = useTheme();

  const stats = [
    {
      icon: <School sx={{ fontSize: 32 }} />,
      value: '500+',
      label: 'Students Guided',
      color: theme.palette.primary.main,
    },
    {
      icon: <Verified sx={{ fontSize: 32 }} />,
      value: '6',
      label: 'Accredited Departments',
      color: theme.palette.success.main,
    },
    {
      icon: <Star sx={{ fontSize: 32 }} />,
      value: '4.8/5',
      label: 'Student Rating',
      color: theme.palette.warning.main,
    },
    {
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      value: '94%',
      label: 'Match Accuracy',
      color: theme.palette.info.main,
    },
  ];

  return (
    <Box
      component="section"
      aria-label="Trust signals and statistics"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: alpha(theme.palette.background.default, 0.5),
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
      }}
    >
      <Container maxWidth="lg">
        {/* Trusted By Section */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
          sx={{ mb: 6 }}
        >
          {/* Left Side - Social Proof */}
          <Stack direction="row" alignItems="center" spacing={3}>
            <AvatarGroup
              max={4}
              sx={{
                '& .MuiAvatar-root': {
                  width: 48,
                  height: 48,
                  border: `3px solid ${theme.palette.background.paper}`,
                  fontSize: '1rem',
                  fontWeight: 700,
                },
              }}
            >
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>A</Avatar>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>B</Avatar>
              <Avatar sx={{ bgcolor: theme.palette.success.main }}>M</Avatar>
              <Avatar sx={{ bgcolor: theme.palette.info.main }}>S</Avatar>
              <Avatar sx={{ bgcolor: theme.palette.warning.main }}>+</Avatar>
            </AvatarGroup>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  lineHeight: 1.3,
                }}
              >
                Trusted by 500+ Students
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                Join hundreds of students who found their path
              </Typography>
            </Box>
          </Stack>

          {/* Right Side - University Badge */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 2,
              borderRadius: 3,
              border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              bgcolor: alpha(theme.palette.primary.main, 0.04),
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: '1.5rem',
                boxShadow: theme.shadows[4],
              }}
            >
              HU
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                Officially Endorsed By
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  lineHeight: 1.2,
                }}
              >
                Haramaya University
              </Typography>
            </Box>
            <Verified
              sx={{
                color: 'success.main',
                fontSize: 28,
                ml: 1,
              }}
            />
          </Box>
        </Stack>

        {/* Stats Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {stats.map((stat, idx) => (
            <Box
              key={idx}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'background.paper',
                border: `2px solid ${alpha(stat.color, 0.15)}`,
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 32px ${alpha(stat.color, 0.2)}`,
                  borderColor: stat.color,
                  '& .stat-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                    bgcolor: stat.color,
                    color: 'white',
                  },
                },
              }}
            >
              <Box
                className="stat-icon"
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  bgcolor: alpha(stat.color, 0.1),
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  transition: 'all 0.3s ease',
                }}
              >
                {stat.icon}
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: stat.color,
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TrustSignals;

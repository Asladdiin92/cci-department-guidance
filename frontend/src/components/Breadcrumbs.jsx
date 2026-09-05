/**
 * Dynamic Breadcrumbs Component
 * Provides navigation context for deeper pages
 */

import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
  Container,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Home,
  NavigateNext,
  School,
  Assessment,
  CompareArrows,
} from '@mui/icons-material';

const Breadcrumbs = () => {
  const location = useLocation();
  const theme = useTheme();

  // Map paths to readable names and icons
  const pathMap = {
    '': { label: 'Home', icon: <Home sx={{ fontSize: 18 }} /> },
    departments: { label: 'Departments', icon: <School sx={{ fontSize: 18 }} /> },
    assessment: { label: 'Assessment', icon: <Assessment sx={{ fontSize: 18 }} /> },
    compare: { label: 'Compare', icon: <CompareArrows sx={{ fontSize: 18 }} /> },
    results: { label: 'Results', icon: null },
    admin: { label: 'Admin Dashboard', icon: null },
  };

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  // Split path and filter empty strings
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs if only one level deep and it's a main section
  if (pathnames.length === 1 && pathMap[pathnames[0]]) {
    return null;
  }

  return (
    <Box
      sx={{
        py: 2,
        bgcolor: alpha(theme.palette.background.default, 0.6),
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
      }}
    >
      <Container maxWidth="lg">
        <MuiBreadcrumbs
          separator={<NavigateNext fontSize="small" sx={{ color: 'text.secondary' }} />}
          aria-label="breadcrumb"
        >
          {/* Home Link */}
          <Link
            component={RouterLink}
            to="/"
            underline="hover"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {pathMap[''].icon}
            {pathMap[''].label}
          </Link>

          {/* Dynamic Path Links */}
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const pathInfo = pathMap[value] || { label: value, icon: null };

            // Capitalize first letter if not in pathMap
            const label = pathInfo.label || value.charAt(0).toUpperCase() + value.slice(1);

            return isLast ? (
              <Typography
                key={to}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'text.primary',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {pathInfo.icon}
                {label}
              </Typography>
            ) : (
              <Link
                key={to}
                component={RouterLink}
                to={to}
                underline="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {pathInfo.icon}
                {label}
              </Link>
            );
          })}
        </MuiBreadcrumbs>
      </Container>
    </Box>
  );
};

export default Breadcrumbs;

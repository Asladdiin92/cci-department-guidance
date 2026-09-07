/**
 * Enhanced Navbar with Glassmorphism & Shrink-on-Scroll
 * Features: Sticky header, backdrop blur, smooth animations, accessibility
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
  alpha,
  useMediaQuery,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home,
  School,
  Assessment,
  CompareArrows,
  ArrowForward,
} from '@mui/icons-material';
import logo from '../assets/logo.png';

const NavbarEnhanced = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Departments', path: '/departments', icon: <School /> },
    { label: 'Assessment', path: '/assessment', icon: <Assessment /> },
    { label: 'Compare', path: '/compare', icon: <CompareArrows /> },
  ];

  // Detect scroll for shrinking effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Full-screen mobile drawer with large touch targets
  const drawer = (
    <Box
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            component="img"
            src={logo}
            alt="CCI Department Guidance"
            sx={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: 2,
            }}
          />
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            bgcolor: alpha(theme.palette.text.primary, 0.05),
            '&:hover': {
              bgcolor: alpha(theme.palette.text.primary, 0.1),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Links - Large Touch Targets */}
      <List sx={{ flex: 1, pt: 2, px: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              selected={isActive(item.path)}
              sx={{
                minHeight: 60,
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  color: 'primary.main',
                  fontWeight: 700,
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.16),
                  },
                },
                '&:hover': {
                  bgcolor: alpha(theme.palette.text.primary, 0.04),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 48,
                  color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                  '& .MuiSvgIcon-root': {
                    fontSize: 28,
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '1.125rem',
                  fontWeight: isActive(item.path) ? 700 : 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* CTA Button in Drawer */}
      <Box sx={{ p: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <Button
          component={Link}
          to="/assessment"
          onClick={handleDrawerToggle}
          variant="contained"
          fullWidth
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            py: 2,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.125rem',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          Take Assessment
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: scrolled
            ? alpha(theme.palette.background.paper, 0.85)
            : alpha(theme.palette.background.paper, 0.7),
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${alpha(theme.palette.divider, scrolled ? 0.2 : 0.1)}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: scrolled ? theme.shadows[2] : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: scrolled ? { xs: 60, md: 68 } : { xs: 64, md: 76 },
              transition: 'min-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Logo & Branding */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                mr: { md: 4 },
                transition: 'all 0.3s ease',
                height: '100%',
                py: 1,
              }}
            >
              {/* Logo Image */}
              <Box
                component="img"
                src={logo}
                alt="CCI Department Guidance"
                sx={{
                  height: scrolled ? 50 : 60,
                  width: scrolled ? 50 : 60,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  flexShrink: 0,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: scrolled ? 3 : 2,
                }}
              />
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: isActive(item.path) ? 'primary.main' : 'text.primary',
                      fontWeight: isActive(item.path) ? 700 : 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: isActive(item.path) ? '70%' : '0%',
                        height: 3,
                        bgcolor: 'primary.main',
                        borderRadius: '2px 2px 0 0',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.06),
                        '&::after': {
                          width: '70%',
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* CTA Button - Desktop */}
            {!isMobile && (
              <Button
                component={Link}
                to="/assessment"
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  ml: 2,
                  px: 3,
                  py: scrolled ? 0.875 : 1.125,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: scrolled ? '0.9rem' : '0.95rem',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, #0a3a0f 100%)`,
                    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Take Assessment
              </Button>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open navigation menu"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'text.primary',
                  bgcolor: alpha(theme.palette.text.primary, 0.05),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.text.primary, 0.1),
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Full-Screen Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 400,
          },
        }}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavbarEnhanced;

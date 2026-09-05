/**
 * Enhanced Mega Footer
 * Features: Clear columns, newsletter signup, social links, quick contact
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  TextField,
  Button,
  IconButton,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
  Email,
  Phone,
  LocationOn,
  ArrowForward,
  School,
  Assessment,
  CompareArrows,
  Description,
  Info,
  Security,
  Gavel,
  Accessibility,
} from '@mui/icons-material';

const FooterEnhanced = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const footerLinks = {
    explore: [
      { label: 'Departments', path: '/departments', icon: <School /> },
      { label: 'Take Assessment', path: '/assessment', icon: <Assessment /> },
      { label: 'Compare Departments', path: '/compare', icon: <CompareArrows /> },
      { label: 'Exit Exam Prep', path: '/exit-exam', icon: <Description /> },
    ],
    company: [
      { label: 'About Us', path: '/about', icon: <Info /> },
      { label: 'Privacy Policy', path: '/privacy', icon: <Security /> },
      { label: 'Terms of Service', path: '/terms', icon: <Gavel /> },
      { label: 'Accessibility', path: '/accessibility', icon: <Accessibility /> },
    ],
  };

  const socialLinks = [
    { icon: <Facebook />, label: 'Facebook', url: '#' },
    { icon: <Twitter />, label: 'Twitter', url: '#' },
    { icon: <LinkedIn />, label: 'LinkedIn', url: '#' },
    { icon: <Instagram />, label: 'Instagram', url: '#' },
    { icon: <YouTube />, label: 'YouTube', url: '#' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'grey.300',
        pt: { xs: 6, md: 8 },
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Column 1: Brand & Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: '3px solid',
                    borderColor: theme.palette.primary.main,
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: '1.2rem',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    HU
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'white' }}>
                  CCI Guidance
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8, color: 'grey.400' }}>
                Helping Haramaya University students discover their perfect computing department through AI-powered assessments and comprehensive career insights.
              </Typography>

              {/* Social Links */}
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social, idx) => (
                  <IconButton
                    key={idx}
                    href={social.url}
                    aria-label={social.label}
                    sx={{
                      color: 'grey.400',
                      bgcolor: alpha('white', 0.05),
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Column 2: Explore Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 2,
                fontSize: '1rem',
              }}
            >
              Explore
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.explore.map((link, idx) => (
                <Box
                  key={idx}
                  component={Link}
                  to={link.path}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'grey.400',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Box sx={{ fontSize: '1.25rem', display: 'flex' }}>{link.icon}</Box>
                  {link.label}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Column 3: Company Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 2,
                fontSize: '1rem',
              }}
            >
              Company
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.company.map((link, idx) => (
                <Box
                  key={idx}
                  component={Link}
                  to={link.path}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'grey.400',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Box sx={{ fontSize: '1.25rem', display: 'flex' }}>{link.icon}</Box>
                  {link.label}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Column 4: Contact & Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 2,
                fontSize: '1rem',
              }}
            >
              Stay Updated
            </Typography>

            {/* Newsletter Form */}
            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{ mb: 3 }}
            >
              <Typography
                variant="body2"
                sx={{ mb: 2, color: 'grey.400', lineHeight: 1.6 }}
              >
                Get the latest updates on departments, careers, and opportunities.
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  sx={{
                    bgcolor: alpha('white', 0.05),
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: alpha('white', 0.1),
                      },
                      '&:hover fieldset': {
                        borderColor: alpha('white', 0.2),
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    minWidth: 48,
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  <ArrowForward />
                </Button>
              </Stack>
            </Box>

            {/* Quick Contact */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 2,
                fontSize: '1rem',
              }}
            >
              Contact
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
                <LocationOn sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
                <Typography variant="body2" sx={{ color: 'grey.400', lineHeight: 1.6 }}>
                  Haramaya University<br />
                  College of Computing & Informatics<br />
                  Haramaya, Ethiopia
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Email sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  cci@haramaya.edu.et
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  +251 (0) 25 553 0325
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: alpha('white', 0.1), mb: 3 }} />

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" sx={{ color: 'grey.500', textAlign: 'center' }}>
            © {new Date().getFullYear()} Haramaya University - CCI Department Guidance System. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              to="/privacy"
              style={{
                color: theme.palette.grey[500],
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = theme.palette.primary.main)}
              onMouseLeave={(e) => (e.target.style.color = theme.palette.grey[500])}
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              style={{
                color: theme.palette.grey[500],
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = theme.palette.primary.main)}
              onMouseLeave={(e) => (e.target.style.color = theme.palette.grey[500])}
            >
              Terms
            </Link>
            <Link
              to="/accessibility"
              style={{
                color: theme.palette.grey[500],
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = theme.palette.primary.main)}
              onMouseLeave={(e) => (e.target.style.color = theme.palette.grey[500])}
            >
              Accessibility
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default FooterEnhanced;

import React from 'react';
import { Container, Typography, Paper, Divider, Box, Chip } from '@mui/material';
import { Accessible, Visibility, Keyboard, VolumeUp } from '@mui/icons-material';

function Accessibility() {
  const features = [
    {
      icon: <Keyboard />,
      title: 'Keyboard Navigation',
      description: 'Full keyboard support for navigation and interaction'
    },
    {
      icon: <Visibility />,
      title: 'Screen Reader Compatible',
      description: 'ARIA labels and semantic HTML for screen reader users'
    },
    {
      icon: <VolumeUp />,
      title: 'Text-to-Speech Support',
      description: 'Compatible with browser text-to-speech extensions'
    },
    {
      icon: <Accessible />,
      title: 'Responsive Design',
      description: 'Optimized for various devices and screen sizes'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Accessible sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Typography variant="h3" fontWeight={700}>
          Accessibility Statement
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Last updated: September 6, 2026
      </Typography>

      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Our Commitment
        </Typography>
        <Typography paragraph>
          Haramaya University is committed to ensuring digital accessibility for people with disabilities. 
          We are continually improving the user experience for everyone and applying the relevant 
          accessibility standards.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Conformance Status
        </Typography>
        <Typography paragraph>
          The CCI Department Guidance System aims to conform to the{' '}
          <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> standards. 
          These guidelines explain how to make web content more accessible for people with disabilities.
        </Typography>

        <Chip label="WCAG 2.1 Level AA Target" color="primary" sx={{ mb: 2 }} />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Accessibility Features
        </Typography>
        <Box sx={{ mt: 3 }}>
          {features.map((feature, idx) => (
            <Box key={idx} sx={{ display: 'flex', mb: 3 }}>
              <Box sx={{ color: 'primary.main', mr: 2, mt: 0.5 }}>
                {feature.icon}
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Known Limitations
        </Typography>
        <Typography paragraph>
          We are aware of some accessibility limitations and are working to address them:
        </Typography>
        <ul>
          <li>Some charts may have limited screen reader support</li>
          <li>Video content may not have captions (when available)</li>
          <li>Complex interactive elements may require additional keyboard shortcuts</li>
        </ul>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Feedback
        </Typography>
        <Typography paragraph>
          We welcome your feedback on the accessibility of the CCI Department Guidance System. 
          Please let us know if you encounter accessibility barriers:
        </Typography>
        <Typography>
          📧 accessibility@haramaya.edu.et<br />
          📧 cci@haramaya.edu.et<br />
          📞 +251 91 234 5678
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          We try to respond to accessibility feedback within 2 business days.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Technical Specifications
        </Typography>
        <Typography paragraph>
          Accessibility of this system relies on the following technologies:
        </Typography>
        <ul>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>JavaScript (React)</li>
          <li>ARIA (Accessible Rich Internet Applications)</li>
        </ul>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Assessment and Testing
        </Typography>
        <Typography paragraph>
          This system has been tested with:
        </Typography>
        <ul>
          <li>NVDA screen reader on Windows</li>
          <li>Keyboard-only navigation</li>
          <li>Various browsers (Chrome, Firefox, Edge, Safari)</li>
          <li>Mobile devices (iOS and Android)</li>
        </ul>
      </Paper>

      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
        This accessibility statement was created on September 6, 2026 and will be reviewed regularly.
      </Typography>
    </Container>
  );
}

export default Accessibility;

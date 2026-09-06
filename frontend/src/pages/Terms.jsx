import React from 'react';
import { Container, Typography, Paper, Divider } from '@mui/material';

function Terms() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom fontWeight={700}>
        Terms of Service
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Last updated: September 6, 2026
      </Typography>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Acceptance of Terms
        </Typography>
        <Typography paragraph>
          By accessing and using the CCI Department Guidance System, you accept and agree to be bound 
          by the terms and conditions outlined in this agreement.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Purpose
        </Typography>
        <Typography paragraph>
          This system is designed to assist students in making informed decisions about their department 
          selection within the College of Computing and Informatics at Haramaya University. 
          The recommendations provided are advisory and do not guarantee admission to any specific department.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          User Responsibilities
        </Typography>
        <Typography paragraph>
          Users agree to:
        </Typography>
        <ul>
          <li>Provide accurate and truthful information</li>
          <li>Maintain the confidentiality of their login credentials</li>
          <li>Use the system only for its intended academic purpose</li>
          <li>Not attempt to manipulate or interfere with system functionality</li>
        </ul>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Limitations of Liability
        </Typography>
        <Typography paragraph>
          Haramaya University and the CCI department are not liable for:
        </Typography>
        <ul>
          <li>Decisions made based solely on system recommendations</li>
          <li>Technical interruptions or data loss</li>
          <li>Third-party actions or unauthorized access</li>
        </ul>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Changes to Terms
        </Typography>
        <Typography paragraph>
          We reserve the right to modify these terms at any time. Continued use of the system 
          constitutes acceptance of any changes.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Contact
        </Typography>
        <Typography>
          For questions about these terms, contact:<br />
          📧 cci@haramaya.edu.et<br />
          📞 +251 91 234 5678
        </Typography>
      </Paper>
    </Container>
  );
}

export default Terms;

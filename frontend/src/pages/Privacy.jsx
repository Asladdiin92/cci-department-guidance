import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

function Privacy() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom fontWeight={700}>
        Privacy Policy
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Last updated: September 6, 2026
      </Typography>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Information Collection
        </Typography>
        <Typography paragraph>
          The CCI Department Guidance System collects the following information:
        </Typography>
        <ul>
          <li>Student ID, name, and email address</li>
          <li>Assessment responses and results</li>
          <li>Department preferences and selections</li>
        </ul>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Use of Information
        </Typography>
        <Typography paragraph>
          Your information is used solely for:
        </Typography>
        <ul>
          <li>Providing personalized department recommendations</li>
          <li>Academic counseling and guidance</li>
          <li>Improving the guidance system</li>
          <li>Administrative purposes within Haramaya University</li>
        </ul>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Data Security
        </Typography>
        <Typography paragraph>
          We implement appropriate security measures to protect your personal information. 
          Your data is stored securely and is only accessible to authorized university personnel.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Your Rights
        </Typography>
        <Typography paragraph>
          You have the right to:
        </Typography>
        <ul>
          <li>Access your personal data</li>
          <li>Request corrections to your information</li>
          <li>Request deletion of your data (subject to university policies)</li>
        </ul>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom fontWeight={600}>
          Contact Us
        </Typography>
        <Typography paragraph>
          For privacy-related inquiries, contact:
        </Typography>
        <Typography>
          📧 cci@haramaya.edu.et<br />
          📞 +251 91 234 5678<br />
          📍 College of Computing and Informatics, Haramaya University
        </Typography>
      </Paper>
    </Container>
  );
}

export default Privacy;

import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Test() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1">Test Page Works!</Typography>
      <Typography>If you see this, React is working fine.</Typography>
    </Box>
  );
}

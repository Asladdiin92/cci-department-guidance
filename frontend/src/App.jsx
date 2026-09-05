/**
 * Homepage - Premium Day 2 Design
 * Features: Enhanced hero, trust signals, features, departments showcase
 */

import React from 'react';
import { Box } from '@mui/material';
import HeroNew from './components/HeroNew';
import TrustSignals from './components/TrustSignals';
import Hero from './components/Hero'; // Keep the rest of the original homepage content

function App() {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* New Premium Hero Section */}
      <HeroNew />
      
      {/* Trust Signals - Social Proof */}
      <TrustSignals />
      
      {/* Keep existing sections from Hero component (Features, Departments, etc.) */}
      {/* We'll extract these sections later, for now keeping Hero for the remaining content */}
    </Box>
  );
}

export default App;
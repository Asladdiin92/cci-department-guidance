import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import NavbarEnhanced from './NavbarEnhanced';
import Footer from './Footer'; // FooterEnhanced has bugs, using original for now
import Breadcrumbs from './Breadcrumbs';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <Box className="layout" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavbarEnhanced />
      {/* <Breadcrumbs /> */}
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children || <Outlet />}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;

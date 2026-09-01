import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import App from './App.jsx';
import Assessment from './pages/Assessment.jsx';
import Results from './pages/Results.jsx';
import Compare from './pages/Compare.jsx';
import Departments from './pages/Departments.jsx';
import DepartmentDetails from './pages/DepartmentDetails.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import './index.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results/:assessmentId" element={<Results />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:code" element={<DepartmentDetails />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/exit-exam" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Exit Exam Prep - Coming Soon</h1></div>} />
            <Route path="/feedback" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Feedback Page - Coming Soon</h1></div>} />
            <Route path="/about" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>About Page - Coming Soon</h1></div>} />
            <Route path="/privacy" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Privacy Policy - Coming Soon</h1></div>} />
            <Route path="/terms" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Terms of Service - Coming Soon</h1></div>} />
            <Route path="/accessibility" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Accessibility - Coming Soon</h1></div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
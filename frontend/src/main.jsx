import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Layout from './components/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import App from './App.jsx';
import Assessment from './pages/Assessment.jsx';
import AssessmentNew from './pages/AssessmentNew.jsx'; // New wizard experience
import Results from './pages/Results.jsx';
import Compare from './pages/Compare.jsx';
import Departments from './pages/Departments.jsx';
import DepartmentDetails from './pages/DepartmentDetails.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ComponentDemo from './pages/ComponentDemo.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/assessment" element={<AssessmentNew />} />
            <Route path="/assessment-old" element={<Assessment />} />
            <Route path="/results/:assessmentId" element={<Results />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:code" element={<DepartmentDetails />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/demo" element={<ComponentDemo />} />
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
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
import DepartmentsSimple from './pages/DepartmentsSimple.jsx';
import DepartmentDetails from './pages/DepartmentDetails.jsx';
import Feedback from './pages/Feedback.jsx';
import ExitExamUnified from './pages/ExitExamUnified.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Accessibility from './pages/Accessibility.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ComponentDemo from './pages/ComponentDemo.jsx';
import Test from './pages/Test.jsx';
import TestAPI from './pages/TestAPI.jsx';
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
            <Route path="/departments" element={<DepartmentsSimple />} />
            <Route path="/departments/:code" element={<DepartmentDetails />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/exit-exam" element={<ExitExamUnified />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/demo" element={<ComponentDemo />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test-api" element={<TestAPI />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
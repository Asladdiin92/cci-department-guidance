import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import App from './App.jsx';
import Assessment from './pages/Assessment.jsx';
import Results from './pages/Results.jsx';
import Compare from './pages/Compare.jsx';
import Departments from './pages/Departments.jsx';
import DepartmentDetails from './pages/DepartmentDetails.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results/:assessmentId" element={<Results />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:code" element={<DepartmentDetails />} />
          <Route path="/exit-exam" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Exit Exam Prep - Coming Soon</h1></div>} />
          <Route path="/admin" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Admin Panel - Coming Soon</h1></div>} />
          <Route path="/feedback" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Feedback Page - Coming Soon</h1></div>} />
          <Route path="/about" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>About Page - Coming Soon</h1></div>} />
          <Route path="/privacy" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Privacy Policy - Coming Soon</h1></div>} />
          <Route path="/terms" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Terms of Service - Coming Soon</h1></div>} />
          <Route path="/accessibility" element={<div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Accessibility - Coming Soon</h1></div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
)
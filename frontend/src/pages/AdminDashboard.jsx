import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
  Divider,
  useTheme,
  alpha,
  Tabs,
  Tab
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People,
  TrendingUp,
  Assessment as AssessmentIcon,
  School,
  Timeline,
  Refresh,
  Download,
  Lock,
  Logout,
  Visibility,
  BarChart,
  PieChart
} from '@mui/icons-material';

// Mock API calls - Replace with real API endpoints
const API_BASE_URL = 'https://cci-department-guidance-production.up.railway.app/api';

function AdminDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalAssessments: 0,
    activeUsers: 0,
    completionRate: 0,
    avgTimeMinutes: 0,
    departmentPreferences: [],
    recentAssessments: [],
    trendsData: {},
    topDepartments: []
  });

  useEffect(() => {
    // Check if admin is already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      setShowLoginDialog(false);
      loadDashboardData();
    }
  }, []);

  const handleLogin = async () => {
    setLoginError('');
    
    // Simple authentication - Replace with real API call
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('adminToken', 'mock-token-' + Date.now());
      setIsAuthenticated(true);
      setShowLoginDialog(false);
      loadDashboardData();
    } else {
      setLoginError('Invalid credentials. Use admin/admin123 for demo.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setShowLoginDialog(true);
    navigate('/');
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Mock data - Replace with real API calls
      // In production: const response = await fetch(`${API_BASE_URL}/admin/dashboard`, { headers: { Authorization: `Bearer ${token}` }});
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock dashboard data
      setDashboardData({
        totalAssessments: 1247,
        activeUsers: 342,
        completionRate: 87.5,
        avgTimeMinutes: 8.3,
        departmentPreferences: [
          { code: 'SWE', name: 'Software Engineering', count: 387, percentage: 31.0, trend: '+12%', color: '#ea580c' },
          { code: 'CS', name: 'Computer Science', count: 342, percentage: 27.4, trend: '+8%', color: '#4f46e5' },
          { code: 'IT', name: 'Information Technology', count: 198, percentage: 15.9, trend: '+5%', color: '#0d9488' },
          { code: 'IS', name: 'Information Systems', count: 156, percentage: 12.5, trend: '-3%', color: '#db2777' },
          { code: 'STAT', name: 'Statistics', count: 98, percentage: 7.9, trend: '+15%', color: '#eab308' },
          { code: 'ISC', name: 'Information Science', count: 66, percentage: 5.3, trend: '+2%', color: '#7c3aed' }
        ],
        recentAssessments: [
          { id: 1, date: '2026-08-31 14:32', topMatch: 'SWE', score: 92, completed: true },
          { id: 2, date: '2026-08-31 14:15', topMatch: 'CS', score: 88, completed: true },
          { id: 3, date: '2026-08-31 13:58', topMatch: 'IT', score: 85, completed: true },
          { id: 4, date: '2026-08-31 13:42', topMatch: 'SWE', score: 91, completed: true },
          { id: 5, date: '2026-08-31 13:28', topMatch: 'IS', score: 79, completed: true },
          { id: 6, date: '2026-08-31 13:10', topMatch: 'STAT', score: 86, completed: true },
          { id: 7, date: '2026-08-31 12:55', topMatch: 'CS', score: 90, completed: true },
          { id: 8, date: '2026-08-31 12:40', topMatch: 'SWE', score: 87, completed: false },
          { id: 9, date: '2026-08-31 12:22', topMatch: 'IT', score: 82, completed: true },
          { id: 10, date: '2026-08-31 12:05', topMatch: 'ISC', score: 76, completed: true }
        ],
        topDepartments: [
          { rank: 1, code: 'SWE', avgScore: 89.2, studentCount: 387 },
          { rank: 2, code: 'CS', avgScore: 87.8, studentCount: 342 },
          { rank: 3, code: 'IT', avgScore: 83.5, studentCount: 198 }
        ]
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  const handleExportData = () => {
    // Simulate export
    alert('Exporting dashboard data as CSV...\nIn production, this would download a CSV file.');
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={showLoginDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Lock sx={{ mr: 1 }} />
            Admin Dashboard Login
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            <strong>Demo Credentials:</strong><br />
            Username: admin<br />
            Password: admin123
          </Alert>
          <TextField
            fullWidth
            label="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            sx={{ mb: 2 }}
            autoComplete="username"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            autoComplete="current-password"
          />
          {loginError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {loginError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/')}>Cancel</Button>
          <Button onClick={handleLogin} variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" fontWeight={800} gutterBottom>
              <DashboardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Admin Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time insights into student department preferences
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              startIcon={<Refresh />}
              onClick={handleRefresh}
              disabled={loading}
              variant="outlined"
            >
              Refresh
            </Button>
            <Button
              startIcon={<Download />}
              onClick={handleExportData}
              variant="outlined"
            >
              Export
            </Button>
            <Button
              startIcon={<Logout />}
              onClick={handleLogout}
              variant="outlined"
              color="error"
            >
              Logout
            </Button>
          </Box>
        </Box>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {/* KPI Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Total Assessments
                    </Typography>
                    <Typography variant="h3" fontWeight={800} color="primary.main">
                      {dashboardData.totalAssessments.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      p: 1.5,
                      borderRadius: 2
                    }}
                  >
                    <AssessmentIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                  </Box>
                </Box>
                <Chip label="+23% this month" size="small" color="success" />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Active Users
                    </Typography>
                    <Typography variant="h3" fontWeight={800} color="success.main">
                      {dashboardData.activeUsers}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      p: 1.5,
                      borderRadius: 2
                    }}
                  >
                    <People sx={{ color: 'success.main', fontSize: 32 }} />
                  </Box>
                </Box>
                <Chip label="Currently online" size="small" color="success" />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Completion Rate
                    </Typography>
                    <Typography variant="h3" fontWeight={800} color="info.main">
                      {dashboardData.completionRate}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      p: 1.5,
                      borderRadius: 2
                    }}
                  >
                    <TrendingUp sx={{ color: 'info.main', fontSize: 32 }} />
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={dashboardData.completionRate}
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Avg. Time
                    </Typography>
                    <Typography variant="h3" fontWeight={800} color="warning.main">
                      {dashboardData.avgTimeMinutes}m
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      p: 1.5,
                      borderRadius: 2
                    }}
                  >
                    <Timeline sx={{ color: 'warning.main', fontSize: 32 }} />
                  </Box>
                </Box>
                <Chip label="Per assessment" size="small" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper sx={{ mb: 3, borderRadius: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<BarChart />} label="Department Preferences" iconPosition="start" />
            <Tab icon={<Timeline />} label="Recent Activity" iconPosition="start" />
            <Tab icon={<School />} label="Top Performers" iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                Department Preference Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Real-time visibility into which departments students are most interested in
              </Typography>
              
              {dashboardData.departmentPreferences.map((dept, idx) => (
                <Box key={dept.code} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        label={`#${idx + 1}`}
                        size="small"
                        sx={{ bgcolor: dept.color, color: 'white', fontWeight: 700, minWidth: 40 }}
                      />
                      <Typography variant="body1" fontWeight={600}>
                        {dept.code} - {dept.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        label={dept.trend}
                        size="small"
                        color={dept.trend.startsWith('+') ? 'success' : 'error'}
                      />
                      <Typography variant="h6" fontWeight={700} sx={{ minWidth: 80, textAlign: 'right' }}>
                        {dept.count} ({dept.percentage}%)
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={dept.percentage}
                    sx={{
                      height: 12,
                      borderRadius: 2,
                      bgcolor: alpha(dept.color, 0.1),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: dept.color,
                        borderRadius: 2
                      }
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        )}

        {activeTab === 1 && (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                Recent Assessment Activity
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Assessment ID</strong></TableCell>
                      <TableCell><strong>Date & Time</strong></TableCell>
                      <TableCell><strong>Top Match</strong></TableCell>
                      <TableCell><strong>Match Score</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData.recentAssessments.map((assessment) => (
                      <TableRow key={assessment.id} hover>
                        <TableCell>#{assessment.id.toString().padStart(4, '0')}</TableCell>
                        <TableCell>{assessment.date}</TableCell>
                        <TableCell>
                          <Chip label={assessment.topMatch} size="small" color="primary" />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={assessment.score}
                              sx={{ flexGrow: 1, height: 6, borderRadius: 1, maxWidth: 100 }}
                            />
                            <Typography variant="body2" fontWeight={600}>
                              {assessment.score}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={assessment.completed ? 'Completed' : 'In Progress'}
                            size="small"
                            color={assessment.completed ? 'success' : 'warning'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {activeTab === 2 && (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                Top Performing Departments
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Departments with highest average match scores and student interest
              </Typography>
              <Grid container spacing={3}>
                {dashboardData.topDepartments.map((dept) => (
                  <Grid item xs={12} md={4} key={dept.code}>
                    <Card variant="outlined" sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                      <Typography variant="h2" sx={{ mb: 1 }}>
                        {['🥇', '🥈', '🥉'][dept.rank - 1]}
                      </Typography>
                      <Typography variant="h5" fontWeight={700} gutterBottom>
                        {dept.code}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'left' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Avg Score
                          </Typography>
                          <Typography variant="h6" fontWeight={700} color="primary.main">
                            {dept.avgScore}%
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Students
                          </Typography>
                          <Typography variant="h6" fontWeight={700} color="success.main">
                            {dept.studentCount}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Last updated: {new Date().toLocaleString()} | Data refreshes every 5 minutes
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AdminDashboard;

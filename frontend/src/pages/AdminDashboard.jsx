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
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  useTheme,
  alpha,
  Tabs,
  Tab,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Dashboard as DashboardIcon,
  People,
  TrendingUp,
  Assessment as AssessmentIcon,
  Timeline,
  Refresh,
  Download,
  Lock,
  Logout,
  BarChart,
  PieChart,
  Search,
  TableChart
} from '@mui/icons-material';
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import * as XLSX from 'xlsx';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cci-department-guidance-production.up.railway.app/api';

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
  const [stats, setStats] = useState({});
  const [analytics, setAnalytics] = useState({
    department_distribution: [],
    question_affinity: [],
    completion_trend: []
  });
  
  // Submissions table
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortModel, setSortModel] = useState([{ field: 'completed_at', sort: 'desc' }]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      setShowLoginDialog(false);
      loadDashboardData();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && activeTab === 3) {
      loadSubmissions();
    }
  }, [isAuthenticated, activeTab, paginationModel, searchQuery, sortModel]);

  const handleLogin = async () => {
    setLoginError('');
    
    // Simple authentication - Replace with real API call in production
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const token = 'mock-token-' + Date.now();
      localStorage.setItem('adminToken', token);
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
      const token = localStorage.getItem('adminToken');
      
      // Load stats
      const statsResponse = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsResponse.json();
      setStats(statsData.data || {});

      // Load analytics
      const analyticsResponse = await fetch(`${API_BASE_URL}/admin/analytics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const analyticsData = await analyticsResponse.json();
      setAnalytics(analyticsData.data || {
        department_distribution: [],
        question_affinity: [],
        completion_trend: []
      });
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubmissions = async () => {
    setSubmissionsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const sortBy = sortModel[0]?.field || 'completed_at';
      const sortOrder = sortModel[0]?.sort || 'desc';
      
      const response = await fetch(
        `${API_BASE_URL}/admin/submissions?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}&search=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      const data = await response.json();
      setSubmissions(data.data?.submissions || []);
      setTotalSubmissions(data.data?.pagination?.total || 0);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setSubmissionsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
    if (activeTab === 3) {
      loadSubmissions();
    }
  };

  const handleExportToExcel = () => {
    try {
      if (activeTab === 0) {
        // Export department distribution
        const ws = XLSX.utils.json_to_sheet(
          analytics.department_distribution.map(d => ({
            'Department': d.department,
            'Code': d.code,
            'Student Count': d.count,
            'Color': d.color
          }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Department Distribution');
        XLSX.writeFile(wb, 'department-distribution.xlsx');
      } else if (activeTab === 1) {
        // Export question affinity
        const ws = XLSX.utils.json_to_sheet(
          analytics.question_affinity.map(q => ({
            'Question': q.question_text,
            'Category': q.category,
            'Response Count': q.response_count
          }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Question Affinity');
        XLSX.writeFile(wb, 'question-affinity.xlsx');
      } else if (activeTab === 3) {
        // Export submissions
        const ws = XLSX.utils.json_to_sheet(
          submissions.map(s => ({
            'Assessment ID': s.id,
            'Student Name': s.student_name,
            'Student Email': s.student_email,
            'Started At': new Date(s.started_at).toLocaleString(),
            'Completed At': new Date(s.completed_at).toLocaleString(),
            'Top Department': s.top_department,
            'Match %': s.match_percentage
          }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Submissions');
        XLSX.writeFile(wb, 'student-submissions.xlsx');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  const handleExportToCSV = () => {
    try {
      let csvContent = '';
      
      if (activeTab === 0) {
        csvContent = 'Department,Code,Count\n';
        analytics.department_distribution.forEach(d => {
          csvContent += `"${d.department}","${d.code}",${d.count}\n`;
        });
      } else if (activeTab === 1) {
        csvContent = 'Question,Category,Response Count\n';
        analytics.question_affinity.forEach(q => {
          csvContent += `"${q.question_text}","${q.category}",${q.response_count}\n`;
        });
      } else if (activeTab === 3) {
        csvContent = 'Assessment ID,Student Name,Student Email,Started At,Completed At,Top Department,Match %\n';
        submissions.forEach(s => {
          csvContent += `"${s.id}","${s.student_name}","${s.student_email}","${new Date(s.started_at).toLocaleString()}","${new Date(s.completed_at).toLocaleString()}","${s.top_department}",${s.match_percentage}\n`;
        });
      }
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `export-${Date.now()}.csv`;
      link.click();
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  const submissionColumns = [
    { field: 'id', headerName: 'Assessment ID', width: 280, sortable: true },
    { field: 'student_name', headerName: 'Student Name', width: 180, sortable: true },
    { field: 'student_email', headerName: 'Email', width: 220, sortable: true },
    { 
      field: 'completed_at', 
      headerName: 'Completed', 
      width: 180, 
      sortable: true,
      renderCell: (params) => new Date(params.value).toLocaleString()
    },
    { 
      field: 'top_department', 
      headerName: 'Top Match', 
      width: 200, 
      sortable: true,
      renderCell: (params) => (
        <Chip label={params.value} color="primary" size="small" />
      )
    },
    { 
      field: 'match_percentage', 
      headerName: 'Match %', 
      width: 120, 
      sortable: true,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <LinearProgress 
            variant="determinate" 
            value={params.value} 
            sx={{ flexGrow: 1, mr: 1, height: 6, borderRadius: 1 }}
          />
          <Typography variant="caption">{params.value}%</Typography>
        </Box>
      )
    }
  ];

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
              Real-time insights and analytics
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
              onClick={handleExportToExcel}
              variant="outlined"
            >
              Export Excel
            </Button>
            <Button
              startIcon={<Download />}
              onClick={handleExportToCSV}
              variant="outlined"
            >
              Export CSV
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Total Assessments
                    </Typography>
                    <Typography variant="h3" fontWeight={800} color="primary.main">
                      {stats.total_assessments || 0}
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), p: 1.5, borderRadius: 2 }}>
                    <AssessmentIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Completed
                    </Typography>
                    <Typography variant="h3" fontWeight={800} color="success.main">
                      {stats.completed_assessments || 0}
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), p: 1.5, borderRadius: 2 }}>
                    <People sx={{ color: 'success.main', fontSize: 32 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Completion Rate
                    </Typography>
                    <Typography variant="h3" fontWeight={800} color="info.main">
                      {stats.completion_rate || 0}%
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), p: 1.5, borderRadius: 2 }}>
                    <TrendingUp sx={{ color: 'info.main', fontSize: 32 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Avg. Rating
                    </Typography>
                    <Typography variant="h3" fontWeight={800} color="warning.main">
                      {stats.average_rating || 0}
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), p: 1.5, borderRadius: 2 }}>
                    <Timeline sx={{ color: 'warning.main', fontSize: 32 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper sx={{ mb: 3, borderRadius: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<PieChart />} label="Department Distribution" iconPosition="start" />
            <Tab icon={<BarChart />} label="Question Affinity" iconPosition="start" />
            <Tab icon={<Timeline />} label="Completion Trends" iconPosition="start" />
            <Tab icon={<TableChart />} label="Student Submissions" iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Department Distribution Chart */}
        {activeTab === 0 && (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                Department Preference Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Donut chart showing which departments students choose most frequently
              </Typography>
              
              {analytics.department_distribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsPie>
                    <Pie
                      data={analytics.department_distribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.department}: ${entry.count}`}
                      outerRadius={120}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {analytics.department_distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPie>
                </ResponsiveContainer>
              ) : (
                <Alert severity="info">No data available yet</Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Question Affinity Chart */}
        {activeTab === 1 && (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                Question Response Affinity
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Top 10 questions with highest response rates
              </Typography>
              
              {analytics.question_affinity.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsBar data={analytics.question_affinity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="response_count" fill={theme.palette.primary.main} name="Response Count" />
                  </RechartsBar>
                </ResponsiveContainer>
              ) : (
                <Alert severity="info">No data available yet</Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Completion Trends */}
        {activeTab === 2 && (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                Assessment Completion Trends (Last 30 Days)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Daily assessment completion counts
              </Typography>
              
              {analytics.completion_trend.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsBar data={analytics.completion_trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill={theme.palette.success.main} name="Completions" />
                  </RechartsBar>
                </ResponsiveContainer>
              ) : (
                <Alert severity="info">No completion data for the last 30 days</Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Student Submissions Table */}
        {activeTab === 3 && (
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    Student Submissions
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Searchable, paginated table of all completed assessments
                  </Typography>
                </Box>
                <TextField
                  placeholder="Search by name or email..."
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ minWidth: 300 }}
                />
              </Box>
              
              <DataGrid
                rows={submissions}
                columns={submissionColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 25, 50]}
                rowCount={totalSubmissions}
                paginationMode="server"
                sortingMode="server"
                sortModel={sortModel}
                onSortModelChange={setSortModel}
                loading={submissionsLoading}
                disableRowSelectionOnClick
                sx={{ 
                  height: 600,
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Last updated: {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AdminDashboard;

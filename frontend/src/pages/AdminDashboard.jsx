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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function AdminDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
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
    loadDashboardData();
  }, []);

  // Load submissions when switching to submissions tab
  useEffect(() => {
    if (activeTab === 3) {
      loadSubmissions();
    }
  }, [activeTab]);

  // Debounce search to avoid hammering the backend
  useEffect(() => {
    // Debounce search to avoid hammering the backend
    const timer = setTimeout(() => {
      if (activeTab === 3) {
        loadSubmissions();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, paginationModel, sortModel]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load stats (no token needed)
      const statsResponse = await fetch(`${API_BASE_URL}/admin/stats`);

      if (!statsResponse.ok) {
        throw new Error(`HTTP error! status: ${statsResponse.status}`);
      }

      const statsData = await statsResponse.json();
      setStats(statsData.data || {});

      // Load analytics
      const analyticsResponse = await fetch(`${API_BASE_URL}/admin/analytics`);

      if (!analyticsResponse.ok) {
        throw new Error(`HTTP error! status: ${analyticsResponse.status}`);
      }

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
      const sortBy = sortModel[0]?.field || 'completed_at';
      const sortOrder = sortModel[0]?.sort || 'desc';
      
      const response = await fetch(
        `${API_BASE_URL}/admin/submissions?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}&search=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
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
          (analytics.department_distribution || []).map(d => ({
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
          (analytics.question_affinity || []).map(q => ({
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
          (submissions || []).map(s => ({
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
      renderCell: (params) => params.value ? new Date(params.value).toLocaleString() : 'Pending'
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

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh', 
      py: 4,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 30%, ${alpha('#2e7d32', 0.04)} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${alpha('#f57c00', 0.04)} 0%, transparent 50%)`,
        pointerEvents: 'none'
      }
    }}>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header - Glassmorphism */}
        <Paper elevation={0} sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          p: 3,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${alpha('#2e7d32', 0.08)} 0%, ${alpha('#f57c00', 0.06)} 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha('#2e7d32', 0.15)}`,
          boxShadow: `0 8px 32px ${alpha('#2e7d32', 0.15)}`,
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h3" fontWeight={800} gutterBottom sx={{
              background: 'linear-gradient(135deg, #2e7d32 0%, #f57c00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1
            }}>
              <DashboardIcon sx={{ color: '#2e7d32' }} />
              Admin Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              Real-time insights and analytics
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            <Button
              startIcon={<Refresh />}
              onClick={handleRefresh}
              disabled={loading}
              variant="outlined"
              sx={{
                borderColor: '#2e7d32',
                color: '#2e7d32',
                borderWidth: 2,
                fontWeight: 700,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: alpha('#2e7d32', 0.08)
                }
              }}
            >
              Refresh
            </Button>
            <Button
              startIcon={<Download />}
              onClick={handleExportToExcel}
              variant="outlined"
              sx={{
                borderColor: '#f57c00',
                color: '#f57c00',
                borderWidth: 2,
                fontWeight: 700,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: alpha('#f57c00', 0.08)
                }
              }}
            >
              Export Excel
            </Button>
            <Button
              startIcon={<Download />}
              onClick={handleExportToCSV}
              variant="outlined"
              sx={{
                borderColor: '#f57c00',
                color: '#f57c00',
                borderWidth: 2,
                fontWeight: 700,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: alpha('#f57c00', 0.08)
                }
              }}
            >
              Export CSV
            </Button>
            <Button
              startIcon={<Logout />}
              onClick={handleLogout}
              variant="outlined"
              color="error"
              sx={{
                borderWidth: 2,
                fontWeight: 700,
                '&:hover': {
                  borderWidth: 2
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Paper>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {/* KPI Cards - Glassmorphism */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha('#2e7d32', 0.05)} 0%, ${alpha('#2e7d32', 0.02)} 100%)`,
              backdropFilter: 'blur(10px)',
              border: `2px solid ${alpha('#2e7d32', 0.15)}`,
              boxShadow: `0 4px 16px ${alpha('#2e7d32', 0.1)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 32px ${alpha('#2e7d32', 0.2)}`
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom fontWeight={600}>
                      Total Assessments
                    </Typography>
                    <Typography variant="h3" fontWeight={800} sx={{ color: '#2e7d32' }}>
                      {stats.total_assessments || 0}
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: alpha('#2e7d32', 0.15), p: 1.5, borderRadius: 2 }}>
                    <AssessmentIcon sx={{ color: '#2e7d32', fontSize: 32 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha('#4caf50', 0.05)} 0%, ${alpha('#4caf50', 0.02)} 100%)`,
              backdropFilter: 'blur(10px)',
              border: `2px solid ${alpha('#4caf50', 0.15)}`,
              boxShadow: `0 4px 16px ${alpha('#4caf50', 0.1)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 32px ${alpha('#4caf50', 0.2)}`
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom fontWeight={600}>
                      Completed
                    </Typography>
                    <Typography variant="h3" fontWeight={800} sx={{ color: '#4caf50' }}>
                      {stats.completed_assessments || 0}
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: alpha('#4caf50', 0.15), p: 1.5, borderRadius: 2 }}>
                    <People sx={{ color: '#4caf50', fontSize: 32 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha('#2196f3', 0.05)} 0%, ${alpha('#2196f3', 0.02)} 100%)`,
              backdropFilter: 'blur(10px)',
              border: `2px solid ${alpha('#2196f3', 0.15)}`,
              boxShadow: `0 4px 16px ${alpha('#2196f3', 0.1)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 32px ${alpha('#2196f3', 0.2)}`
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom fontWeight={600}>
                      Completion Rate
                    </Typography>
                    <Typography variant="h3" fontWeight={800} sx={{ color: '#2196f3' }}>
                      {stats.completion_rate || 0}%
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: alpha('#2196f3', 0.15), p: 1.5, borderRadius: 2 }}>
                    <TrendingUp sx={{ color: '#2196f3', fontSize: 32 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha('#f57c00', 0.05)} 0%, ${alpha('#f57c00', 0.02)} 100%)`,
              backdropFilter: 'blur(10px)',
              border: `2px solid ${alpha('#f57c00', 0.15)}`,
              boxShadow: `0 4px 16px ${alpha('#f57c00', 0.1)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 32px ${alpha('#f57c00', 0.2)}`
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom fontWeight={600}>
                      Avg. Rating
                    </Typography>
                    <Typography variant="h3" fontWeight={800} sx={{ color: '#f57c00' }}>
                      {stats.average_rating || 0}
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: alpha('#f57c00', 0.15), p: 1.5, borderRadius: 2 }}>
                    <Timeline sx={{ color: '#f57c00', fontSize: 32 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs - Glassmorphism */}
        <Paper elevation={0} sx={{ 
          mb: 3, 
          borderRadius: 4,
          background: alpha('#fff', 0.8),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha('#2e7d32', 0.15)}`,
          boxShadow: `0 4px 16px ${alpha('#000', 0.05)}`
        }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                fontWeight: 700,
                '&.Mui-selected': {
                  color: '#2e7d32'
                }
              },
              '& .MuiTabs-indicator': {
                bgcolor: '#2e7d32',
                height: 3
              }
            }}
          >
            <Tab icon={<PieChart />} label="Department Distribution" iconPosition="start" />
            <Tab icon={<BarChart />} label="Question Affinity" iconPosition="start" />
            <Tab icon={<Timeline />} label="Completion Trends" iconPosition="start" />
            <Tab icon={<TableChart />} label="Student Submissions" iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Department Distribution Chart - Glassmorphism */}
        {activeTab === 0 && (
          <Card sx={{ 
            borderRadius: 4,
            background: alpha('#fff', 0.8),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#2e7d32', 0.15)}`,
            boxShadow: `0 8px 32px ${alpha('#000', 0.08)}`
          }}>
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

        {/* Question Affinity Chart - Glassmorphism */}
        {activeTab === 1 && (
          <Card sx={{ 
            borderRadius: 4,
            background: alpha('#fff', 0.8),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#2e7d32', 0.15)}`,
            boxShadow: `0 8px 32px ${alpha('#000', 0.08)}`
          }}>
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

        {/* Completion Trends - Glassmorphism */}
        {activeTab === 2 && (
          <Card sx={{ 
            borderRadius: 4,
            background: alpha('#fff', 0.8),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#2e7d32', 0.15)}`,
            boxShadow: `0 8px 32px ${alpha('#000', 0.08)}`
          }}>
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

        {/* Student Submissions Table - Glassmorphism */}
        {activeTab === 3 && (
          <Card sx={{ 
            borderRadius: 4,
            background: alpha('#fff', 0.8),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#2e7d32', 0.15)}`,
            boxShadow: `0 8px 32px ${alpha('#000', 0.08)}`
          }}>
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

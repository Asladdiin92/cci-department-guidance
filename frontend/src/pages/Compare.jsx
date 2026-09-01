import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getDepartment } from '../services/api';

function Compare() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const deptCodes = searchParams.get('departments')?.split(',').filter(Boolean) || [];
    
    if (deptCodes.length < 2) {
      setError('Please select at least 2 departments to compare');
      setLoading(false);
      return;
    }

    if (deptCodes.length > 3) {
      setError('You can compare up to 3 departments at once');
      setLoading(false);
      return;
    }

    loadDepartments(deptCodes);
  }, [searchParams]);

  const loadDepartments = async (codes) => {
    try {
      setLoading(true);
      setError(null);
      const promises = codes.map(code => getDepartment(code));
      const results = await Promise.all(promises);
      setDepartments(results);
    } catch (err) {
      console.error('Error loading departments:', err);
      setError('Failed to load departments for comparison. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Loading Comparison...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/departments')}>
          Browse Departments
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <CompareArrowsIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Department Comparison
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Compare key features, career paths, and requirements side by side
        </Typography>
      </Box>

      {/* Department Headers */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {departments.map((dept) => (
          <Grid item xs={12} md={12 / departments.length} key={dept.code}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {dept.name}
              </Typography>
              <Chip label={dept.code} sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 'bold' }} />
              <Typography variant="body2" sx={{ mt: 2 }}>
                {dept.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Overview Comparison */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ p: 2, bgcolor: 'grey.100' }}>
          <Typography variant="h6" fontWeight="bold">
            <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Overview
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Duration</TableCell>
                {departments.map((dept) => (
                  <TableCell key={dept.code}>{dept.duration || 'N/A'}</TableCell>
                ))}
              </TableRow>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Degree</TableCell>
                {departments.map((dept) => (
                  <TableCell key={dept.code}>{dept.degree_type || 'Bachelor of Science'}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Department Code</TableCell>
                {departments.map((dept) => (
                  <TableCell key={dept.code}>
                    <Chip label={dept.code} size="small" color="primary" />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Career Paths Comparison */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ p: 2, bgcolor: 'grey.100' }}>
          <Typography variant="h6" fontWeight="bold">
            <WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Career Opportunities
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '20%', verticalAlign: 'top' }}>
                  Career Paths
                </TableCell>
                {departments.map((dept) => (
                  <TableCell key={dept.code} sx={{ verticalAlign: 'top' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {dept.career_paths?.slice(0, 5).map((career, idx) => (
                        <Chip
                          key={idx}
                          label={career}
                          size="small"
                          variant="outlined"
                          sx={{ justifyContent: 'flex-start' }}
                        />
                      ))}
                      {dept.career_paths?.length > 5 && (
                        <Typography variant="caption" color="text.secondary">
                          +{dept.career_paths.length - 5} more careers
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Skills Comparison */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ p: 2, bgcolor: 'grey.100' }}>
          <Typography variant="h6" fontWeight="bold">
            <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Required Skills & Strengths
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '20%', verticalAlign: 'top' }}>
                  Key Skills
                </TableCell>
                {departments.map((dept) => (
                  <TableCell key={dept.code} sx={{ verticalAlign: 'top' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {dept.required_skills?.slice(0, 5).map((skill, idx) => (
                        <Chip
                          key={idx}
                          label={skill}
                          size="small"
                          color="secondary"
                          sx={{ justifyContent: 'flex-start' }}
                        />
                      ))}
                      {dept.required_skills?.length > 5 && (
                        <Typography variant="caption" color="text.secondary">
                          +{dept.required_skills.length - 5} more skills
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Core Courses Preview */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ p: 2, bgcolor: 'grey.100' }}>
          <Typography variant="h6" fontWeight="bold">
            Core Courses (Sample)
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '20%', verticalAlign: 'top' }}>
                  Sample Courses
                </TableCell>
                {departments.map((dept) => (
                  <TableCell key={dept.code} sx={{ verticalAlign: 'top' }}>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      {dept.core_courses?.slice(0, 5).map((course, idx) => (
                        <li key={idx}>
                          <Typography variant="body2">{course}</Typography>
                        </li>
                      ))}
                      {dept.core_courses?.length > 5 && (
                        <Typography variant="caption" color="text.secondary">
                          +{dept.core_courses.length - 5} more courses
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        {departments.map((dept) => (
          <Button
            key={dept.code}
            variant="outlined"
            onClick={() => navigate(`/departments/${dept.code}`)}
          >
            View {dept.code} Details
          </Button>
        ))}
        <Divider orientation="vertical" flexItem />
        <Button
          variant="contained"
          onClick={() => navigate('/departments')}
        >
          Browse All Departments
        </Button>
      </Box>
    </Container>
  );
}

export default Compare;

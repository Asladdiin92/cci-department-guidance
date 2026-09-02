import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getDepartment } from '../services/api';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Paper,
  Alert,
  Checkbox,
  FormControlLabel,
  alpha,
  useTheme,
  CircularProgress
} from '@mui/material';
import {
  CompareArrows,
  CheckCircle,
  ArrowForward,
  Science,
  Code,
  Laptop,
  Work,
  School,
  TrendingUp,
  EmojiObjects,
  Psychology
} from '@mui/icons-material';
import { 
  INTENSITY_METRICS, 
  KEY_DIFFERENTIATORS, 
  DEPARTMENT_OPTIONS 
} from '../data/comparisonData';
import { CAREER_PATHWAYS } from '../data/careerData';

const departmentIcons = {
  CS: <Science />,
  SWE: <Code />,
  IT: <Laptop />,
  IS: <Work />,
  ISC: <School />,
  STAT: <TrendingUp />
};

const departmentColors = {
  CS: '#4f46e5',
  SWE: '#ea580c',
  IT: '#0d9488',
  IS: '#db2777',
  ISC: '#7c3aed',
  STAT: '#eab308'
};

function Compare() {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const deptCodes = searchParams.get('departments')?.split(',').filter(Boolean) || [];
    
    if (deptCodes.length === 0) {
      setShowSelector(true);
      setLoading(false);
      return;
    }

    if (deptCodes.length < 2) {
      setError('Please select at least 2 departments to compare');
      setShowSelector(true);
      setLoading(false);
      return;
    }

    if (deptCodes.length > 3) {
      setError('You can compare up to 3 departments at once');
      setLoading(false);
      return;
    }

    setSelectedDepts(deptCodes);
    loadDepartments(deptCodes);
  }, [searchParams]);

  const loadDepartments = async (codes) => {
    try {
      setLoading(true);
      setError(null);
      const promises = codes.map(code => getDepartment(code));
      const results = await Promise.all(promises);
      setDepartments(results);
      setShowSelector(false);
    } catch (err) {
      console.error('Error loading departments:', err);
      setError('Failed to load departments for comparison. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentToggle = (code) => {
    let newSelected = [...selectedDepts];
    
    if (newSelected.includes(code)) {
      newSelected = newSelected.filter(c => c !== code);
    } else {
      if (newSelected.length < 3) {
        newSelected.push(code);
      }
    }
    
    setSelectedDepts(newSelected);
  };

  const handleCompare = () => {
    if (selectedDepts.length < 2) {
      setError('Please select at least 2 departments');
      return;
    }
    setSearchParams({ departments: selectedDepts.join(',') });
  };

  const handleChangeSelection = () => {
    setShowSelector(true);
    setDepartments([]);
  };

  // Department Selector View
  if (showSelector || departments.length === 0) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        py: 12,
        background: `linear-gradient(180deg, ${alpha('#e8f5e9', 0.3)} 0%, ${alpha('#f5f5f5', 0.3)} 100%)`
      }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box sx={{ 
              width: 100, 
              height: 100, 
              borderRadius: '50%',
              bgcolor: alpha('#2e7d32', 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              border: `4px solid ${alpha('#2e7d32', 0.2)}`
            }}>
              <CompareArrows sx={{ fontSize: 50, color: '#2e7d32' }} />
            </Box>
            
            <Typography variant="h2" fontWeight={900} gutterBottom>
              Compare <Box component="span" sx={{ 
                background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Departments</Box>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Select 2 or 3 departments to see side-by-side comparison
            </Typography>
            <Chip 
              label="🎓 Haramaya University - CCI"
              sx={{ 
                bgcolor: alpha('#2e7d32', 0.1),
                color: '#2e7d32',
                fontWeight: 700,
                px: 2
              }}
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>
              {error}
            </Alert>
          )}

          {/* Selection Progress */}
          <Card sx={{ mb: 6, borderRadius: 4, border: `3px solid ${alpha('#2e7d32', 0.2)}` }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  Selected Departments
                </Typography>
                <Chip
                  label={`${selectedDepts.length}/3`}
                  sx={{ 
                    bgcolor: alpha('#2e7d32', 0.15),
                    color: '#2e7d32',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    height: 40,
                    px: 2
                  }}
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(selectedDepts.length / 3) * 100}
                sx={{
                  height: 12,
                  borderRadius: 2,
                  bgcolor: alpha('#2e7d32', 0.1),
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#2e7d32',
                    borderRadius: 2
                  }
                }}
              />
            </CardContent>
          </Card>

          {/* Department Selection Grid */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {DEPARTMENT_OPTIONS.map((dept) => {
              const isSelected = selectedDepts.includes(dept.code);
              const isDisabled = !isSelected && selectedDepts.length >= 3;
              const color = departmentColors[dept.code];
              
              return (
                <Grid item xs={12} sm={6} md={4} key={dept.code}>
                  <Card
                    onClick={() => !isDisabled && handleDepartmentToggle(dept.code)}
                    sx={{
                      height: '100%',
                      p: 3,
                      borderRadius: 4,
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      border: `3px solid ${isSelected ? color : alpha(color, 0.2)}`,
                      bgcolor: isSelected ? alpha(color, 0.05) : 'white',
                      opacity: isDisabled ? 0.5 : 1,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '6px',
                        bgcolor: color,
                        transform: isSelected ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.3s ease'
                      },
                      '&:hover': !isDisabled ? {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${alpha(color, 0.3)}`,
                        borderColor: color
                      } : {}
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          bgcolor: alpha(color, 0.1),
                          color: color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.8rem',
                          border: `3px solid ${alpha(color, 0.2)}`
                        }}
                      >
                        {departmentIcons[dept.code]}
                      </Box>
                      {isSelected && (
                        <CheckCircle sx={{ fontSize: 32, color: color }} />
                      )}
                    </Box>
                    
                    <Chip
                      label={dept.code}
                      size="small"
                      sx={{
                        bgcolor: isSelected ? color : alpha(color, 0.1),
                        color: isSelected ? 'white' : color,
                        fontWeight: 900,
                        mb: 2
                      }}
                    />
                    
                    <Typography variant="h6" fontWeight={800} sx={{ color: isSelected ? color : 'text.primary' }}>
                      {dept.name}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Compare Button */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              onClick={handleCompare}
              disabled={selectedDepts.length < 2}
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.2rem',
                fontWeight: 700,
                borderRadius: 3,
                textTransform: 'none',
                background: selectedDepts.length >= 2
                  ? 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)'
                  : alpha('#gray', 0.3),
                color: 'white',
                boxShadow: selectedDepts.length >= 2 ? `0 8px 24px ${alpha('#2e7d32', 0.4)}` : 'none',
                '&:hover': selectedDepts.length >= 2 ? {
                  background: 'linear-gradient(135deg, #1b5e20 0%, #0d4717 100%)',
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 32px ${alpha('#2e7d32', 0.5)}`
                } : {},
                '&:disabled': {
                  bgcolor: alpha('#000', 0.12),
                  color: alpha('#000', 0.26)
                },
                transition: 'all 0.3s ease'
              }}
            >
              {selectedDepts.length < 2
                ? `Select ${2 - selectedDepts.length} more department${2 - selectedDepts.length > 1 ? 's' : ''}`
                : `Compare ${selectedDepts.length} Departments`
              }
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ color: '#2e7d32', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">Loading comparison...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 12, bgcolor: alpha('#f5f5f5', 0.3) }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" fontWeight={900} gutterBottom>
            Side-by-Side <Box component="span" sx={{ 
              background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Comparison</Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            {departments.map(d => d.name).join(' vs. ')}
          </Typography>
          <Button
            onClick={handleChangeSelection}
            startIcon={<CompareArrows />}
            sx={{
              color: '#2e7d32',
              fontWeight: 600,
              '&:hover': {
                bgcolor: alpha('#2e7d32', 0.1)
              }
            }}
          >
            Change Selection
          </Button>
        </Box>

        {/* Intensity Comparison */}
        <Card sx={{ mb: 6, borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ 
            bgcolor: alpha('#2e7d32', 0.05),
            p: 4,
            borderBottom: `3px solid ${alpha('#2e7d32', 0.2)}`
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Psychology sx={{ fontSize: 40, color: '#2e7d32', mr: 2 }} />
              <Box>
                <Typography variant="h4" fontWeight={900}>
                  Intensity Comparison
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Visual comparison of key program characteristics (0-100 scale)
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={4}>
              {['math', 'coding', 'business', 'hardware'].map(metric => {
                const labels = {
                  math: { label: 'Math Intensity', icon: '📐' },
                  coding: { label: 'Coding Level', icon: '💻' },
                  business: { label: 'Business Focus', icon: '📊' },
                  hardware: { label: 'Hardware/Infrastructure', icon: '🖥️' }
                };
                
                return (
                  <Grid item xs={12} key={metric}>
                    <Paper elevation={0} sx={{ p: 3, bgcolor: alpha('#f5f5f5', 0.5), borderRadius: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Typography sx={{ fontSize: '2rem', mr: 2 }}>{labels[metric].icon}</Typography>
                        <Typography variant="h6" fontWeight={700}>{labels[metric].label}</Typography>
                      </Box>
                      
                      {departments.map((dept, idx) => {
                        const value = INTENSITY_METRICS[dept.code]?.[metric] || 0;
                        const color = departmentColors[dept.code];
                        
                        return (
                          <Box key={dept.code} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip
                                  label={dept.code}
                                  size="small"
                                  sx={{ 
                                    bgcolor: color,
                                    color: 'white',
                                    fontWeight: 900,
                                    minWidth: 60
                                  }}
                                />
                                <Typography variant="body2" fontWeight={600}>
                                  {dept.name}
                                </Typography>
                              </Box>
                              <Typography variant="h6" fontWeight={900} sx={{ color }}>
                                {value}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={value}
                              sx={{
                                height: 16,
                                borderRadius: 2,
                                bgcolor: alpha(color, 0.1),
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: color,
                                  borderRadius: 2
                                }
                              }}
                            />
                          </Box>
                        );
                      })}
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>

        {/* Career Opportunities */}
        <Card sx={{ mb: 6, borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ 
            bgcolor: alpha('#f57c00', 0.05),
            p: 4,
            borderBottom: `3px solid ${alpha('#f57c00', 0.2)}`
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Work sx={{ fontSize: 40, color: '#f57c00', mr: 2 }} />
              <Box>
                <Typography variant="h4" fontWeight={900}>
                  Career Opportunities
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Top 5 career paths for each department
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3}>
              {departments.map(dept => (
                <Grid item xs={12} md={departments.length === 2 ? 6 : 4} key={dept.code}>
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    bgcolor: alpha(departmentColors[dept.code], 0.03),
                    borderRadius: 3,
                    border: `2px solid ${alpha(departmentColors[dept.code], 0.2)}`,
                    height: '100%'
                  }}>
                    <Chip
                      label={dept.code}
                      sx={{
                        bgcolor: departmentColors[dept.code],
                        color: 'white',
                        fontWeight: 900,
                        mb: 2
                      }}
                    />
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {dept.name}
                    </Typography>
                    <Box sx={{ mt: 2, space: 2 }}>
                      {CAREER_PATHWAYS[dept.code]?.careers.slice(0, 5).map((career, idx) => (
                        <Paper
                          key={idx}
                          elevation={0}
                          sx={{
                            p: 2,
                            mb: 2,
                            bgcolor: 'white',
                            borderRadius: 2,
                            border: `1px solid ${alpha(departmentColors[dept.code], 0.2)}`
                          }}
                        >
                          <Typography variant="body2" fontWeight={700} gutterBottom>
                            {career.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Entry Level: ETB {career.entryLevel}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
          {departments.map(dept => (
            <Button
              key={dept.code}
              onClick={() => navigate(`/departments/${dept.code}`)}
              variant="outlined"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 3,
                borderWidth: 3,
                borderColor: departmentColors[dept.code],
                color: departmentColors[dept.code],
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': {
                  borderWidth: 3,
                  bgcolor: departmentColors[dept.code],
                  color: 'white',
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 32px ${alpha(departmentColors[dept.code], 0.4)}`
                },
                transition: 'all 0.3s ease'
              }}
            >
              View {dept.code} Details
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Compare;

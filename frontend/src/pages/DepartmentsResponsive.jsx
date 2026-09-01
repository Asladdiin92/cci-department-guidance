import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  School,
  TrendingUp,
  Code,
  Business,
  Science,
  ArrowForward,
  Computer,
  Storage,
  Psychology
} from '@mui/icons-material';
import { getDepartments } from '../services/api';

// Department metadata for filtering and badges
const DEPARTMENT_METADATA = {
  CS: {
    mathIntensity: 'High',
    codingLevel: 'High',
    theoryPractice: '70/30',
    tags: ['Algorithm Design', 'Theoretical Computing', 'Research-Focused', 'Math Heavy'],
    focus: 'Theory & Algorithms',
    icon: <Psychology />,
    color: '#4f46e5'
  },
  SWE: {
    mathIntensity: 'Medium',
    codingLevel: 'Very High',
    theoryPractice: '30/70',
    tags: ['High Programming', 'Software Development', 'Project-Based', 'Practical'],
    focus: 'Building Software',
    icon: <Code />,
    color: '#ea580c'
  },
  IT: {
    mathIntensity: 'Low',
    codingLevel: 'Medium',
    theoryPractice: '20/80',
    tags: ['Infrastructure', 'Networks', 'Cloud Computing', 'Hands-On'],
    focus: 'Systems & Networks',
    icon: <Computer />,
    color: '#0d9488'
  },
  IS: {
    mathIntensity: 'Low',
    codingLevel: 'Medium',
    theoryPractice: '40/60',
    tags: ['Business & Systems', 'Database Management', 'ERP', 'Analysis'],
    focus: 'Business Technology',
    icon: <Business />,
    color: '#db2777'
  },
  ISC: {
    mathIntensity: 'Low',
    codingLevel: 'Low',
    theoryPractice: '60/40',
    tags: ['Information Organization', 'Digital Libraries', 'Knowledge Management', 'Research'],
    focus: 'Information Management',
    icon: <Storage />,
    color: '#7c3aed'
  },
  STAT: {
    mathIntensity: 'Very High',
    codingLevel: 'Medium',
    theoryPractice: '50/50',
    tags: ['Data & AI', 'Statistical Modeling', 'Research', 'Math Heavy'],
    focus: 'Data Science',
    icon: <TrendingUp />,
    color: '#eab308'
  }
};

// Filter categories
const FILTER_OPTIONS = [
  { id: 'all', label: 'All Departments' },
  { id: 'high-programming', label: 'High Programming', match: dept => ['SWE', 'CS'].includes(dept.code) },
  { id: 'business-systems', label: 'Business & Systems', match: dept => ['IS', 'ISC'].includes(dept.code) },
  { id: 'data-ai', label: 'Data & AI', match: dept => ['STAT', 'CS'].includes(dept.code) },
  { id: 'low-math', label: 'Low Math', match: dept => ['IT', 'IS', 'ISC'].includes(dept.code) },
  { id: 'practical', label: 'Hands-On', match: dept => {
    const meta = DEPARTMENT_METADATA[dept.code];
    return meta && parseInt(meta.theoryPractice.split('/')[1]) >= 60;
  }}
];

function Departments() {
  const theme = useTheme();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDepartments();
      // Enrich with metadata
      const enrichedData = data.map(dept => ({
        ...dept,
        metadata: DEPARTMENT_METADATA[dept.code] || {}
      }));
      setDepartments(enrichedData);
    } catch (err) {
      setError(err.message || 'Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  // Filtered departments based on search and active filter
  const filteredDepartments = useMemo(() => {
    let filtered = departments;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dept => 
        dept.name.toLowerCase().includes(query) ||
        dept.code.toLowerCase().includes(query) ||
        dept.description.toLowerCase().includes(query) ||
        dept.metadata.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      const filterOption = FILTER_OPTIONS.find(f => f.id === activeFilter);
      if (filterOption?.match) {
        filtered = filtered.filter(filterOption.match);
      }
    }

    return filtered;
  }, [departments, searchQuery, activeFilter]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography sx={{ mt: 2, color: 'text.secondary' }}>Loading departments...</Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchDepartments} fullWidth>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'background.default', minHeight: '80vh' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 800,
              mb: 2
            }}
          >
            Department{' '}
            <Box component="span" sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Explorer
            </Box>
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              maxWidth: 700,
              mx: 'auto',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
            }}
          >
            Discover your perfect fit among 6 specialized departments. Filter by skills, interests, and career goals.
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'background.paper'
              }
            }}
          />
        </Box>

        {/* Filter Pills */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mb: 4 }}>
          {FILTER_OPTIONS.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              onClick={() => setActiveFilter(filter.id)}
              color={activeFilter === filter.id ? 'primary' : 'default'}
              variant={activeFilter === filter.id ? 'filled' : 'outlined'}
              sx={{
                fontWeight: activeFilter === filter.id ? 700 : 500,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                px: { xs: 1, sm: 2 }
              }}
            />
          ))}
        </Box>

        {/* Results Count */}
        <Typography 
          sx={{ 
            textAlign: 'center',
            mb: 4,
            color: 'text.secondary',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Showing <Box component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>{filteredDepartments.length}</Box> of {departments.length} departments
        </Typography>

        {/* Departments Grid */}
        {filteredDepartments.length > 0 ? (
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {filteredDepartments.map((dept) => (
              <Grid item xs={12} sm={6} md={4} key={dept.id}>
                <DepartmentCard department={dept} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h3" sx={{ fontSize: '4rem', mb: 2 }}>🔍</Typography>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              No departments found
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search or filter criteria
            </Typography>
            <Button variant="contained" onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}>
              Clear Filters
            </Button>
          </Box>
        )}

        {/* CTA Section */}
        <Box 
          sx={{ 
            mt: { xs: 6, md: 10 },
            p: { xs: 3, sm: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            Still unsure which department is right for you?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Take our personalized assessment to discover your perfect fit in under 10 minutes!
          </Typography>
          <Button
            component={Link}
            to="/assessment"
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Take Assessment
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// Department Card Component
function DepartmentCard({ department }) {
  const theme = useTheme();
  const { code, name, description, metadata } = department;
  const color = metadata.color || theme.palette.primary.main;

  return (
    <Card
      component={Link}
      to={`/departments/${code}`}
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        borderRadius: 3,
        border: `2px solid ${alpha(color, 0.1)}`,
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: color,
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.3s ease'
        },
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[12],
          borderColor: color,
          '&::before': {
            transform: 'scaleX(1)'
          }
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Chip 
            label={code}
            sx={{ 
              bgcolor: color,
              color: 'white',
              fontWeight: 700,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          />
          <Box sx={{ color: color, opacity: 0.6 }}>
            {metadata.icon}
          </Box>
        </Box>

        {/* Name & Focus */}
        <Typography 
          variant="h6" 
          fontWeight={700}
          gutterBottom
          sx={{ 
            color: 'text.primary',
            fontSize: { xs: '1rem', sm: '1.125rem' }
          }}
        >
          {name}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: color,
            fontWeight: 600,
            mb: 2,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          {metadata.focus}
        </Typography>

        {/* Badges */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip 
            label={`📐 Math: ${metadata.mathIntensity}`}
            size="small"
            variant="outlined"
            sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
          />
          <Chip 
            label={`💻 Code: ${metadata.codingLevel}`}
            size="small"
            variant="outlined"
            sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
          />
          <Chip 
            label={`⚖️ ${metadata.theoryPractice}`}
            size="small"
            variant="outlined"
            sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
          />
        </Box>

        {/* Description */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          {description}
        </Typography>

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {metadata.tags?.slice(0, 2).map((tag, idx) => (
            <Chip
              key={idx}
              label={tag}
              size="small"
              sx={{ 
                fontSize: '0.65rem',
                height: 20
              }}
            />
          ))}
          {metadata.tags?.length > 2 && (
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
              +{metadata.tags.length - 2}
            </Typography>
          )}
        </Box>

        {/* Learn More */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2, borderTop: `1px solid ${alpha(color, 0.1)}` }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: color,
              fontWeight: 600,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            Explore Program
          </Typography>
          <ArrowForward sx={{ color: color, fontSize: 20 }} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default Departments;

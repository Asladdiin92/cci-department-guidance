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
  alpha,
  Paper
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

// Department metadata for filtering and badges - Haramaya University themed
const DEPARTMENT_METADATA = {
  CS: {
    mathIntensity: 'High',
    codingLevel: 'High',
    theoryPractice: '70/30',
    tags: ['Algorithm Design', 'AI & Machine Learning', 'Research-Focused', 'Problem Solving'],
    focus: 'Theory & Algorithms',
    icon: <Psychology />,
    color: '#2e7d32', // Haramaya green
    tagline: 'Master the science behind computing and artificial intelligence',
    highlights: ['🎓 Research Excellence', '🧠 Deep Problem Solving', '🤖 AI Innovation']
  },
  SWE: {
    mathIntensity: 'Medium',
    codingLevel: 'Very High',
    theoryPractice: '30/70',
    tags: ['Full-Stack Development', 'Agile Methods', 'Project-Based', 'Industry-Ready'],
    focus: 'Building Software',
    icon: <Code />,
    color: '#f57c00', // Haramaya gold
    tagline: 'Build tomorrow\'s applications with cutting-edge technologies',
    highlights: ['💻 High Coding', '🚀 Practical Projects', '⚡ Fast-Paced']
  },
  IT: {
    mathIntensity: 'Low',
    codingLevel: 'Medium',
    theoryPractice: '20/80',
    tags: ['Cloud Computing', 'Network Security', 'System Administration', 'DevOps'],
    focus: 'Systems & Networks',
    icon: <Computer />,
    color: '#1976d2', // Haramaya blue
    tagline: 'Design and secure the digital infrastructure of tomorrow',
    highlights: ['☁️ Cloud & Networks', '🔒 Cybersecurity', '⚙️ Hands-On Labs']
  },
  IS: {
    mathIntensity: 'Low',
    codingLevel: 'Medium',
    theoryPractice: '40/60',
    tags: ['Business Analytics', 'Enterprise Systems', 'ERP Solutions', 'Digital Transformation'],
    focus: 'Business Technology',
    icon: <Business />,
    color: '#c62828', // Haramaya red
    tagline: 'Bridge technology and business for digital transformation',
    highlights: ['📊 Business + Tech', '💼 Enterprise Focus', '📈 Strategic Impact']
  },
  ISC: {
    mathIntensity: 'Low',
    codingLevel: 'Low',
    theoryPractice: '60/40',
    tags: ['Digital Libraries', 'Knowledge Systems', 'Information Architecture', 'Data Curation'],
    focus: 'Information Management',
    icon: <Storage />,
    color: '#6a1b9a', // Purple
    tagline: 'Organize and manage the world\'s digital information',
    highlights: ['📚 Knowledge Systems', '🗂️ Data Organization', '🔍 Information Science']
  },
  STAT: {
    mathIntensity: 'Very High',
    codingLevel: 'Medium',
    theoryPractice: '50/50',
    tags: ['Data Science', 'Machine Learning', 'Statistical Modeling', 'Predictive Analytics'],
    focus: 'Data Science',
    icon: <TrendingUp />,
    color: '#f57c00', // Haramaya gold
    tagline: 'Turn data into insights and drive data-driven decisions',
    highlights: ['📊 Data Analytics', '🤖 ML & AI', '📈 Predictive Models']
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
    <Box sx={{ 
      py: { xs: 4, md: 8 }, 
      bgcolor: 'background.default', 
      minHeight: '80vh',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 30%, ${alpha('#2e7d32', 0.05)} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${alpha('#f57c00', 0.05)} 0%, transparent 50%)`,
        pointerEvents: 'none'
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header - Glassmorphism */}
        <Paper elevation={0} sx={{
          textAlign: 'center',
          mb: { xs: 4, md: 6 },
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: `linear-gradient(135deg, ${alpha('#2e7d32', 0.08)} 0%, ${alpha('#f57c00', 0.06)} 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha('#2e7d32', 0.1)}`,
          boxShadow: `0 8px 32px ${alpha('#2e7d32', 0.15)}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '"HU"',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: { xs: '120px', md: '180px' },
            fontWeight: 900,
            color: alpha('#2e7d32', 0.03),
            zIndex: 0,
            userSelect: 'none',
            pointerEvents: 'none'
          }
        }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(135deg, #2e7d32 0%, #f57c00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Department Explorer
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                maxWidth: 700,
                mx: 'auto',
                fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' },
                lineHeight: 1.6
              }}
            >
              Discover your perfect fit among <Box component="span" sx={{ fontWeight: 700, color: '#2e7d32' }}>6 world-class departments</Box>. 
              Filter by skills, interests, and career goals to find where you'll thrive.
            </Typography>
          </Box>
        </Paper>

        {/* Search Bar - Glassmorphism */}
        <Paper elevation={0} sx={{ 
          maxWidth: 700, 
          mx: 'auto', 
          mb: 4,
          borderRadius: 4,
          background: alpha('#fff', 0.8),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha('#2e7d32', 0.15)}`,
          boxShadow: `0 4px 16px ${alpha('#000', 0.05)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: `0 8px 24px ${alpha('#2e7d32', 0.15)}`,
            border: `1px solid ${alpha('#2e7d32', 0.3)}`
          }
        }}>
          <TextField
            fullWidth
            placeholder="Search departments, skills, or career paths..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#2e7d32' }} />
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
                border: 'none',
                '& fieldset': {
                  border: 'none'
                }
              }
            }}
          />
        </Paper>

        {/* Filter Pills - Haramaya colors */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mb: 4 }}>
          {FILTER_OPTIONS.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              onClick={() => setActiveFilter(filter.id)}
              variant={activeFilter === filter.id ? 'filled' : 'outlined'}
              sx={{
                fontWeight: activeFilter === filter.id ? 700 : 500,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                px: { xs: 1, sm: 2 },
                bgcolor: activeFilter === filter.id ? '#2e7d32' : 'transparent',
                color: activeFilter === filter.id ? 'white' : '#2e7d32',
                borderColor: '#2e7d32',
                borderWidth: 2,
                boxShadow: activeFilter === filter.id ? `0 4px 12px ${alpha('#2e7d32', 0.3)}` : 'none',
                '&:hover': {
                  bgcolor: activeFilter === filter.id ? '#1b5e20' : alpha('#2e7d32', 0.08),
                  borderColor: '#2e7d32',
                  borderWidth: 2
                }
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
          Showing <Box component="span" sx={{ fontWeight: 700, color: '#2e7d32' }}>{filteredDepartments.length}</Box> of {departments.length} departments
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

        {/* CTA Section - Glassmorphism */}
        <Paper elevation={0}
          sx={{ 
            mt: { xs: 6, md: 10 },
            p: { xs: 3, sm: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha('#2e7d32', 0.08)} 0%, ${alpha('#f57c00', 0.06)} 100%)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha('#2e7d32', 0.15)}`,
            boxShadow: `0 8px 32px ${alpha('#2e7d32', 0.15)}`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '"HU"',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: { xs: '100px', md: '150px' },
              fontWeight: 900,
              color: alpha('#2e7d32', 0.02),
              zIndex: 0,
              userSelect: 'none',
              pointerEvents: 'none'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
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
                px: 5,
                py: 1.5,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: 700,
                bgcolor: '#2e7d32',
                color: 'white',
                boxShadow: `0 4px 16px ${alpha('#2e7d32', 0.3)}`,
                '&:hover': {
                  bgcolor: '#1b5e20',
                  boxShadow: `0 6px 24px ${alpha('#2e7d32', 0.4)}`,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Take Assessment
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

// Department Card Component
function DepartmentCard({ department }) {
  const theme = useTheme();
  const { code, name, description, metadata } = department;
  const color = metadata.color || '#2e7d32';

  return (
    <Card
      component={Link}
      to={`/departments/${code}`}
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        borderRadius: 4,
        border: `2px solid ${alpha(color, 0.15)}`,
        background: `linear-gradient(135deg, ${alpha(color, 0.04)} 0%, ${alpha('#fff', 0.8)} 100%)`,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 4px 16px ${alpha(color, 0.08)}`,
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
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        '&:hover': {
          transform: 'translateY(-12px)',
          boxShadow: `0 20px 60px ${alpha(color, 0.25)}`,
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
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            mb: 1
          }}
        >
          {name}
        </Typography>
        
        {/* Tagline */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            fontStyle: 'italic',
            mb: 2,
            fontSize: { xs: '0.75rem', sm: '0.8125rem' },
            lineHeight: 1.5
          }}
        >
          {metadata.tagline}
        </Typography>

        {/* Highlights */}
        {metadata.highlights && (
          <Box sx={{ mb: 2 }}>
            {metadata.highlights.map((highlight, idx) => (
              <Typography 
                key={idx}
                variant="caption" 
                sx={{ 
                  display: 'block',
                  color: 'text.secondary',
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  mb: 0.5
                }}
              >
                {highlight}
              </Typography>
            ))}
          </Box>
        )}

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

        {/* Description - More visible and attractive */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2.5,
            lineHeight: 1.7,
            fontSize: { xs: '0.8125rem', sm: '0.9rem' },
            minHeight: { xs: '48px', sm: '54px' }
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

        {/* Learn More Button - More prominent */}
        <Button
          fullWidth
          endIcon={<ArrowForward />}
          sx={{
            mt: 'auto',
            py: 1.5,
            bgcolor: alpha(color, 0.08),
            color: color,
            fontWeight: 700,
            fontSize: { xs: '0.875rem', sm: '0.95rem' },
            borderRadius: 2,
            textTransform: 'none',
            border: `2px solid ${alpha(color, 0.2)}`,
            '&:hover': {
              bgcolor: color,
              color: 'white',
              border: `2px solid ${color}`,
              transform: 'translateX(4px)',
              boxShadow: `0 8px 24px ${alpha(color, 0.3)}`
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          Learn More & Apply
        </Button>
      </CardContent>
    </Card>
  );
}

export default Departments;

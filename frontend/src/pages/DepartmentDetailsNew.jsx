import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
  Divider,
  Paper,
  useTheme,
  alpha,
  Tabs,
  Tab
} from '@mui/material';
import {
  ArrowBack,
  ExpandMore,
  CheckCircle,
  Work,
  School,
  TrendingUp,
  Business,
  Close,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import { getDepartment } from '../services/api';
import { CAREER_PATHWAYS, DEPARTMENT_FIT_CHECKLIST, KEY_TRAITS } from '../data/careerData';
import { CURRICULUM_DATA, COURSE_TYPE_CONFIG } from '../data/curriculumData';

// Color mapping
const DEPARTMENT_COLORS = {
  CS: { primary: '#4f46e5', gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' },
  SWE: { primary: '#ea580c', gradient: 'linear-gradient(135deg, #ea580c 0%, #16a34a 100%)' },
  IT: { primary: '#0d9488', gradient: 'linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)' },
  IS: { primary: '#db2777', gradient: 'linear-gradient(135deg, #db2777 0%, #f59e0b 100%)' },
  ISC: { primary: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)' },
  STAT: { primary: '#eab308', gradient: 'linear-gradient(135deg, #eab308 0%, #06b6d4 100%)' }
};

function DepartmentDetails() {
  const theme = useTheme();
  const { code } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchDepartment();
  }, [code]);

  const fetchDepartment = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDepartment(code.toUpperCase());
      setDepartment(data);
    } catch (err) {
      console.error('Failed to fetch department:', err);
      setError('Department not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography sx={{ mt: 2, color: 'text.secondary' }}>Loading department details...</Typography>
        </Box>
      </Box>
    );
  }

  if (error || !department) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Department not found'}
        </Alert>
        <Button component={Link} to="/departments" variant="contained" fullWidth>
          Back to Departments
        </Button>
      </Container>
    );
  }

  const deptColor = DEPARTMENT_COLORS[department.code] || DEPARTMENT_COLORS.CS;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/departments')}
          sx={{ mb: 3, color: 'text.secondary' }}
        >
          Back to Departments
        </Button>

        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            background: deptColor.gradient,
            color: 'white',
            borderRadius: 3,
            p: { xs: 3, md: 6 },
            mb: 4,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Chip
                label={department.code}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 700,
                  backdropFilter: 'blur(10px)'
                }}
              />
              <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4rem' }, opacity: 0.3 }}>
                {getIcon(department.code)}
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 800,
                mb: 2
              }}
            >
              {department.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                maxWidth: 800,
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
              }}
            >
              {department.description}
            </Typography>
          </Box>
        </Paper>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <StatCard icon="🎓" title="Program Duration" value="4 Years" subtitle="Bachelor's Degree" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard
              icon="💼"
              title="Career Paths"
              value={department.career_paths?.length || 'Multiple'}
              subtitle="Opportunities"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard icon="📚" title="Curriculum" value="120+ Credits" subtitle="Core & Electives" />
          </Grid>
        </Grid>

        {/* Career Opportunities */}
        {department.career_paths && department.career_paths.length > 0 && (
          <Card sx={{ mb: 4, borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Work sx={{ fontSize: 40, mr: 2, color: deptColor.primary }} />
                <Typography variant="h5" fontWeight={700}>
                  Career Opportunities
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {department.career_paths.map((path, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        p: 2,
                        bgcolor: alpha(deptColor.primary, 0.05),
                        borderRadius: 2,
                        border: `1px solid ${alpha(deptColor.primary, 0.1)}`
                      }}
                    >
                      <CheckCircle sx={{ color: deptColor.primary, mr: 2, mt: 0.5 }} />
                      <Typography variant="body2">{path}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* What You'll Learn */}
        <Card sx={{ mb: 4, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <School sx={{ fontSize: 40, mr: 2, color: deptColor.primary }} />
              <Typography variant="h5" fontWeight={700}>
                What You'll Learn
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {getLearningAreas(department.code).map((area, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: deptColor.gradient,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        mr: 2,
                        flexShrink: 0
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        {area.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {area.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Skills You'll Develop */}
        <Card sx={{ mb: 4, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUp sx={{ fontSize: 40, mr: 2, color: deptColor.primary }} />
              <Typography variant="h5" fontWeight={700}>
                Skills You'll Develop
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {getSkills(department.code).map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{
                    background: deptColor.gradient,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Is This For You? */}
        <Card sx={{ mb: 4, borderRadius: 3, border: `2px solid ${alpha(deptColor.primary, 0.2)}` }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CheckCircle sx={{ fontSize: 40, mr: 2, color: deptColor.primary }} />
              <Typography variant="h5" fontWeight={700}>
                Is This Department For You?
              </Typography>
            </Box>

            {/* Key Traits */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ color: deptColor.primary, mb: 2 }}>
                  💪 Strengths Needed
                </Typography>
                {KEY_TRAITS[department.code]?.strengths.map((trait, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mb: 1, pl: 2 }}>
                    • {trait}
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ color: deptColor.primary, mb: 2 }}>
                  🎯 Common Interests
                </Typography>
                {KEY_TRAITS[department.code]?.interests.map((interest, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mb: 1, pl: 2 }}>
                    • {interest}
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ color: deptColor.primary, mb: 2 }}>
                  ⭐ Personality Traits
                </Typography>
                {KEY_TRAITS[department.code]?.personality.map((trait, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mb: 1, pl: 2 }}>
                    • {trait}
                  </Typography>
                ))}
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Self-Check */}
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Self-Check: You might be a great fit if...
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {DEPARTMENT_FIT_CHECKLIST[department.code]?.map((indicator, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="body2">{indicator}</Typography>}
                  />
                </Grid>
              ))}
            </Grid>
            <Alert severity="success" sx={{ mt: 3 }}>
              ✨ Check 4 or more? This department is likely a strong match for you!
            </Alert>
          </CardContent>
        </Card>

        {/* Career Pathway Matrix */}
        <Card sx={{ mb: 4, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Business sx={{ fontSize: 40, mr: 2, color: deptColor.primary }} />
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  Career Pathway Matrix
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Explore job roles, salary ranges (in Ethiopian Birr), and career progression
                </Typography>
              </Box>
            </Box>

            {CAREER_PATHWAYS[department.code]?.careers.map((career, idx) => (
              <Card key={idx} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {career.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {career.description}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.success.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2
                          }}
                        >
                          <Typography fontSize="1.5rem">🎓</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Entry Level (0-2 years)
                          </Typography>
                          <Typography variant="h6" fontWeight={700} sx={{ color: 'success.main' }}>
                            ETB {career.entryLevel}/month
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: alpha(deptColor.primary, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2
                          }}
                        >
                          <Typography fontSize="1.5rem">👔</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Senior Level (5+ years)
                          </Typography>
                          <Typography variant="h6" fontWeight={700} sx={{ color: deptColor.primary }}>
                            ETB {career.seniorLevel}/month
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}

            <Alert severity="info" sx={{ mt: 3 }}>
              <strong>💡 Note:</strong> Salary ranges reflect current Ethiopian market rates (2026) and vary
              based on company size, location, experience, and technical skills.
            </Alert>
          </CardContent>
        </Card>

        {/* Top Employers */}
        <Card sx={{ mb: 4, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              🏢 Top Employers in Ethiopia
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Major organizations actively hiring {department.code} graduates
            </Typography>
            <Grid container spacing={2}>
              {CAREER_PATHWAYS[department.code]?.employers.map((employer, idx) => (
                <Grid item xs={6} sm={4} md={3} key={idx}>
                  <Card variant="outlined" sx={{ textAlign: 'center', p: 2, height: '100%' }}>
                    <Typography fontSize="2.5rem">{employer.logo}</Typography>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      {employer.name}
                    </Typography>
                    <Chip label={employer.type} size="small" />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Curriculum Roadmap */}
        {CURRICULUM_DATA[department.code] && (
          <CurriculumRoadmap
            curriculum={CURRICULUM_DATA[department.code]}
            deptCode={department.code}
            deptColor={deptColor}
          />
        )}

        {/* CTA Section */}
        <Paper
          elevation={0}
          sx={{
            background: deptColor.gradient,
            color: 'white',
            borderRadius: 3,
            p: { xs: 3, md: 6 },
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, fontSize: { xs: '0.875rem', md: '1rem' } }}>
            Take our personalized assessment to see if {department.name} is the right fit for you.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/assessment"
              variant="contained"
              size="large"
              startIcon={<AssessmentIcon />}
              sx={{
                bgcolor: 'white',
                color: deptColor.primary,
                '&:hover': { bgcolor: 'grey.100' }
              }}
            >
              Take Assessment
            </Button>
            <Button
              component={Link}
              to="/compare"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Compare Departments
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

// Stat Card Component
function StatCard({ icon, title, value, subtitle }) {
  return (
    <Card sx={{ textAlign: 'center', py: 3, borderRadius: 3, height: '100%' }}>
      <Typography fontSize="3rem">{icon}</Typography>
      <Typography variant="caption" color="text.secondary" display="block">
        {title}
      </Typography>
      <Typography variant="h4" fontWeight={800} color="primary.main" sx={{ my: 1 }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {subtitle}
      </Typography>
    </Card>
  );
}

// Curriculum Roadmap Component
function CurriculumRoadmap({ curriculum, deptCode, deptColor }) {
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const years = [1, 2, 3, 4];

  return (
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              📅 Full Curriculum Roadmap
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {curriculum.programName}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h4" fontWeight={800} color="primary.main">
              {curriculum.totalCredits}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Credits
            </Typography>
          </Box>
        </Box>

        {/* Year Tabs */}
        <Tabs
          value={selectedYear}
          onChange={(e, newValue) => setSelectedYear(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          {years.map((year, idx) => {
            const semesters = curriculum.semesters.filter((s) => s.year === year);
            const yearCredits = semesters.reduce((sum, sem) => sum + sem.totalCredits, 0);
            return (
              <Tab
                key={year}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      Year {year}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {yearCredits} credits
                    </Typography>
                  </Box>
                }
              />
            );
          })}
        </Tabs>

        {/* Semesters */}
        {curriculum.semesters
          .filter((sem) => sem.year === years[selectedYear])
          .map((semester, idx) => (
            <Accordion key={idx} defaultExpanded={idx === 0} sx={{ mb: 2, borderRadius: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />} sx={{ background: alpha(deptColor.primary, 0.05) }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                  <Typography fontWeight={700}>
                    Semester {semester.semester}: {semester.title}
                  </Typography>
                  <Chip label={`${semester.totalCredits} credits`} size="small" />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {semester.courses.map((course, courseIdx) => (
                    <Grid item xs={12} key={courseIdx}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          '&:hover': { boxShadow: 2 }
                        }}
                        onClick={() => setSelectedCourse(course)}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight={600}>
                              {course.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {course.code}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Chip label={`${course.credits} cr`} size="small" />
                            <Chip label={course.type} size="small" color="primary" variant="outlined" />
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}

        {/* Course Detail Dialog */}
        <Dialog open={!!selectedCourse} onClose={() => setSelectedCourse(null)} maxWidth="sm" fullWidth>
          {selectedCourse && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {selectedCourse.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedCourse.code}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => setSelectedCourse(null)} size="small">
                    <Close />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Credits
                      </Typography>
                      <Typography variant="h5" fontWeight={700} color="primary.main">
                        {selectedCourse.credits}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Type
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {selectedCourse.type}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Lecture
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {selectedCourse.lecture}h/week
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Lab
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {selectedCourse.lab}h/week
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
                {selectedCourse.prerequisites?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Prerequisites
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedCourse.prerequisites.map((prereq, idx) => (
                        <Chip key={idx} label={prereq} size="small" color="warning" />
                      ))}
                    </Box>
                  </Box>
                )}
                <Alert severity="info">
                  <strong>💡 Tip:</strong> This course requires {selectedCourse.lecture + selectedCourse.lab} contact
                  hours per week. Plan additional {selectedCourse.credits * 2} hours for self-study.
                </Alert>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedCourse(null)}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
}

// Helper functions
function getIcon(code) {
  const icons = { CS: '💻', SWE: '⚙️', IT: '🌐', IS: '📊', ISC: '📚', STAT: '📈' };
  return icons[code] || '🎓';
}

function getLearningAreas(code) {
  const areas = {
    CS: [
      { title: 'Algorithms & Data Structures', description: 'Master efficient problem-solving' },
      { title: 'Artificial Intelligence', description: 'Explore machine learning systems' },
      { title: 'Theory of Computation', description: 'Mathematical foundations' },
      { title: 'Computer Architecture', description: 'Hardware-level understanding' }
    ],
    SWE: [
      { title: 'Software Development', description: 'Build robust applications' },
      { title: 'Software Architecture', description: 'Design scalable systems' },
      { title: 'DevOps & CI/CD', description: 'Automate deployment' },
      { title: 'Quality Assurance', description: 'Ensure software quality' }
    ],
    IT: [
      { title: 'Network Administration', description: 'Manage computer networks' },
      { title: 'Cybersecurity', description: 'Protect systems from threats' },
      { title: 'Cloud Computing', description: 'Deploy cloud infrastructure' },
      { title: 'Systems Administration', description: 'Maintain IT infrastructure' }
    ],
    IS: [
      { title: 'Business Analysis', description: 'Bridge tech and business' },
      { title: 'Database Management', description: 'Design data solutions' },
      { title: 'Enterprise Systems', description: 'Implement ERP software' },
      { title: 'Project Management', description: 'Lead IT projects' }
    ],
    ISC: [
      { title: 'Information Retrieval', description: 'Build search systems' },
      { title: 'Data Curation', description: 'Organize digital information' },
      { title: 'User Experience', description: 'Design intuitive interfaces' },
      { title: 'Information Architecture', description: 'Structure information' }
    ],
    STAT: [
      { title: 'Statistical Methods', description: 'Apply statistical techniques' },
      { title: 'Data Analysis', description: 'Extract insights from data' },
      { title: 'Probability Theory', description: 'Understand uncertainty' },
      { title: 'Research Methods', description: 'Design experiments' }
    ]
  };
  return areas[code] || [];
}

function getSkills(code) {
  const skills = {
    CS: ['Python', 'Java', 'C++', 'Machine Learning', 'Algorithms', 'AI', 'Research'],
    SWE: ['JavaScript', 'React', 'Node.js', 'Docker', 'Git', 'Agile', 'Testing'],
    IT: ['Networking', 'Linux', 'Security', 'Cloud (AWS/Azure)', 'Troubleshooting'],
    IS: ['SQL', 'Business Analysis', 'ERP Systems', 'Project Management'],
    ISC: ['Information Architecture', 'UX Design', 'Metadata', 'Search Systems'],
    STAT: ['R', 'Python', 'Statistical Modeling', 'Data Visualization', 'Research']
  };
  return skills[code] || [];
}

export default DepartmentDetails;

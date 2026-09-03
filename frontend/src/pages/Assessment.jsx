import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { startAssessment, submitAssessment } from '../services/api';
import {
  Container,
  Typography,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Paper,
  Alert,
  CircularProgress,
  alpha,
  TextField,
  Card,
  CardContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';

function Assessment() {
  const navigate = useNavigate();
  const questionRef = useRef(null); // For auto-scrolling on mobile
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  
  // Student information state
  const [showStudentForm, setShowStudentForm] = useState(true);
  const [studentInfo, setStudentInfo] = useState({
    student_id: '',
    student_name: '',
    student_email: ''
  });
  const [studentInfoError, setStudentInfoError] = useState({});

  // Auto-scroll to top of question when index changes (great for mobile)
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentQuestionIndex]);

  const validateStudentInfo = () => {
    const errors = {};
    
    // Validate Student ID (required, alphanumeric)
    if (!studentInfo.student_id.trim()) {
      errors.student_id = 'Student ID is required';
    } else if (!/^[A-Za-z0-9\/\-]+$/.test(studentInfo.student_id)) {
      errors.student_id = 'Invalid Student ID format';
    }
    
    // Validate Name (required)
    if (!studentInfo.student_name.trim()) {
      errors.student_name = 'Name is required';
    } else if (studentInfo.student_name.trim().length < 3) {
      errors.student_name = 'Name must be at least 3 characters';
    }
    
    // Validate Email (required, valid format)
    if (!studentInfo.student_email.trim()) {
      errors.student_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentInfo.student_email)) {
      errors.student_email = 'Invalid email format';
    }
    
    setStudentInfoError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStudentInfoChange = (field, value) => {
    setStudentInfo(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user types
    if (studentInfoError[field]) {
      setStudentInfoError(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleStartAssessment = async () => {
    if (!validateStudentInfo()) {
      setError('Please fill in all required fields correctly');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await startAssessment(studentInfo);
      setAssessmentId(response.assessment_id);
      setQuestions(response.questions);
      setShowStudentForm(false);
    } catch (err) {
      console.error('Error loading assessment:', err);
      setError('Failed to start assessment. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadAssessment = async () => {
    // This function is now replaced by handleStartAssessment
    // Keeping it for compatibility but it won't be called automatically
  };

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
    // Clear error when user starts answering again
    if (error) setError(null);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent default form submission reload

    const unanswered = questions.filter(q => !(q.id in answers));
    if (unanswered.length > 0) {
      setError(`Please answer all questions. ${unanswered.length} question(s) remaining.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      // Use environment variable, fallback to relative path (best practice)
      const API_BASE = import.meta.env.VITE_API_URL || '/api';
      
      // 1. Save all responses CONCURRENTLY (Fixes the N+1 sequential bottleneck)
      const responsePromises = Object.entries(answers).map(async ([questionId, optionId]) => {
        const response = await fetch(`${API_BASE}/assessments/${assessmentId}/responses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question_id: questionId, option_id: optionId })
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to save question ${questionId}`);
        }
        return response.json();
      });

      // Wait for all to finish. If ANY fail, it jumps to the catch block.
      await Promise.all(responsePromises);
      
      // 2. Submit the assessment to calculate results
      // (Note: The ultimate fix is to update your backend to accept 'answers' 
      // directly in this submit call, eliminating the loop above entirely).
      const results = await submitAssessment(assessmentId);
      
      // 3. Navigate to results
      navigate(`/results/${assessmentId}`, { state: { results }, replace: true });
      
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setError(err.message || 'Failed to submit assessment. Please try again.');
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const isCurrentAnswered = currentQuestion && (currentQuestion.id in answers);
  const allAnswered = answeredCount === questions.length;

  // Show student information form first
  if (showStudentForm) {
    return (
      <Box sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        py: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(circle at 20% 30%, ${alpha('#2e7d32', 0.05)} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${alpha('#f57c00', 0.05)} 0%, transparent 50%)`,
          pointerEvents: 'none'
        }
      }}>
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <Paper elevation={0} sx={{ 
            mb: 4, p: { xs: 3, md: 4 }, borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha('#2e7d32', 0.08)} 0%, ${alpha('#f57c00', 0.06)} 100%)`,
            backdropFilter: 'blur(20px)', border: `1px solid ${alpha('#2e7d32', 0.1)}`,
            boxShadow: `0 8px 32px ${alpha('#2e7d32', 0.15)}`, textAlign: 'center'
          }}>
            <Typography variant="h4" gutterBottom fontWeight={800} sx={{
              background: 'linear-gradient(135deg, #2e7d32 0%, #f57c00 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              Student Information
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please provide your information to start the assessment
            </Typography>
          </Paper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {/* Student Information Form */}
          <Card sx={{ 
            borderRadius: 4,
            background: alpha('#fff', 0.8),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#2e7d32', 0.1)}`,
            boxShadow: `0 8px 32px ${alpha('#000', 0.08)}`
          }}>
            <CardContent sx={{ p: 4 }}>
              <Box component="form" onSubmit={(e) => { e.preventDefault(); handleStartAssessment(); }}>
                {/* Student ID */}
                <TextField
                  fullWidth
                  label="Student ID"
                  placeholder="e.g., HU/CS/2024/001"
                  value={studentInfo.student_id}
                  onChange={(e) => handleStudentInfoChange('student_id', e.target.value)}
                  error={!!studentInfoError.student_id}
                  helperText={studentInfoError.student_id || 'Enter your university student ID'}
                  required
                  InputProps={{
                    startAdornment: <BadgeIcon sx={{ color: '#2e7d32', mr: 1 }} />
                  }}
                  sx={{ mb: 3 }}
                />

                {/* Student Name */}
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="e.g., Asladin Abdukedir"
                  value={studentInfo.student_name}
                  onChange={(e) => handleStudentInfoChange('student_name', e.target.value)}
                  error={!!studentInfoError.student_name}
                  helperText={studentInfoError.student_name || 'Enter your full name'}
                  required
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ color: '#2e7d32', mr: 1 }} />
                  }}
                  sx={{ mb: 3 }}
                />

                {/* Student Email */}
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  placeholder="e.g., yourname@haramaya.edu.et"
                  value={studentInfo.student_email}
                  onChange={(e) => handleStudentInfoChange('student_email', e.target.value)}
                  error={!!studentInfoError.student_email}
                  helperText={studentInfoError.student_email || 'Enter your university email'}
                  required
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ color: '#2e7d32', mr: 1 }} />
                  }}
                  sx={{ mb: 4 }}
                />

                {/* Start Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 24px ${alpha('#2e7d32', 0.4)}`
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Start Assessment'}
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Info Box */}
          <Alert severity="info" sx={{ mt: 3 }}>
            Your information will be used for analysis purposes and to send you your results.
          </Alert>
        </Container>
      </Box>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>Loading Assessment...</Typography>
      </Container>
    );
  }

  if (error && !questions.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button variant="contained" onClick={loadAssessment}>Retry</Button>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      py: 4,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: `radial-gradient(circle at 20% 30%, ${alpha('#2e7d32', 0.05)} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${alpha('#f57c00', 0.05)} 0%, transparent 50%)`,
        pointerEvents: 'none'
      }
    }}>
    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
      
      {/* Header */}
      <Paper elevation={0} sx={{ 
        mb: 4, p: { xs: 3, md: 4 }, borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha('#2e7d32', 0.08)} 0%, ${alpha('#f57c00', 0.06)} 100%)`,
        backdropFilter: 'blur(20px)', border: `1px solid ${alpha('#2e7d32', 0.1)}`,
        boxShadow: `0 8px 32px ${alpha('#2e7d32', 0.15)}`, textAlign: 'center', position: 'relative', overflow: 'hidden',
        '&::before': {
          content: '"HU"', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: { xs: '100px', md: '140px' }, fontWeight: 900, color: alpha('#2e7d32', 0.03),
          zIndex: 0, userSelect: 'none', pointerEvents: 'none'
        }
      }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" gutterBottom fontWeight={800} sx={{
            background: 'linear-gradient(135deg, #2e7d32 0%, #f57c00 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Department Recommendation Assessment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Answer all questions to receive personalized department recommendations.
          </Typography>
        </Box>
      </Paper>

      {/* Progress Bar */}
      <Paper elevation={0} sx={{ 
        mb: 4, p: 3, borderRadius: 3, background: alpha('#fff', 0.6),
        backdropFilter: 'blur(10px)', border: `1px solid ${alpha('#2e7d32', 0.1)}`,
        boxShadow: `0 4px 16px ${alpha('#000', 0.05)}`
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="body2" fontWeight={700} sx={{ color: '#2e7d32' }}>
            {answeredCount}/{questions.length} answered
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" value={progress} 
          sx={{ 
            height: 10, borderRadius: 4, bgcolor: alpha('#2e7d32', 0.1),
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #2e7d32 0%, #f57c00 100%)',
              borderRadius: 4, boxShadow: `0 2px 8px ${alpha('#2e7d32', 0.3)}`
            }
          }} 
        />
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Question Card - Wrapped in Form for Accessibility */}
      <form onSubmit={handleSubmit}>
        {currentQuestion && (
          <Paper ref={questionRef} elevation={0} sx={{ 
            p: 4, mb: 3, borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha('#fff', 0.8)} 0%, ${alpha('#fff', 0.6)} 100%)`,
            backdropFilter: 'blur(20px)', border: `2px solid ${alpha('#2e7d32', isCurrentAnswered ? 0.3 : 0.1)}`,
            boxShadow: `0 8px 32px ${alpha('#000', 0.08)}`, transition: 'all 0.3s ease',
            '&:hover': { border: `2px solid ${alpha('#2e7d32', 0.3)}`, boxShadow: `0 12px 48px ${alpha('#2e7d32', 0.15)}` }
          }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 700, color: '#2e7d32' }}>
              {currentQuestion.text}
            </Typography>

            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            >
              {currentQuestion.question_options?.map((option) => (
                <FormControlLabel
                  key={option.id} value={option.id}
                  control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />}
                  label={option.text}
                  sx={{ 
                    mb: 1.5, alignItems: 'flex-start', p: 1.5, borderRadius: 2, transition: 'all 0.2s ease',
                    '&:hover': { bgcolor: alpha('#2e7d32', 0.05) }
                  }}
                />
              ))}
            </RadioGroup>

            {isCurrentAnswered && (
              <Box sx={{ 
                mt: 3, p: 2, display: 'flex', alignItems: 'center', 
                bgcolor: alpha('#2e7d32', 0.1), borderRadius: 2, border: `1px solid ${alpha('#2e7d32', 0.2)}`
              }}>
                <CheckCircleIcon sx={{ mr: 1.5, fontSize: 24, color: '#2e7d32' }} />
                <Typography variant="body2" fontWeight={600} sx={{ color: '#2e7d32' }}>
                  Answer selected
                </Typography>
              </Box>
            )}
          </Paper>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button
            variant="outlined" startIcon={<ArrowBackIcon />} onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            sx={{ borderColor: '#2e7d32', color: '#2e7d32', borderWidth: 2, px: 3, py: 1.5, fontWeight: 700, '&:hover': { borderWidth: 2, bgcolor: alpha('#2e7d32', 0.08) } }}
          >
            Previous
          </Button>

          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext}
              sx={{ bgcolor: '#2e7d32', color: 'white', px: 4, py: 1.5, fontWeight: 700, boxShadow: `0 4px 16px ${alpha('#2e7d32', 0.3)}`, '&:hover': { bgcolor: '#1b5e20' } }}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit" // Triggers the form onSubmit
              variant="contained" onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              sx={{ 
                minWidth: 180, bgcolor: '#f57c00', color: 'white', px: 4, py: 1.5, fontWeight: 700,
                boxShadow: `0 4px 16px ${alpha('#f57c00', 0.3)}`, '&:hover': { bgcolor: '#e65100' },
                '&.Mui-disabled': { bgcolor: alpha('#f57c00', 0.4), color: 'white' }
              }}
            >
              {submitting ? <><CircularProgress size={20} sx={{ mr: 1 }} color="inherit" /> Submitting...</> : 'Submit Assessment'}
            </Button>
          )}
        </Box>
      </form>

      {/* Summary at bottom */}
      <Paper elevation={0} sx={{ 
        p: 3, borderRadius: 3, background: `linear-gradient(135deg, ${alpha('#f57c00', 0.08)} 0%, ${alpha('#2e7d32', 0.06)} 100%)`,
        backdropFilter: 'blur(10px)', border: `1px solid ${alpha('#f57c00', 0.2)}`, boxShadow: `0 4px 16px ${alpha('#f57c00', 0.1)}`
      }}>
        <Typography variant="body2" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', color: '#f57c00' }}>
          💡 Tip: You can navigate back to review and change your answers before submitting.
        </Typography>
      </Paper>
    </Container>
    </Box>
  );
}

export default Assessment;
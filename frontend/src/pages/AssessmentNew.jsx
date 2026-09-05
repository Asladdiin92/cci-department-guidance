/**
 * Enhanced Assessment Page - Day 3 Wizard Experience
 * Features: Progress indicator, card-based questions, micro-interactions,
 * localStorage save/resume, validation, review screen, engaging animations
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { startAssessment, submitAssessment } from '../services/api';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Alert,
  Stack,
  alpha,
  TextField,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Person as PersonIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
  Restore,
} from '@mui/icons-material';

// Import new components
import AssessmentProgressBar from '../components/AssessmentProgressBar';
import QuestionCard from '../components/QuestionCard';
import AssessmentReview from '../components/AssessmentReview';
import AssessmentLoadingAnimation from '../components/AssessmentLoadingAnimation';
import {
  saveAssessmentProgress,
  loadAssessmentProgress,
  clearAssessmentProgress,
  hasSavedProgress,
  formatSavedProgressTime,
} from '../utils/assessmentStorage';

function AssessmentNew() {
  const navigate = useNavigate();
  const questionRef = useRef(null);

  // State management
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReview, setShowReview] = useState(false);

  // Student information state
  const [showStudentForm, setShowStudentForm] = useState(true);
  const [studentInfo, setStudentInfo] = useState({
    student_id: '',
    student_name: '',
    student_email: '',
  });
  const [studentInfoError, setStudentInfoError] = useState({});

  // Resume dialog state
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [savedProgress, setSavedProgress] = useState(null);

  // Snackbar for auto-save notifications
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  // Check for saved progress on mount
  useEffect(() => {
    if (hasSavedProgress()) {
      const progress = loadAssessmentProgress();
      if (progress) {
        setSavedProgress(progress);
        setShowResumeDialog(true);
      }
    }
  }, []);

  // Auto-save progress when answers change
  useEffect(() => {
    if (assessmentId && questions.length > 0 && Object.keys(answers).length > 0) {
      const saveData = {
        assessmentId,
        sessionToken,
        questions,
        answers,
        currentQuestionIndex,
        studentInfo,
      };
      saveAssessmentProgress(saveData);
      setShowSaveNotification(true);
    }
  }, [answers, currentQuestionIndex]);

  // Auto-scroll to question
  useEffect(() => {
    if (questionRef.current && !showReview) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentQuestionIndex, showReview]);

  // Handle resume from saved progress
  const handleResumeProgress = () => {
    if (savedProgress) {
      setAssessmentId(savedProgress.assessmentId);
      setSessionToken(savedProgress.sessionToken);
      setQuestions(savedProgress.questions);
      setAnswers(savedProgress.answers);
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex || 0);
      setStudentInfo(savedProgress.studentInfo);
      setShowStudentForm(false);
      setShowResumeDialog(false);
    }
  };

  const handleStartFresh = () => {
    clearAssessmentProgress();
    setShowResumeDialog(false);
  };

  // Validation functions
  const validateStudentInfo = () => {
    const errors = {};

    if (!studentInfo.student_id.trim()) {
      errors.student_id = 'Student ID is required';
    } else if (!/^[A-Za-z0-9\/\-]+$/.test(studentInfo.student_id)) {
      errors.student_id = 'Invalid Student ID format';
    }

    if (!studentInfo.student_name.trim()) {
      errors.student_name = 'Name is required';
    } else if (studentInfo.student_name.trim().length < 3) {
      errors.student_name = 'Name must be at least 3 characters';
    }

    if (!studentInfo.student_email.trim()) {
      errors.student_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentInfo.student_email)) {
      errors.student_email = 'Invalid email format';
    }

    setStudentInfoError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStudentInfoChange = (field, value) => {
    setStudentInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user types (real-time validation)
    if (studentInfoError[field]) {
      setStudentInfoError((prev) => ({
        ...prev,
        [field]: '',
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
      setSessionToken(response.session_token);
      setQuestions(response.questions);
      setShowStudentForm(false);
    } catch (err) {
      console.error('Error loading assessment:', err);
      setError('Failed to start assessment. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
    if (error) setError(null);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Last question - show review screen
      setShowReview(true);
    }
  };

  const handlePrevious = () => {
    if (showReview) {
      setShowReview(false);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleEditQuestion = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
    setShowReview(false);
  };

  const handleSubmit = async () => {
    const unanswered = questions.filter((q) => !(q.id in answers));
    if (unanswered.length > 0) {
      setError(`Please answer all questions. ${unanswered.length} question(s) remaining.`);
      setShowReview(false);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const API_BASE = import.meta.env.VITE_API_URL || '/api';

      // Save all responses concurrently
      const responsePromises = Object.entries(answers).map(async ([questionId, optionId]) => {
        const response = await fetch(`${API_BASE}/assessments/${assessmentId}/responses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question_id: questionId,
            option_id: optionId,
            session_token: sessionToken,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to save question ${questionId}`);
        }
        return response.json();
      });

      await Promise.all(responsePromises);

      // Submit assessment to calculate results
      const results = await submitAssessment(assessmentId, sessionToken);

      // Clear saved progress on successful submission
      clearAssessmentProgress();

      // Navigate to results
      navigate(`/results/${assessmentId}`, { state: { results }, replace: true });
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setError(err.message || 'Failed to submit assessment. Please try again.');
      setSubmitting(false);
      setShowReview(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Computed values
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const isCurrentAnswered = currentQuestion && currentQuestion.id in answers;

  // Student information form
  if (showStudentForm) {
    return (
      <Box
        sx={{
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
            background: `radial-gradient(circle at 20% 30%, ${alpha('#2e7d32', 0.05)} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${alpha('#f57c00', 0.05)} 0%, transparent 50%)`,
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha('#2e7d32', 0.08)} 0%, ${alpha('#f57c00', 0.06)} 100%)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha('#2e7d32', 0.1)}`,
              boxShadow: `0 8px 32px ${alpha('#2e7d32', 0.15)}`,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              fontWeight={800}
              sx={{
                background: 'linear-gradient(135deg, #2e7d32 0%, #f57c00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
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
          <Card
            sx={{
              borderRadius: 4,
              background: alpha('#fff', 0.8),
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha('#2e7d32', 0.1)}`,
              boxShadow: `0 8px 32px ${alpha('#000', 0.08)}`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleStartAssessment();
                }}
              >
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
                    startAdornment: <BadgeIcon sx={{ color: '#2e7d32', mr: 1 }} />,
                  }}
                  sx={{ mb: 3 }}
                />

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
                    startAdornment: <PersonIcon sx={{ color: '#2e7d32', mr: 1 }} />,
                  }}
                  sx={{ mb: 3 }}
                />

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
                    startAdornment: <EmailIcon sx={{ color: '#2e7d32', mr: 1 }} />,
                  }}
                  sx={{ mb: 4 }}
                />

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
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 24px ${alpha('#2e7d32', 0.4)}`,
                    },
                  }}
                >
                  {loading ? 'Loading...' : 'Start Assessment'}
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Alert severity="info" sx={{ mt: 3 }}>
            Your information will be used for analysis purposes and to send you your results.
          </Alert>
        </Container>

        {/* Resume Progress Dialog */}
        <Dialog open={showResumeDialog} onClose={() => setShowResumeDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>Continue Where You Left Off?</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              We found a saved assessment from {formatSavedProgressTime()}. Would you like to continue or start fresh?
            </Typography>
            {savedProgress && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha('#2e7d32', 0.08),
                  border: `1px solid ${alpha('#2e7d32', 0.2)}`,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {savedProgress.studentInfo?.student_name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Progress: {Object.keys(savedProgress.answers || {}).length} of {savedProgress.questions?.length || 0}{' '}
                  questions answered
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={handleStartFresh} sx={{ textTransform: 'none' }}>
              Start Fresh
            </Button>
            <Button
              onClick={handleResumeProgress}
              variant="contained"
              startIcon={<Restore />}
              sx={{ textTransform: 'none' }}
            >
              Resume Assessment
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  // Show loading animation during submission
  if (submitting) {
    return <AssessmentLoadingAnimation message="Analyzing your profile..." />;
  }

  // Show review screen
  if (showReview) {
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <AssessmentReview
            questions={questions}
            answers={answers}
            onEditQuestion={handleEditQuestion}
            onSubmit={handleSubmit}
            onBack={handlePrevious}
            studentInfo={studentInfo}
          />
        </Container>
      </Box>
    );
  }

  // Main assessment wizard
  return (
    <Box
      sx={{
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
          background: `radial-gradient(circle at 20% 30%, ${alpha('#2e7d32', 0.05)} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${alpha('#f57c00', 0.05)} 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha('#2e7d32', 0.08)} 0%, ${alpha('#f57c00', 0.06)} 100%)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha('#2e7d32', 0.1)}`,
            boxShadow: `0 8px 32px ${alpha('#2e7d32', 0.15)}`,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            fontWeight={800}
            sx={{
              background: 'linear-gradient(135deg, #2e7d32 0%, #f57c00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Department Recommendation Assessment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Answer all questions to receive personalized department recommendations
          </Typography>
        </Paper>

        {/* Progress Bar */}
        <AssessmentProgressBar
          currentStep={currentQuestionIndex + 1}
          totalSteps={questions.length}
          currentStepLabel={currentQuestion?.category}
        />

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Question Card */}
        <Box ref={questionRef}>
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              selectedOption={answers[currentQuestion.id]}
              onSelectOption={handleAnswerChange}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              showTooltip={currentQuestion.tooltip !== undefined}
              tooltip={currentQuestion.tooltip}
            />
          )}
        </Box>

        {/* Navigation Buttons */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 4, mb: 2 }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            sx={{
              borderWidth: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNext}
            disabled={!isCurrentAnswered}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 700,
              textTransform: 'none',
              background: `linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, #1b5e20 0%, #0d4717 100%)`,
              },
            }}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Review Answers' : 'Next'}
          </Button>
        </Stack>

        {/* Progress Summary */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: 'text.secondary',
            mt: 2,
          }}
        >
          {answeredCount} of {questions.length} questions answered • Progress is automatically saved
        </Typography>
      </Container>

      {/* Auto-save notification */}
      <Snackbar
        open={showSaveNotification}
        autoHideDuration={2000}
        onClose={() => setShowSaveNotification(false)}
        message="Progress saved ✓"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

export default AssessmentNew;

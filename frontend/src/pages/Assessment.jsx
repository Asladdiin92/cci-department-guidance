import { useState, useEffect } from 'react';
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
  alpha
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Assessment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    loadAssessment();
  }, []);

  const loadAssessment = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await startAssessment();
      setAssessmentId(response.assessment_id);
      setQuestions(response.questions);
    } catch (err) {
      console.error('Error loading assessment:', err);
      setError('Failed to load assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
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

  const handleSubmit = async () => {
    // Validate all questions answered
    const unanswered = questions.filter(q => !(q.id in answers));
    if (unanswered.length > 0) {
      setError(`Please answer all questions. ${unanswered.length} question(s) remaining.`);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      console.log('Submitting assessment:', assessmentId);
      console.log('Total answers:', Object.keys(answers).length);
      
      // Save all responses using the API service
      const API_BASE = import.meta.env.VITE_API_URL || 'https://cci-department-guidance-production.up.railway.app/api';
      
      let savedCount = 0;
      let failedCount = 0;
      
      // Save each response with better error handling
      for (const [questionId, optionId] of Object.entries(answers)) {
        try {
          console.log(`Saving response: Question ${questionId} -> Option ${optionId}`);
          
          const response = await fetch(`${API_BASE}/assessments/${assessmentId}/responses`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ 
              question_id: questionId, 
              option_id: optionId 
            })
          });
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Response save failed:', errorData);
            failedCount++;
          } else {
            const data = await response.json();
            console.log('Response saved successfully:', data);
            savedCount++;
          }
        } catch (err) {
          console.error('Error saving response:', err);
          failedCount++;
        }
      }
      
      console.log(`Saved ${savedCount} responses, ${failedCount} failed`);
      
      // If all responses failed, show error
      if (savedCount === 0) {
        throw new Error('Failed to save any responses. Please check your connection and try again.');
      }
      
      // Small delay to ensure all responses are committed
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Submit the assessment
      console.log('Submitting assessment to calculate results...');
      const results = await submitAssessment(assessmentId);
      console.log('Assessment submitted successfully:', results);
      
      // Navigate to results page
      navigate(`/results/${assessmentId}`, { 
        state: { results },
        replace: true 
      });
      
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setError(
        err.message || 'Failed to submit assessment. Please try again or contact support if the issue persists.'
      );
      setSubmitting(false);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const isCurrentAnswered = currentQuestion && (currentQuestion.id in answers);
  const allAnswered = answeredCount === questions.length;

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Loading Assessment...
        </Typography>
      </Container>
    );
  }

  if (error && !questions.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={loadAssessment}>
          Retry
        </Button>
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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 30%, ${alpha('#2e7d32', 0.05)} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${alpha('#f57c00', 0.05)} 0%, transparent 50%)`,
        pointerEvents: 'none'
      }
    }}>
    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
      {/* Header - Glassmorphism */}
      <Paper elevation={0} sx={{ 
        mb: 4, 
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha('#2e7d32', 0.08)} 0%, ${alpha('#f57c00', 0.06)} 100%)`,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha('#2e7d32', 0.1)}`,
        boxShadow: `0 8px 32px ${alpha('#2e7d32', 0.15)}`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '"HU"',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: { xs: '100px', md: '140px' },
          fontWeight: 900,
          color: alpha('#2e7d32', 0.03),
          zIndex: 0,
          userSelect: 'none',
          pointerEvents: 'none'
        }
      }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" gutterBottom fontWeight={800} sx={{
            background: 'linear-gradient(135deg, #2e7d32 0%, #f57c00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Department Recommendation Assessment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Answer all questions to receive personalized department recommendations based on your interests and strengths.
          </Typography>
        </Box>
      </Paper>

      {/* Progress Bar - Glassmorphism */}
      <Paper elevation={0} sx={{ 
        mb: 4, 
        p: 3,
        borderRadius: 3,
        background: alpha('#fff', 0.6),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha('#2e7d32', 0.1)}`,
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
          variant="determinate" 
          value={progress} 
          sx={{ 
            height: 10, 
            borderRadius: 4,
            bgcolor: alpha('#2e7d32', 0.1),
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #2e7d32 0%, #f57c00 100%)',
              borderRadius: 4,
              boxShadow: `0 2px 8px ${alpha('#2e7d32', 0.3)}`
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

      {/* Question Card - Glassmorphism */}
      {currentQuestion && (
        <Paper elevation={0} sx={{ 
          p: 4, 
          mb: 3,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${alpha('#fff', 0.8)} 0%, ${alpha('#fff', 0.6)} 100%)`,
          backdropFilter: 'blur(20px)',
          border: `2px solid ${alpha('#2e7d32', isCurrentAnswered ? 0.3 : 0.1)}`,
          boxShadow: `0 8px 32px ${alpha('#000', 0.08)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            border: `2px solid ${alpha('#2e7d32', 0.3)}`,
            boxShadow: `0 12px 48px ${alpha('#2e7d32', 0.15)}`
          }
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            mb: 3,
            fontWeight: 700,
            color: '#2e7d32'
          }}>
            {currentQuestion.text}
          </Typography>

          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
          >
            {currentQuestion.question_options?.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={<Radio sx={{ 
                  color: '#2e7d32',
                  '&.Mui-checked': { color: '#2e7d32' }
                }} />}
                label={option.text}
                sx={{ 
                  mb: 1.5, 
                  alignItems: 'flex-start',
                  p: 1.5,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: alpha('#2e7d32', 0.05)
                  }
                }}
              />
            ))}
          </RadioGroup>

          {isCurrentAnswered && (
            <Box sx={{ 
              mt: 3, 
              p: 2,
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: alpha('#2e7d32', 0.1),
              borderRadius: 2,
              border: `1px solid ${alpha('#2e7d32', 0.2)}`
            }}>
              <CheckCircleIcon sx={{ mr: 1.5, fontSize: 24, color: '#2e7d32' }} />
              <Typography variant="body2" fontWeight={600} sx={{ color: '#2e7d32' }}>
                Answer saved successfully
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* Navigation Buttons - Haramaya styled */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          sx={{
            borderColor: '#2e7d32',
            color: '#2e7d32',
            borderWidth: 2,
            px: 3,
            py: 1.5,
            fontWeight: 700,
            '&:hover': {
              borderWidth: 2,
              bgcolor: alpha('#2e7d32', 0.08)
            },
            '&.Mui-disabled': {
              borderWidth: 2
            }
          }}
        >
          Previous
        </Button>

        {currentQuestionIndex < questions.length - 1 ? (
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNext}
            sx={{
              bgcolor: '#2e7d32',
              color: 'white',
              px: 4,
              py: 1.5,
              fontWeight: 700,
              boxShadow: `0 4px 16px ${alpha('#2e7d32', 0.3)}`,
              '&:hover': {
                bgcolor: '#1b5e20',
                boxShadow: `0 6px 24px ${alpha('#2e7d32', 0.4)}`
              }
            }}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
            sx={{ 
              minWidth: 180,
              bgcolor: '#f57c00',
              color: 'white',
              px: 4,
              py: 1.5,
              fontWeight: 700,
              boxShadow: `0 4px 16px ${alpha('#f57c00', 0.3)}`,
              '&:hover': {
                bgcolor: '#e65100',
                boxShadow: `0 6px 24px ${alpha('#f57c00', 0.4)}`
              },
              '&.Mui-disabled': {
                bgcolor: alpha('#f57c00', 0.4),
                color: 'white'
              }
            }}
          >
            {submitting ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                Submitting...
              </>
            ) : (
              'Submit Assessment'
            )}
          </Button>
        )}
      </Box>

      {/* Summary at bottom - Glassmorphism */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha('#f57c00', 0.08)} 0%, ${alpha('#2e7d32', 0.06)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha('#f57c00', 0.2)}`,
        boxShadow: `0 4px 16px ${alpha('#f57c00', 0.1)}`
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

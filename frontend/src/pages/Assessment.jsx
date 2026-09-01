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
  CircularProgress
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

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
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
      const response = await submitAssessment(assessmentId, answers);
      // Navigate to results page with assessment ID
      navigate(`/results/${assessmentId}`, { state: { results: response } });
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setError('Failed to submit assessment. Please try again.');
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Department Recommendation Assessment
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Answer all questions to receive personalized department recommendations based on your interests and strengths.
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="body2" color="primary" fontWeight="medium">
            {answeredCount}/{questions.length} answered
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Question Card */}
      {currentQuestion && (
        <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            {currentQuestion.question_text}
          </Typography>

          <RadioGroup
            value={answers[currentQuestion.id]?.toString() || ''}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
          >
            <FormControlLabel
              value="5"
              control={<Radio />}
              label="Strongly Agree"
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="Agree"
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Neutral"
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Disagree"
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Strongly Disagree"
            />
          </RadioGroup>

          {isCurrentAnswered && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', color: 'success.main' }}>
              <CheckCircleIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                Answer saved
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        {currentQuestionIndex < questions.length - 1 ? (
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNext}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
            sx={{ minWidth: 150 }}
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

      {/* Summary at bottom */}
      <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary">
          💡 Tip: You can navigate back to review and change your answers before submitting.
        </Typography>
      </Box>
    </Container>
  );
}

export default Assessment;

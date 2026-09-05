/**
 * Assessment Review/Summary Screen
 * Allows users to review and change answers before submission
 */

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Chip,
  Divider,
  Grid,
  alpha,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  Edit,
  Send,
  Warning,
} from '@mui/icons-material';

const AssessmentReview = ({
  questions,
  answers,
  onEditQuestion,
  onSubmit,
  onBack,
  studentInfo,
}) => {
  const theme = useTheme();

  // Calculate answered questions
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const allAnswered = answeredCount === totalQuestions;
  const unansweredQuestions = questions.filter((q) => !(q.id in answers));

  // Get option text for an answer
  const getAnswerText = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return 'N/A';
    
    const optionId = answers[questionId];
    const option = question.options.find((opt) => opt.id === optionId);
    return option ? option.option_text : 'Not answered';
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* Header */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.06)} 100%)`,
          border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: theme.palette.primary.main,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 900,
              }}
            >
              {answeredCount}/{totalQuestions}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                Review Your Answers
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check your responses before submitting the assessment
              </Typography>
            </Box>
          </Stack>

          {/* Student Info Summary */}
          {studentInfo && (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{
                mt: 3,
                pt: 3,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              }}
            >
              <Chip
                label={`ID: ${studentInfo.student_id}`}
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label={studentInfo.student_name}
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label={studentInfo.student_email}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Stack>
          )}
        </CardContent>
      </Card>

      {/* Completion Status */}
      {!allAnswered && (
        <Card
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 3,
            bgcolor: alpha(theme.palette.warning.main, 0.1),
            border: `2px solid ${alpha(theme.palette.warning.main, 0.3)}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Warning sx={{ color: 'warning.main', fontSize: 32 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.main' }}>
                  {unansweredQuestions.length} Question(s) Unanswered
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please answer all questions before submitting
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Questions Review */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 4,
          border: `2px solid ${alpha(theme.palette.divider, 0.3)}`,
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 3, px: { xs: 1, md: 0 } }}
          >
            Your Responses
          </Typography>

          <Stack spacing={1}>
            {questions.map((question, index) => {
              const isAnswered = question.id in answers;
              const answerText = getAnswerText(question.id);

              return (
                <Accordion
                  key={question.id}
                  elevation={0}
                  disableGutters
                  sx={{
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    borderRadius: '12px !important',
                    mb: 1,
                    '&:before': { display: 'none' },
                    bgcolor: isAnswered
                      ? alpha(theme.palette.success.main, 0.04)
                      : alpha(theme.palette.warning.main, 0.04),
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{
                      px: 2,
                      py: 1,
                      '& .MuiAccordionSummary-content': {
                        my: 1,
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      sx={{ width: '100%', pr: 2 }}
                    >
                      {/* Question Number */}
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          bgcolor: isAnswered
                            ? theme.palette.success.main
                            : alpha(theme.palette.text.secondary, 0.2),
                          color: isAnswered ? 'white' : 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          flexShrink: 0,
                        }}
                      >
                        {isAnswered ? (
                          <CheckCircle sx={{ fontSize: 20 }} />
                        ) : (
                          index + 1
                        )}
                      </Box>

                      {/* Question Text */}
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          flex: 1,
                          color: 'text.primary',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {question.question_text}
                      </Typography>

                      {/* Status Chip */}
                      <Chip
                        label={isAnswered ? 'Answered' : 'Pending'}
                        size="small"
                        color={isAnswered ? 'success' : 'warning'}
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          display: { xs: 'none', sm: 'inline-flex' },
                        }}
                      />
                    </Stack>
                  </AccordionSummary>

                  <AccordionDetails sx={{ px: 2, pb: 2, pt: 1 }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.background.default, 0.5),
                        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: 'text.secondary',
                          mb: 1,
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                        }}
                      >
                        Your Answer:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: isAnswered ? 'text.primary' : 'text.secondary',
                          fontStyle: isAnswered ? 'normal' : 'italic',
                          mb: 2,
                        }}
                      >
                        {answerText}
                      </Typography>

                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => onEditQuestion(index)}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        Edit Answer
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Stack>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Button
          variant="outlined"
          size="large"
          onClick={onBack}
          sx={{
            py: 1.5,
            flex: 1,
            textTransform: 'none',
            fontWeight: 600,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            },
          }}
        >
          Go Back
        </Button>

        <Button
          variant="contained"
          size="large"
          endIcon={<Send />}
          onClick={onSubmit}
          disabled={!allAnswered}
          sx={{
            py: 1.5,
            flex: 2,
            textTransform: 'none',
            fontWeight: 700,
            background: allAnswered
              ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
              : undefined,
            '&:disabled': {
              bgcolor: alpha(theme.palette.text.secondary, 0.12),
            },
          }}
        >
          {allAnswered ? 'Submit Assessment' : 'Complete All Questions First'}
        </Button>
      </Stack>

      {/* Disclaimer */}
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          textAlign: 'center',
          color: 'text.secondary',
          fontStyle: 'italic',
          px: 2,
        }}
      >
        💡 Tip: Review your answers carefully. You can edit any response before submitting.
      </Typography>
    </Box>
  );
};

export default AssessmentReview;

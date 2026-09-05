/**
 * Card-based Question Component
 * Large clickable option areas with micro-interactions and accessibility
 */

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  alpha,
  useTheme,
  Tooltip,
  IconButton,
  Fade,
  Zoom,
} from '@mui/material';
import {
  InfoOutlined,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material';

const QuestionCard = ({
  question,
  selectedOption,
  onSelectOption,
  questionNumber,
  totalQuestions,
  tooltip,
  showTooltip = false,
}) => {
  const theme = useTheme();
  const [hoveredOption, setHoveredOption] = useState(null);

  if (!question) return null;

  const handleOptionClick = (optionId) => {
    onSelectOption(question.id, optionId);
  };

  return (
    <Fade in timeout={400}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          bgcolor: 'background.paper',
          border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
          overflow: 'visible',
          transition: 'all 0.3s ease',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {/* Question Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ mb: 3 }}
          >
            <Box sx={{ flex: 1 }}>
              {/* Question Number Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  mb: 2,
                }}
              >
                Question {questionNumber} / {totalQuestions}
              </Box>

              {/* Question Text */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  lineHeight: 1.4,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  pr: showTooltip ? 2 : 0,
                }}
              >
                {question.question_text}
              </Typography>
            </Box>

            {/* Tooltip Icon */}
            {showTooltip && tooltip && (
              <Tooltip
                title={tooltip}
                arrow
                placement="left"
                TransitionComponent={Zoom}
                enterDelay={200}
                sx={{
                  '& .MuiTooltip-tooltip': {
                    fontSize: '0.875rem',
                    maxWidth: 300,
                    p: 2,
                  },
                }}
              >
                <IconButton
                  size="small"
                  sx={{
                    color: 'info.main',
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.info.main, 0.2),
                    },
                  }}
                >
                  <InfoOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>

          {/* Options */}
          <Stack spacing={2}>
            {question.options.map((option, index) => {
              const isSelected = selectedOption === option.id;
              const isHovered = hoveredOption === option.id;

              return (
                <Box
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  onMouseEnter={() => setHoveredOption(option.id)}
                  onMouseLeave={() => setHoveredOption(null)}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOptionClick(option.id);
                    }
                  }}
                  sx={{
                    position: 'relative',
                    p: { xs: 2, md: 2.5 },
                    borderRadius: 3,
                    border: `3px solid`,
                    borderColor: isSelected
                      ? theme.palette.primary.main
                      : isHovered
                      ? alpha(theme.palette.primary.main, 0.4)
                      : alpha(theme.palette.text.secondary, 0.15),
                    bgcolor: isSelected
                      ? alpha(theme.palette.primary.main, 0.08)
                      : isHovered
                      ? alpha(theme.palette.primary.main, 0.04)
                      : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isSelected
                      ? 'scale(1.02)'
                      : isHovered
                      ? 'scale(1.01)'
                      : 'scale(1)',
                    boxShadow: isSelected
                      ? `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`
                      : isHovered
                      ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`
                      : 'none',
                    userSelect: 'none',
                    '&:focus-visible': {
                      outline: `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {/* Option Number/Icon */}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: isSelected
                          ? theme.palette.primary.main
                          : alpha(theme.palette.text.secondary, 0.08),
                        color: isSelected ? 'white' : 'text.secondary',
                        fontWeight: 700,
                        fontSize: '1.125rem',
                        flexShrink: 0,
                        transition: 'all 0.25s ease',
                        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      {isSelected ? (
                        <CheckCircle sx={{ fontSize: 28 }} />
                      ) : (
                        String.fromCharCode(65 + index) // A, B, C, D...
                      )}
                    </Box>

                    {/* Option Text */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: isSelected ? 600 : 500,
                        color: isSelected ? 'primary.main' : 'text.primary',
                        fontSize: { xs: '0.95rem', md: '1.05rem' },
                        lineHeight: 1.6,
                        flex: 1,
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {option.option_text}
                    </Typography>

                    {/* Selection Indicator */}
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        border: `2px solid`,
                        borderColor: isSelected
                          ? theme.palette.primary.main
                          : alpha(theme.palette.text.secondary, 0.3),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {isSelected && (
                        <Box
                          sx={{
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            bgcolor: theme.palette.primary.main,
                            animation: 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '@keyframes scaleIn': {
                              '0%': {
                                transform: 'scale(0)',
                                opacity: 0,
                              },
                              '100%': {
                                transform: 'scale(1)',
                                opacity: 1,
                              },
                            },
                          }}
                        />
                      )}
                    </Box>
                  </Stack>

                  {/* Ripple Effect on Selection */}
                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 3,
                        pointerEvents: 'none',
                        animation: 'ripple 0.6s ease-out',
                        '@keyframes ripple': {
                          '0%': {
                            boxShadow: `0 0 0 0 ${alpha(theme.palette.primary.main, 0.4)}`,
                          },
                          '100%': {
                            boxShadow: `0 0 0 20px ${alpha(theme.palette.primary.main, 0)}`,
                          },
                        },
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Stack>

          {/* Helper Text */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 3,
              color: 'text.secondary',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            {selectedOption
              ? '✓ Answer saved'
              : 'Select an option to continue'}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default QuestionCard;

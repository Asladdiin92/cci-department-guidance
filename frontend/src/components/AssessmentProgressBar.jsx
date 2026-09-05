/**
 * Assessment Progress Bar with Step Labels
 * Shows visual progress through assessment stages: Interests → Skills → Values
 */

import React from 'react';
import {
  Box,
  LinearProgress,
  Typography,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import {
  FavoriteBorder,
  Build,
  EmojiObjects,
  CheckCircle,
} from '@mui/icons-material';

const AssessmentProgressBar = ({ 
  currentStep, 
  totalSteps, 
  currentStepLabel = '',
  showStepLabels = true 
}) => {
  const theme = useTheme();
  const progress = (currentStep / totalSteps) * 100;

  // Define assessment stages (customize based on your question structure)
  const stages = [
    { label: 'Interests', icon: <FavoriteBorder />, range: [1, 7] },
    { label: 'Skills', icon: <Build />, range: [8, 14] },
    { label: 'Values', icon: <EmojiObjects />, range: [15, 20] },
  ];

  // Determine current stage
  const getCurrentStage = () => {
    for (let i = 0; i < stages.length; i++) {
      if (currentStep >= stages[i].range[0] && currentStep <= stages[i].range[1]) {
        return i;
      }
    }
    return stages.length; // Completed
  };

  const currentStageIndex = getCurrentStage();

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      {/* Step Labels */}
      {showStepLabels && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          {stages.map((stage, index) => {
            const isActive = index === currentStageIndex;
            const isCompleted = index < currentStageIndex;

            return (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  '&:not(:last-child)::after': {
                    content: '""',
                    position: 'absolute',
                    top: 16,
                    left: '50%',
                    width: '100%',
                    height: 3,
                    bgcolor: isCompleted
                      ? theme.palette.primary.main
                      : alpha(theme.palette.text.secondary, 0.2),
                    transition: 'all 0.4s ease',
                    zIndex: 0,
                  },
                }}
              >
                {/* Stage Icon */}
                <Box
                  sx={{
                    width: { xs: 36, md: 48 },
                    height: { xs: 36, md: 48 },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: isCompleted
                      ? theme.palette.success.main
                      : isActive
                      ? theme.palette.primary.main
                      : alpha(theme.palette.text.secondary, 0.1),
                    color: isCompleted || isActive ? 'white' : 'text.secondary',
                    mb: 1,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                    boxShadow: isActive
                      ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`
                      : isCompleted
                      ? `0 2px 8px ${alpha(theme.palette.success.main, 0.3)}`
                      : 'none',
                    position: 'relative',
                    zIndex: 1,
                    '& .MuiSvgIcon-root': {
                      fontSize: { xs: 18, md: 24 },
                    },
                  }}
                >
                  {isCompleted ? <CheckCircle /> : stage.icon}
                </Box>

                {/* Stage Label */}
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: isActive ? 700 : isCompleted ? 600 : 500,
                    color: isActive
                      ? 'primary.main'
                      : isCompleted
                      ? 'success.main'
                      : 'text.secondary',
                    fontSize: { xs: '0.7rem', md: '0.8rem' },
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {stage.label}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      )}

      {/* Progress Bar */}
      <Box sx={{ position: 'relative' }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 12,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '& .MuiLinearProgress-bar': {
              borderRadius: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            },
          }}
        />

        {/* Progress Percentage Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            left: `${Math.min(progress, 95)}%`,
            transform: 'translateX(-50%)',
            bgcolor: 'primary.main',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontSize: '0.75rem',
            fontWeight: 700,
            boxShadow: theme.shadows[4],
            transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            whiteSpace: 'nowrap',
            zIndex: 2,
          }}
        >
          {Math.round(progress)}%
        </Box>
      </Box>

      {/* Question Counter */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: '0.875rem',
          }}
        >
          Question {currentStep} of {totalSteps}
        </Typography>

        {currentStepLabel && (
          <Typography
            variant="body2"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            {currentStepLabel}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default AssessmentProgressBar;

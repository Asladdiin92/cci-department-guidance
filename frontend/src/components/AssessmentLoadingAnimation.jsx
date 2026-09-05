/**
 * Engaging Loading Animation for Assessment Result Calculation
 * Shows analyzing progress with animated elements
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  alpha,
  useTheme,
  Fade,
} from '@mui/material';
import {
  Psychology,
  School,
  TrendingUp,
  CheckCircle,
  AutoAwesome,
} from '@mui/icons-material';

const AssessmentLoadingAnimation = ({ message = 'Analyzing your profile...' }) => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Processing your answers', icon: <Psychology />, duration: 1500 },
    { label: 'Analyzing your interests', icon: <School />, duration: 1800 },
    { label: 'Matching with departments', icon: <TrendingUp />, duration: 2000 },
    { label: 'Calculating compatibility', icon: <AutoAwesome />, duration: 1700 },
    { label: 'Finalizing results', icon: <CheckCircle />, duration: 1000 },
  ];

  useEffect(() => {
    // Simulate step progression
    const stepDuration = 1500;
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    return () => clearInterval(stepTimer);
  }, []);

  useEffect(() => {
    // Smooth progress animation
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 10;
      });
    }, 300);

    return () => clearInterval(progressTimer);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        p: 4,
      }}
    >
      {/* Main Animation Container */}
      <Box
        sx={{
          position: 'relative',
          width: 200,
          height: 200,
          mb: 4,
        }}
      >
        {/* Rotating Outer Ring */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderTopColor: theme.palette.primary.main,
            animation: 'rotate 1.5s linear infinite',
            '@keyframes rotate': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />

        {/* Pulsing Inner Circle */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1,
              },
              '50%': {
                transform: 'translate(-50%, -50%) scale(1.1)',
                opacity: 0.8,
              },
            },
          }}
        >
          {/* Current Step Icon */}
          <Box
            sx={{
              fontSize: 48,
              color: 'primary.main',
              display: 'flex',
              animation: 'fadeInScale 0.5s ease-out',
              '@keyframes fadeInScale': {
                '0%': {
                  opacity: 0,
                  transform: 'scale(0.5)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'scale(1)',
                },
              },
            }}
          >
            {steps[currentStep]?.icon}
          </Box>
        </Box>

        {/* Orbiting Dots */}
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: theme.palette.secondary.main,
              transformOrigin: '0 0',
              animation: `orbit 3s linear infinite`,
              animationDelay: `${i * -1}s`,
              '@keyframes orbit': {
                '0%': {
                  transform: `translate(-50%, -50%) rotate(0deg) translateX(100px)`,
                },
                '100%': {
                  transform: `translate(-50%, -50%) rotate(360deg) translateX(100px)`,
                },
              },
            }}
          />
        ))}
      </Box>

      {/* Message */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          mb: 2,
          textAlign: 'center',
        }}
      >
        {message}
      </Typography>

      {/* Current Step Label */}
      <Fade in key={currentStep}>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 4,
            textAlign: 'center',
            minHeight: 28,
          }}
        >
          {steps[currentStep]?.label}
        </Typography>
      </Fade>

      {/* Progress Bar */}
      <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
        <LinearProgress
          variant="determinate"
          value={Math.min(progress, 100)}
          sx={{
            height: 8,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '& .MuiLinearProgress-bar': {
              borderRadius: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 1,
            color: 'text.secondary',
            fontWeight: 600,
          }}
        >
          {Math.round(progress)}%
        </Typography>
      </Box>

      {/* Step Indicators */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              width: index === currentStep ? 32 : 8,
              height: 8,
              borderRadius: 1,
              bgcolor:
                index <= currentStep
                  ? theme.palette.primary.main
                  : alpha(theme.palette.text.secondary, 0.2),
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Stack>

      {/* Fun Messages */}
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
          fontStyle: 'italic',
          animation: 'fadeInOut 3s ease-in-out infinite',
          '@keyframes fadeInOut': {
            '0%, 100%': { opacity: 0.6 },
            '50%': { opacity: 1 },
          },
        }}
      >
        🎓 Finding your perfect match...
      </Typography>
    </Box>
  );
};

export default AssessmentLoadingAnimation;

/**
 * Department Result Card Component
 * Enhanced card showing Match %, Key Skills, and View Details button
 * Professional design with clear hierarchy
 */

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Box,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
} from '@mui/material';
import {
  EmojiEvents,
  TrendingUp,
  School,
  Work,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DepartmentResultCard = ({ recommendation, rank = 0 }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isTopMatch = rank === 1;
  const matchPercentage = recommendation.match_percentage || 0;
  const departmentName = recommendation.department_name || 'Unknown';
  const departmentCode = recommendation.department_code || '';
  const keySkills = recommendation.key_skills || [];
  const careerPaths = recommendation.career_paths || [];

  // Match level configuration
  const getMatchLevel = (percentage) => {
    if (percentage >= 80) return { label: 'Excellent Match', color: 'success' };
    if (percentage >= 60) return { label: 'Good Match', color: 'primary' };
    if (percentage >= 40) return { label: 'Fair Match', color: 'warning' };
    return { label: 'Consider', color: 'default' };
  };

  const matchLevel = getMatchLevel(matchPercentage);

  const handleViewDetails = () => {
    navigate(`/departments/${departmentCode}`);
  };

  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: isTopMatch
          ? `3px solid ${theme.palette.primary.main}`
          : `2px solid ${alpha(theme.palette.divider, 0.5)}`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[12],
          border: `3px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      {/* Top Badge */}
      {isTopMatch && (
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            right: 16,
            bgcolor: theme.palette.primary.main,
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            boxShadow: theme.shadows[4],
            fontWeight: 800,
            fontSize: '0.875rem',
          }}
        >
          <EmojiEvents sx={{ fontSize: 18 }} />
          Best Match
        </Box>
      )}

      {/* Rank Badge */}
      {!isTopMatch && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1rem',
          }}
        >
          #{rank}
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, pt: isTopMatch ? 4 : 2 }}>
        {/* Department Name */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            mb: 1,
            color: isTopMatch ? theme.palette.primary.main : 'text.primary',
            pl: isTopMatch ? 0 : 5,
          }}
        >
          {departmentName}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 2, pl: isTopMatch ? 0 : 5 }}
        >
          {departmentCode}
        </Typography>

        {/* Match Percentage */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              Match Score
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TrendingUp
                sx={{
                  fontSize: 18,
                  color: matchPercentage >= 60 ? 'success.main' : 'text.secondary',
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: isTopMatch ? theme.palette.primary.main : 'text.primary',
                }}
              >
                {matchPercentage}%
              </Typography>
            </Stack>
          </Stack>
          
          <LinearProgress
            variant="determinate"
            value={matchPercentage}
            sx={{
              height: 10,
              borderRadius: 1,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '& .MuiLinearProgress-bar': {
                borderRadius: 1,
                bgcolor: theme.palette.primary.main,
              },
            }}
          />
          
          <Box sx={{ mt: 1, textAlign: 'right' }}>
            <Chip
              label={matchLevel.label}
              color={matchLevel.color}
              size="small"
              sx={{ fontWeight: 700, fontSize: '0.75rem' }}
            />
          </Box>
        </Box>

        {/* Key Skills Required */}
        {keySkills.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <School sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Key Skills Required
              </Typography>
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {keySkills.slice(0, 4).map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  icon={<CheckCircle />}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    '& .MuiChip-icon': {
                      color: theme.palette.primary.main,
                      fontSize: 16,
                    },
                  }}
                />
              ))}
              {keySkills.length > 4 && (
                <Chip
                  label={`+${keySkills.length - 4} more`}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.grey[500], 0.1),
                    fontWeight: 600,
                  }}
                />
              )}
            </Stack>
          </Box>
        )}

        {/* Career Paths Preview */}
        {careerPaths.length > 0 && (
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Work sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Career Paths
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              {careerPaths.slice(0, 2).join(', ')}
              {careerPaths.length > 2 && '...'}
            </Typography>
          </Box>
        )}
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant={isTopMatch ? 'contained' : 'outlined'}
          fullWidth
          endIcon={<ArrowForward />}
          onClick={handleViewDetails}
          sx={{
            py: 1.5,
            fontWeight: 700,
            fontSize: '1rem',
            textTransform: 'none',
            borderRadius: 2,
            ...(isTopMatch && {
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
              '&:hover': {
                boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.5)}`,
              },
            }),
          }}
        >
          View Full Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default DepartmentResultCard;

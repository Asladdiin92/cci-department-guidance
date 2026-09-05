/**
 * Material-UI Theme Configuration
 * Uses design tokens for consistency
 * Enables CSS variables for easy dark mode support
 */

import { createTheme } from '@mui/material/styles';
import tokens from './tokens';

const { colors, typography, spacing, borderRadius, shadows, transitions, components } = tokens;

const theme = createTheme({
  // Enable CSS variables for dark mode support
  cssVariables: true,

  // Color Palette
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    success: colors.success,
    grey: colors.grey,
    background: colors.background,
    text: colors.text,
    divider: colors.divider,
    common: colors.common,
  },

  // Typography
  typography: {
    fontFamily: typography.fontFamily.primary,
    fontSize: 16, // Base font size

    // Heading variants
    h1: typography.variants.h1,
    h2: typography.variants.h2,
    h3: typography.variants.h3,
    h4: typography.variants.h4,
    h5: typography.variants.h5,
    h6: typography.variants.h6,

    // Body variants
    body1: typography.variants.body1,
    body2: typography.variants.body2,
    subtitle1: typography.variants.subtitle1,
    subtitle2: typography.variants.subtitle2,

    // Other variants
    caption: typography.variants.caption,
    overline: typography.variants.overline,
    button: typography.variants.button,

    // Font weights
    fontWeightLight: typography.fontWeight.light,
    fontWeightRegular: typography.fontWeight.regular,
    fontWeightMedium: typography.fontWeight.medium,
    fontWeightBold: typography.fontWeight.bold,
  },

  // Spacing (8px base unit)
  spacing: 8,

  // Shape
  shape: {
    borderRadius: 8, // Default border radius
  },

  // Breakpoints
  breakpoints: {
    values: tokens.breakpoints.values,
  },

  // Shadows
  shadows: [
    'none',
    shadows.sm,
    shadows.base,
    shadows.md,
    shadows.md,
    shadows.md,
    shadows.lg,
    shadows.lg,
    shadows.lg,
    shadows.xl,
    shadows.xl,
    shadows.xl,
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
  ],

  // Transitions
  transitions: {
    duration: transitions.duration,
    easing: transitions.easing,
  },

  // Z-index
  zIndex: tokens.zIndex,

  // Component Overrides
  components: {
    // ============================================
    // BUTTON
    // ============================================
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: typography.fontWeight.semibold,
          borderRadius: borderRadius.button,
          transition: transitions.all,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: shadows.buttonHover,
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        sizeSmall: {
          padding: components.button.padding.small,
          minHeight: components.button.minHeight.small,
          fontSize: typography.fontSize.sm,
        },
        sizeMedium: {
          padding: components.button.padding.medium,
          minHeight: components.button.minHeight.medium,
          fontSize: typography.fontSize.base,
        },
        sizeLarge: {
          padding: components.button.padding.large,
          minHeight: components.button.minHeight.large,
          fontSize: typography.fontSize.lg,
        },
        contained: {
          boxShadow: shadows.button,
          '&:hover': {
            boxShadow: shadows.buttonHover,
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
      defaultProps: {
        disableElevation: false,
      },
    },

    // ============================================
    // CARD
    // ============================================
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.card,
          boxShadow: shadows.card,
          transition: transitions.all,
          '&:hover': {
            boxShadow: shadows.cardHover,
          },
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: components.card.padding.medium,
          '&:last-child': {
            paddingBottom: components.card.padding.medium,
          },
        },
      },
    },

    // ============================================
    // TEXT FIELD / INPUT
    // ============================================
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: borderRadius.input,
            transition: transitions.all,
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
              },
            },
          },
        },
      },
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.input,
          minHeight: components.input.minHeight,
          fontSize: components.input.fontSize,
          transition: transitions.all,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary.main,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary.main,
            borderWidth: '2px',
          },
        },
        input: {
          padding: components.input.padding,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.medium,
        },
      },
    },

    // ============================================
    // CHIP
    // ============================================
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.md,
          fontWeight: typography.fontWeight.medium,
          fontSize: typography.fontSize.sm,
          height: 'auto',
          padding: `${spacing[1]} ${spacing[2]}`,
        },
        outlined: {
          borderWidth: '2px',
        },
      },
    },

    // ============================================
    // ALERT
    // ============================================
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
          padding: spacing[2],
          fontSize: typography.fontSize.base,
        },
        standardSuccess: {
          backgroundColor: colors.success[50],
          color: colors.success[800],
        },
        standardError: {
          backgroundColor: colors.error[50],
          color: colors.error[800],
        },
        standardWarning: {
          backgroundColor: colors.warning[50],
          color: colors.warning[800],
        },
        standardInfo: {
          backgroundColor: colors.info[50],
          color: colors.info[800],
        },
      },
    },

    // ============================================
    // PAPER
    // ============================================
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: borderRadius.lg,
        },
        elevation1: {
          boxShadow: shadows.base,
        },
        elevation2: {
          boxShadow: shadows.md,
        },
        elevation3: {
          boxShadow: shadows.lg,
        },
        elevation4: {
          boxShadow: shadows.xl,
        },
      },
    },

    // ============================================
    // LINEAR PROGRESS
    // ============================================
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.full,
          height: 10,
        },
        bar: {
          borderRadius: borderRadius.full,
        },
      },
    },

    // ============================================
    // CIRCULAR PROGRESS
    // ============================================
    MuiCircularProgress: {
      defaultProps: {
        thickness: 4,
      },
    },

    // ============================================
    // DIALOG
    // ============================================
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius.xl,
        },
      },
    },

    // ============================================
    // TOOLTIP
    // ============================================
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.grey[900],
          fontSize: typography.fontSize.sm,
          borderRadius: borderRadius.md,
          padding: `${spacing[1]} ${spacing[2]}`,
        },
        arrow: {
          color: colors.grey[900],
        },
      },
    },

    // ============================================
    // TABS
    // ============================================
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 48,
        },
        indicator: {
          height: 3,
          borderRadius: borderRadius.full,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: typography.fontWeight.semibold,
          fontSize: typography.fontSize.base,
          minHeight: 48,
          transition: transitions.fast,
          '&:hover': {
            backgroundColor: colors.grey[100],
          },
        },
      },
    },

    // ============================================
    // DIVIDER
    // ============================================
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.divider,
        },
      },
    },

    // ============================================
    // LINK
    // ============================================
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          fontWeight: typography.fontWeight.medium,
          transition: transitions.fast,
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },

    // ============================================
    // SKELETON
    // ============================================
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.grey[200],
          borderRadius: borderRadius.md,
        },
        rectangular: {
          borderRadius: borderRadius.md,
        },
        rounded: {
          borderRadius: borderRadius.lg,
        },
      },
    },

    // ============================================
    // ACCORDION
    // ============================================
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
          '&:before': {
            display: 'none',
          },
          '&:first-of-type': {
            borderRadius: borderRadius.lg,
          },
          '&:last-of-type': {
            borderRadius: borderRadius.lg,
          },
        },
      },
    },
  },
});

export default theme;

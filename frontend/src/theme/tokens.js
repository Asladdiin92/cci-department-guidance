/**
 * Design Tokens - CCI Department Guidance System
 * Single source of truth for all design values
 * 
 * Usage: Import these tokens in theme.js and components
 * Never hardcode values - always reference tokens
 */

// ============================================
// COLOR PALETTE
// ============================================

export const colors = {
  // Primary - Trust Blue (Haramaya University brand color)
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2E7D32', // Haramaya Green (main)
    600: '#1B5E20',
    700: '#1565C0',
    800: '#0D47A1',
    900: '#0A3A82',
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },

  // Secondary - Growth Green
  secondary: {
    50: '#F1F8E9',
    100: '#DCEDC8',
    200: '#C5E1A5',
    300: '#AED581',
    400: '#9CCC65',
    500: '#8BC34A',
    600: '#7CB342',
    700: '#689F38',
    800: '#558B2F',
    900: '#33691E',
    main: '#F57C00', // Haramaya Gold
    light: '#FFB74D',
    dark: '#E65100',
    contrastText: '#FFFFFF',
  },

  // Accent - Action Orange
  accent: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800',
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',
    main: '#F57C00',
    light: '#FFB74D',
    dark: '#E65100',
    contrastText: '#FFFFFF',
  },

  // Semantic Colors
  success: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#FFFFFF',
  },

  warning: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#FFC107',
    600: '#FFB300',
    700: '#FFA000',
    800: '#FF8F00',
    900: '#FF6F00',
    main: '#FFC107',
    light: '#FFD54F',
    dark: '#FFA000',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },

  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336',
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
    contrastText: '#FFFFFF',
  },

  info: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
    main: '#1976D2',
    light: '#42A5F5',
    dark: '#1565C0',
    contrastText: '#FFFFFF',
  },

  // Neutral/Grey Scale
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#F5F5F5',
    A200: '#EEEEEE',
    A400: '#BDBDBD',
    A700: '#616161',
  },

  // Background Colors
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
    elevation1: '#FFFFFF',
    elevation2: '#F5F5F5',
  },

  // Text Colors
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.60)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },

  // Divider
  divider: 'rgba(0, 0, 0, 0.12)',

  // Common
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
};

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  // Font Families
  fontFamily: {
    primary: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    secondary: '"Plus Jakarta Sans", "Inter", sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },

  // Font Weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Font Sizes (rem based, 1rem = 16px)
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Typography Variants (Material-UI style)
  variants: {
    h1: {
      fontSize: '3rem',        // 48px
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2.25rem',     // 36px
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.875rem',    // 30px
      fontWeight: 700,
      lineHeight: 1.35,
      letterSpacing: '0',
    },
    h4: {
      fontSize: '1.5rem',      // 24px
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0',
    },
    h5: {
      fontSize: '1.25rem',     // 20px
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0',
    },
    h6: {
      fontSize: '1.125rem',    // 18px
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0',
    },
    body1: {
      fontSize: '1rem',        // 16px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0',
    },
    body2: {
      fontSize: '0.875rem',    // 14px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0',
    },
    subtitle1: {
      fontSize: '1rem',        // 16px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',    // 14px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    },
    caption: {
      fontSize: '0.75rem',     // 12px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.75rem',     // 12px
      fontWeight: 600,
      lineHeight: 2,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
    button: {
      fontSize: '0.875rem',    // 14px
      fontWeight: 600,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
    },
  },
};

// ============================================
// SPACING SYSTEM (8px grid)
// ============================================

export const spacing = {
  0: '0',
  1: '0.5rem',     // 8px
  2: '1rem',       // 16px
  3: '1.5rem',     // 24px
  4: '2rem',       // 32px
  5: '2.5rem',     // 40px
  6: '3rem',       // 48px
  7: '3.5rem',     // 56px
  8: '4rem',       // 64px
  10: '5rem',      // 80px
  12: '6rem',      // 96px
  16: '8rem',      // 128px
  20: '10rem',     // 160px
  24: '12rem',     // 192px
  
  // Semantic spacing
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  '2xl': '4rem',   // 64px
};

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px - inputs, small buttons
  md: '0.5rem',    // 8px - default buttons
  lg: '0.75rem',   // 12px - cards, containers
  xl: '1rem',      // 16px - large cards
  '2xl': '1.5rem', // 24px - hero sections
  '3xl': '2rem',   // 32px - special containers
  full: '9999px',  // Fully rounded - avatars, pills
  
  // Semantic radius
  input: '0.25rem',     // 4px
  button: '0.5rem',     // 8px
  card: '0.75rem',      // 12px
  container: '1rem',    // 16px
  avatar: '9999px',     // full
};

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Semantic shadows
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  cardHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  button: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  buttonHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

// ============================================
// BREAKPOINTS (Material-UI default)
// ============================================

export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
  
  // Helper for media queries
  up: (key) => `@media (min-width: ${breakpoints.values[key]}px)`,
  down: (key) => `@media (max-width: ${breakpoints.values[key] - 0.05}px)`,
  between: (start, end) => `@media (min-width: ${breakpoints.values[start]}px) and (max-width: ${breakpoints.values[end] - 0.05}px)`,
};

// ============================================
// Z-INDEX SCALE
// ============================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
};

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  
  // Pre-configured transitions
  all: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
};

// ============================================
// COMPONENTS CONFIG
// ============================================

export const components = {
  button: {
    padding: {
      small: `${spacing[1]} ${spacing[2]}`,      // 8px 16px
      medium: `${spacing[2]} ${spacing[3]}`,     // 16px 24px
      large: `${spacing[2]} ${spacing[4]}`,      // 16px 32px
    },
    borderRadius: borderRadius.button,
    minHeight: {
      small: '32px',
      medium: '44px',   // Accessible touch target
      large: '56px',
    },
  },
  
  input: {
    padding: `${spacing[2]} ${spacing[2]}`,      // 16px 16px
    borderRadius: borderRadius.input,
    minHeight: '44px',   // Accessible touch target
    fontSize: typography.fontSize.base,
  },
  
  card: {
    padding: {
      small: spacing[2],    // 16px
      medium: spacing[3],   // 24px
      large: spacing[4],    // 32px
    },
    borderRadius: borderRadius.card,
    shadow: shadows.card,
    shadowHover: shadows.cardHover,
  },
};

// ============================================
// EXPORT ALL TOKENS
// ============================================

const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
  transitions,
  components,
};

export default tokens;

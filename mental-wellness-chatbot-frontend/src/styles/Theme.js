// Theme.js
export const theme = {
  colors: {
    // Modern gradient-inspired colors
    primary: '#8A2BE2', // Vivid purple
    primaryGradient: 'linear-gradient(135deg, #8A2BE2 0%, #5D3FD3 100%)',
    primaryLight: '#B983FF',
    primaryDark: '#6A0DAD',
    
    secondary: '#00C9A7', // Turquoise
    secondaryGradient: 'linear-gradient(135deg, #00C9A7 0%, #00A3C4 100%)',
    secondaryLight: '#4ADEBB',
    secondaryDark: '#00A896',
    
    accent: '#FF6B6B', // Coral
    accentGradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    
    // Modern background with subtle gradient
    background: '#F4F7FD',
    backgroundGradient: 'linear-gradient(135deg, #F4F7FD 0%, #F0F4FA 100%)',
    foreground: '#FFFFFF',
    
    // Glass effect colors
    glass: 'rgba(255, 255, 255, 0.25)',
    glassBorder: 'rgba(255, 255, 255, 0.18)',
    glassShadow: 'rgba(31, 38, 135, 0.15)',
    
    // Text colors with better contrast
    text: '#1A1A2E',
    textLight: '#4A4A68',
    textMuted: '#8888A0',
    headings: '#0F0F1B',
    
    // Status colors with modern tones
    error: '#FF5A5F',
    success: '#00BFA6',
    warning: '#FFB400',
    info: '#2389FF',
    
    // Enhanced scrollbar
    scrollTrack: 'rgba(244, 247, 253, 0.8)',
    scrollThumb: 'rgba(138, 43, 226, 0.3)',
    scrollThumbHover: 'rgba(138, 43, 226, 0.5)',
    
    // Card and UI elements
    cardBackground: '#FFFFFF',
    cardBackgroundAlt: '#F9FAFF',
    cardBorder: 'rgba(231, 236, 247, 0.8)',
    cardShadow: 'rgba(31, 38, 135, 0.07)',
    divider: '#E7ECF7',
    disabled: '#E2E8F5',
    
    // Mood colors with nicer gradient potential
    mood: {
      veryBad: '#FF5A5F',
      bad: '#FF9466',
      neutral: '#FFCD69',
      good: '#4ADEBB',
      veryGood: '#2389FF',
    },
    
    // Dark theme glass effect
    darkGlass: 'rgba(16, 18, 27, 0.4)',
    darkGlassBorder: 'rgba(16, 18, 27, 0.2)',
  },
  
  // For dark mode
  darkColors: {
    primary: '#A16AE8',
    primaryGradient: 'linear-gradient(135deg, #A16AE8 0%, #7B61FF 100%)',
    primaryLight: '#C297FF',
    primaryDark: '#8657E1',
    
    secondary: '#30D9C8',
    secondaryGradient: 'linear-gradient(135deg, #30D9C8 0%, #2BBAD8 100%)',
    secondaryLight: '#60E6D9',
    secondaryDark: '#20B2A3',
    
    accent: '#FF7E87',
    accentGradient: 'linear-gradient(135deg, #FF7E87 0%, #FF9E6D 100%)',
    
    background: '#14142B',
    backgroundGradient: 'linear-gradient(135deg, #14142B 0%, #1E1E3F 100%)',
    foreground: '#1A1A2E',
    
    text: '#E9ECEF',
    textLight: '#B0B7C3',
    textMuted: '#8188A0',
    headings: '#FFFFFF',
    
    cardBackground: '#1E1E3F',
    cardBackgroundAlt: '#24243F',
    cardBorder: 'rgba(37, 37, 66, 0.8)',
    divider: '#2D2D52',
    disabled: '#3F3F68',
    
    scrollTrack: 'rgba(30, 30, 63, 0.8)',
    scrollThumb: 'rgba(161, 106, 232, 0.3)',
    scrollThumbHover: 'rgba(161, 106, 232, 0.5)',
  },
  
  borderRadius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1.25rem',
    xl: '2rem',
    full: '9999px',
  },
  
  boxShadow: {
    sm: '0 2px 8px rgba(31, 38, 135, 0.07)',
    md: '0 4px 20px rgba(31, 38, 135, 0.1)',
    lg: '0 8px 30px rgba(31, 38, 135, 0.12)',
    xl: '0 15px 50px rgba(31, 38, 135, 0.15)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    inner: 'inset 0 2px 4px 0 rgba(31, 38, 135, 0.06)',
    coloredSm: '0 2px 8px rgba(138, 43, 226, 0.25)',
    coloredMd: '0 4px 20px rgba(138, 43, 226, 0.3)',
  },
  
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    altFontFamily: "'Manrope', sans-serif", // Add a secondary font for variety
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '4rem',
    '5xl': '6rem',
  },
  
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },
  
  transitions: {
    quick: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    elegant: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    spring: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  
  container: {
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    '2xl': '1320px',
  },
  
  zIndex: {
    base: 1,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  
  // Animation durations
  animation: {
    fast: '0.3s',
    default: '0.5s',
    slow: '0.8s',
  },
  
  // Blur effects
  blur: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  }
};
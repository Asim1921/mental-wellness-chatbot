// Theme.js with enhanced vibrant colors and effects
export const theme = {
  colors: {
    // Core brand colors with more vibrant palette
    primary: '#9D4EDD', // Vibrant purple
    primaryGradient: 'linear-gradient(135deg, #9D4EDD 0%, #7B2CBF 100%)',
    primaryLight: '#C77DFF',
    primaryDark: '#5A189A',
    primaryNeon: '#C77DFF',
    
    secondary: '#00F5D4', // Vibrant turquoise
    secondaryGradient: 'linear-gradient(135deg, #00F5D4 0%, #00BBF9 100%)',
    secondaryLight: '#72EFDD',
    secondaryDark: '#0096C7',
    secondaryNeon: '#00F5D4',
    
    accent: '#FF5E78', // Vibrant coral
    accentGradient: 'linear-gradient(135deg, #FF5E78 0%, #FF9E64 100%)',
    accentNeon: '#FF5E78',
    
    // Modern background with enhanced gradient
    background: '#F0F4FF',
    backgroundGradient: 'linear-gradient(135deg, #F0F4FF 0%, #E6EFFF 100%)',
    foreground: '#FFFFFF',
    
    // Glass effect colors enhanced
    glass: 'rgba(255, 255, 255, 0.25)',
    glassDark: 'rgba(240, 244, 255, 0.15)',
    glassBorder: 'rgba(255, 255, 255, 0.2)',
    glassShadow: 'rgba(31, 38, 135, 0.15)',
    
    // Enhanced text colors
    text: '#151439',
    textLight: '#484774',
    textMuted: '#7B7BAF',
    headings: '#0F0F2D',
    
    // Status colors with neon tones
    error: '#FF427F',
    errorNeon: '#FF427F',
    success: '#00D68F',
    successNeon: '#00F5A0',
    warning: '#FFBE0B',
    warningNeon: '#FFD60A',
    info: '#3DBBFF',
    infoNeon: '#42C6FF',
    
    // Enhanced scrollbar
    scrollTrack: 'rgba(240, 244, 255, 0.8)',
    scrollThumb: 'rgba(157, 78, 221, 0.3)',
    scrollThumbHover: 'rgba(157, 78, 221, 0.6)',
    
    // Card and UI elements with enhanced aesthetics
    cardBackground: '#FFFFFF',
    cardBackgroundAlt: '#F8FAFF',
    cardBorder: 'rgba(231, 236, 247, 0.8)',
    cardGlow: '0 0 15px rgba(157, 78, 221, 0.15)',
    cardShadow: 'rgba(31, 38, 135, 0.07)',
    divider: '#E7ECF7',
    disabled: '#E2E8F5',
    
    // Dashboard color scheme
    dashboard: {
      background: 'linear-gradient(135deg, #F0F4FF 0%, #E6EFFF 100%)',
      cardBackground: 'rgba(255, 255, 255, 0.9)',
      accent1: '#9D4EDD',
      accent2: '#00F5D4',
      accent3: '#FF5E78',
      accent4: '#FFBE0B',
    },
    
    // Mood colors with neon gradient potential
    mood: {
      veryBad: '#FF427F',
      bad: '#FF7B54',
      neutral: '#FFBE0B',
      good: '#00D68F',
      veryGood: '#3DBBFF',
    },
    
    // Neon glow colors
    neon: {
      purple: '0 0 10px #C77DFF, 0 0 20px rgba(157, 78, 221, 0.5)',
      blue: '0 0 10px #42C6FF, 0 0 20px rgba(0, 187, 249, 0.5)',
      green: '0 0 10px #72EFDD, 0 0 20px rgba(0, 245, 212, 0.5)',
      pink: '0 0 10px #FF5E78, 0 0 20px rgba(255, 94, 120, 0.5)',
      yellow: '0 0 10px #FFE45E, 0 0 20px rgba(255, 190, 11, 0.5)',
    },
    
    // Dark theme with enhanced colors
    darkColors: {
      primary: '#B67AFF',
      primaryGradient: 'linear-gradient(135deg, #B67AFF 0%, #915EFF 100%)',
      primaryLight: '#D0A1FF',
      primaryDark: '#8A4FFF',
      primaryNeon: '#B67AFF',
      
      secondary: '#5EFFE9',
      secondaryGradient: 'linear-gradient(135deg, #5EFFE9 0%, #4BC0FF 100%)',
      secondaryLight: '#80FFF0',
      secondaryDark: '#33D6FF',
      
      accent: '#FF7A8F',
      accentGradient: 'linear-gradient(135deg, #FF7A8F 0%, #FFB47A 100%)',
      
      background: '#0A0A1F',
      backgroundGradient: 'linear-gradient(135deg, #0A0A1F 0%, #13133A 100%)',
      foreground: '#13133A',
      
      text: '#E9ECFF',
      textLight: '#B0B7FF',
      textMuted: '#8188D9',
      headings: '#FFFFFF',
      
      cardBackground: '#1C1C4D',
      cardBackgroundAlt: '#232363',
      cardBorder: 'rgba(37, 37, 66, 0.8)',
      cardGlow: '0 0 15px rgba(182, 122, 255, 0.2)',
      divider: '#2D2D75',
      disabled: '#3F3F8A',
      
      // Dark theme dashboard
      dashboard: {
        background: 'linear-gradient(135deg, #0A0A1F 0%, #13133A 100%)',
        cardBackground: 'rgba(28, 28, 77, 0.9)',
        accent1: '#B67AFF',
        accent2: '#5EFFE9',
        accent3: '#FF7A8F',
        accent4: '#FFBE0B',
      },
      
      scrollTrack: 'rgba(10, 10, 31, 0.8)',
      scrollThumb: 'rgba(182, 122, 255, 0.3)',
      scrollThumbHover: 'rgba(182, 122, 255, 0.6)',
    },
  },
  
  borderRadius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    pill: '50rem',
    full: '9999px',
  },
  
  boxShadow: {
    sm: '0 2px 10px rgba(31, 38, 135, 0.07)',
    md: '0 4px 20px rgba(31, 38, 135, 0.1)',
    lg: '0 8px 30px rgba(31, 38, 135, 0.12)',
    xl: '0 15px 50px rgba(31, 38, 135, 0.15)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    inner: 'inset 0 2px 4px 0 rgba(31, 38, 135, 0.06)',
    coloredSm: '0 2px 10px rgba(157, 78, 221, 0.25)',
    coloredMd: '0 4px 20px rgba(157, 78, 221, 0.3)',
    coloredLg: '0 8px 30px rgba(157, 78, 221, 0.35)',
    neon: '0 0 10px rgba(157, 78, 221, 0.5), 0 0 20px rgba(157,, 78, 221, 0.3)',
    neonStrong: '0 0 10px rgba(157, 78, 221, 0.7), 0 0 20px rgba(157, 78, 221, 0.5), 0 0 30px rgba(157, 78, 221, 0.3)',
    neonSecondary: '0 0 10px rgba(0, 245, 212, 0.5), 0 0 20px rgba(0, 245, 212, 0.3)',
    neonAccent: '0 0 10px rgba(255, 94, 120, 0.5), 0 0 20px rgba(255, 94, 120, 0.3)',
    neonSuccess: '0 0 10px rgba(0, 214, 143, 0.5), 0 0 20px rgba(0, 214, 143, 0.3)',
    neonError: '0 0 10px rgba(255, 66, 127, 0.5), 0 0 20px rgba(255, 66, 127, 0.3)',
  },
  
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    altFontFamily: "'Manrope', sans-serif",
    modernFontFamily: "'Space Grotesk', 'Outfit', sans-serif", // Add more modern fonts
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
      '7xl': '5rem',
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
    '6xl': '8rem',
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
    instant: 'all 0.1s ease',
    quick: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    elastic: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1.2)',
    elegant: 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
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
    notification: 1080,
  },
  
  // Animation durations
  animation: {
    fastest: '0.1s',
    fast: '0.3s',
    default: '0.5s',
    slow: '0.8s',
    slowest: '1.2s',
  },
  
  // Blur effects
  blur: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #9D4EDD 0%, #7B2CBF 100%)',
    secondary: 'linear-gradient(135deg, #00F5D4 0%, #00BBF9 100%)',
    accent: 'linear-gradient(135deg, #FF5E78 0%, #FF9E64 100%)',
    success: 'linear-gradient(135deg, #00D68F 0%, #00A870 100%)',
    error: 'linear-gradient(135deg, #FF427F 0%, #FF0055 100%)',
    warning: 'linear-gradient(135deg, #FFBE0B 0%, #FB8500 100%)',
    info: 'linear-gradient(135deg, #3DBBFF 0%, #0096FF 100%)',
    purple: 'linear-gradient(135deg, #9D4EDD 0%, #6A3093 100%)',
    blue: 'linear-gradient(135deg, #00BBF9 0%, #0072FF 100%)',
    teal: 'linear-gradient(135deg, #00F5D4 0%, #00BBF9 100%)',
    pink: 'linear-gradient(135deg, #FF5E78 0%, #FF0055 100%)',
    orange: 'linear-gradient(135deg, #FF9E64 0%, #FB8500 100%)',
    yellow: 'linear-gradient(135deg, #FFBE0B 0%, #FB8500 100%)',
    green: 'linear-gradient(135deg, #00F5D4 0%, #00D68F 100%)',
    darkPurple: 'linear-gradient(135deg, #5A189A 0%, #3C096C 100%)',
    rainbow: 'linear-gradient(90deg, #9D4EDD 0%, #00F5D4 50%, #FF5E78 100%)',
  },
};
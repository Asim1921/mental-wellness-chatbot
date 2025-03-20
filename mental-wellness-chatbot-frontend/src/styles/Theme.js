export const theme = {
    colors: {
      primary: '#4776E6',
      primaryLight: '#8E54E9', 
      primaryDark: '#3A60B8',
      secondary: '#6EE7B7',
      secondaryLight: '#A7F3D0',
      secondaryDark: '#34D399',
      background: '#F9FAFB',
      foreground: '#FFFFFF',
      text: '#1F2937',
      textLight: '#6B7280',
      headings: '#111827',
      error: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      info: '#3B82F6',
      scrollTrack: '#F1F1F1',
      scrollThumb: '#CCCCCC',
      scrollThumbHover: '#AAAAAA',
      cardBackground: '#FFFFFF',
      cardBorder: '#E5E7EB',
      disabled: '#E5E7EB',
      divider: '#E5E7EB',
      
      // Mood colors
      mood: {
        veryBad: '#EF4444',
        bad: '#F59E0B',
        neutral: '#9CA3AF',
        good: '#10B981',
        veryGood: '#3B82F6',
      }
    },
    
    // For dark mode - to be implemented later
    darkColors: {
      primary: '#5B8DEF',
      primaryLight: '#A687F5', 
      primaryDark: '#3966C5',
      secondary: '#56DEBB',
      secondaryLight: '#80EAD0',
      secondaryDark: '#2BB586',
      background: '#111827',
      foreground: '#1F2937',
      text: '#F9FAFB',
      textLight: '#D1D5DB',
      headings: '#FFFFFF',
      cardBackground: '#1F2937',
      cardBorder: '#374151',
      disabled: '#4B5563',
      divider: '#374151',
    },
    
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      xl: '1.5rem',
      full: '9999px',
    },
    
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
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
      },
      fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
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
      short: 'all 0.2s ease',
      medium: 'all 0.3s ease',
      long: 'all 0.5s ease',
    },
    
    // Responsive container sizes
    container: {
      sm: '540px',
      md: '720px',
      lg: '960px',
      xl: '1140px',
      '2xl': '1320px',
    },
    
    // Z-index values
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
  };
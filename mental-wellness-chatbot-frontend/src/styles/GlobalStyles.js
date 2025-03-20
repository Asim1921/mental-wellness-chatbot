import { createGlobalStyle, keyframes, css } from 'styled-components';

// Enhanced animation keyframes with more exciting effects
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInDown = keyframes`
  from { 
    opacity: 0;
    transform: translateY(-30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from { 
    opacity: 0;
    transform: translateX(-30px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from { 
    opacity: 0;
    transform: translateX(30px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideInDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const slideInRight = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const zoomIn = keyframes`
  from { 
    opacity: 0;
    transform: scale(0.8);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
`;

const zoomOut = keyframes`
  from { 
    opacity: 0;
    transform: scale(1.2);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const flash = keyframes`
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0.5; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const rotateIn = keyframes`
  from { 
    opacity: 0;
    transform: rotate(-15deg) scale(0.9);
  }
  to { 
    opacity: 1;
    transform: rotate(0) scale(1);
  }
`;

const floating = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const glowing = keyframes`
  0% { 
    box-shadow: 0 0 5px rgba(157, 78, 221, 0.5),
                0 0 10px rgba(157, 78, 221, 0.3); 
  }
  50% { 
    box-shadow: 0 0 10px rgba(157, 78, 221, 0.8),
                0 0 20px rgba(157, 78, 221, 0.5); 
  }
  100% { 
    box-shadow: 0 0 5px rgba(157, 78, 221, 0.5),
                0 0 10px rgba(157, 78, 221, 0.3); 
  }
`;

const glowingText = keyframes`
  0% { text-shadow: 0 0 5px rgba(157, 78, 221, 0.5); }
  50% { text-shadow: 0 0 10px rgba(157, 78, 221, 0.8); }
  100% { text-shadow: 0 0 5px rgba(157, 78, 221, 0.5); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: ${({ theme }) => theme.transitions.default};
  }

  html, body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.backgroundGradient};
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    overflow-x: hidden;
  }

  #root {
    width: 100%;
    height: 100%;
    animation: ${fadeIn} 0.5s ease-out;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: ${({ theme }) => theme.colors.primaryGradient};
      transition: ${({ theme }) => theme.transitions.default};
      opacity: 0;
    }
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryLight};
      text-decoration: none;
      
      &:after {
        width: 100%;
        opacity: 1;
      }
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    outline: none;
    
    /* Default button styling that can be overridden */
    &.btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.625rem 1.25rem;
      border-radius: ${({ theme }) => theme.borderRadius.md};
      font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
      transition: ${({ theme }) => theme.transitions.default};
      position: relative;
      overflow: hidden;
      
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        transition: ${({ theme }) => theme.transitions.default};
      }
      
      &:hover:before {
        left: 100%;
        transition: 0.7s ease-in-out;
      }
      
      &.btn-primary {
        background: ${({ theme }) => theme.colors.primaryGradient};
        color: white;
        box-shadow: ${({ theme }) => theme.boxShadow.coloredSm};
        
        &:hover {
          box-shadow: ${({ theme }) => theme.boxShadow.coloredLg};
          transform: translateY(-3px);
        }
        
        &:active {
          transform: translateY(-1px);
          box-shadow: ${({ theme }) => theme.boxShadow.coloredMd};
        }
      }
      
      &.btn-secondary {
        background: ${({ theme }) => theme.colors.secondaryGradient};
        color: white;
        
        &:hover {
          box-shadow: 0 4px 20px rgba(0, 245, 212, 0.4);
          transform: translateY(-3px);
        }
      }
      
      &.btn-outline {
        background: transparent;
        border: 2px solid ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primary};
        
        &:hover {
          background: rgba(157, 78, 221, 0.1);
          transform: translateY(-3px);
          box-shadow: ${({ theme }) => theme.boxShadow.coloredSm};
        }
      }
      
      &.btn-ghost {
        background: transparent;
        color: ${({ theme }) => theme.colors.primary};
        
        &:hover {
          background: rgba(157, 78, 221, 0.05);
          transform: translateY(-2px);
        }
      }
      
      &.btn-glow {
        animation: ${glowing} 2s infinite;
        
        &:hover {
          animation: none;
          box-shadow: ${({ theme }) => theme.boxShadow.neonStrong};
        }
      }
    }
  }

  input, textarea, select {
    font-family: inherit;
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: 0.75rem 1rem;
    outline: none;
    background: ${({ theme }) => theme.colors.foreground};
    color: ${({ theme }) => theme.colors.text};
    transition: ${({ theme }) => theme.transitions.default};
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.1);
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
    
    /* Fancy input with glow effect on focus */
    &.input-fancy {
      border: 2px solid ${({ theme }) => theme.colors.divider};
      
      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 7px rgba(157, 78, 221, 0.3);
      }
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.75rem;
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
    color: ${({ theme }) => theme.colors.headings};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
    margin-bottom: 1.5rem;
    animation: ${fadeInDown} 0.7s ease-out forwards;
    opacity: 0;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
    }
    
    &.fancy-heading {
      font-family: ${({ theme }) => theme.typography.modernFontFamily};
      background: ${({ theme }) => theme.gradients.primary};
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${fadeInDown} 0.7s ease-out forwards, ${gradientFlow} 5s ease infinite;
      text-shadow: 0 0 5px rgba(157, 78, 221, 0.2);
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
    animation: ${fadeInRight} 0.6s ease-out forwards;
    opacity: 0;
    animation-delay: 0.1s;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
    }
    
    &.fancy-heading {
      background: ${({ theme }) => theme.gradients.secondary};
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${fadeInRight} 0.6s ease-out forwards, ${gradientFlow} 5s ease infinite;
      animation-delay: 0.1s;
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
    animation: ${fadeInLeft} 0.5s ease-out forwards;
    opacity: 0;
    animation-delay: 0.2s;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    }
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    animation: ${fadeInRight} 0.5s ease-out forwards;
    opacity: 0;
    animation-delay: 0.25s;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    }
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    animation: ${fadeInLeft} 0.5s ease-out forwards;
    opacity: 0;
    animation-delay: 0.3s;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSizes.md};
    }
  }

  h6 {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    animation: ${fadeInRight} 0.5s ease-out forwards;
    opacity: 0;
    animation-delay: 0.35s;
  }

  p {
    margin-bottom: 1rem;
    animation: ${fadeInUp} 0.6s ease-out forwards;
    opacity: 0;
    animation-delay: 0.2s;
    line-height: 1.6;
  }
  
  /* Cards with enhanced glassmorphism effect */
  .card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(${({ theme }) => theme.blur.md});
    -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.md});
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border: 1px solid ${({ theme }) => theme.colors.glassBorder};
    box-shadow: ${({ theme }) => theme.boxShadow.glass};
    transition: ${({ theme }) => theme.transitions.smooth};
    overflow: hidden;
    
    &:hover {
      transform: translateY(-7px);
      box-shadow: ${({ theme }) => theme.boxShadow.xl};
      border-color: rgba(157, 78, 221, 0.2);
    }
    
    &.interactive {
      cursor: pointer;
      
      &:active {
        transform: scale(0.98);
      }
    }
    
    /* Card with neon effect */
    &.card-neon {
      border: 1px solid ${({ theme }) => theme.colors.primaryLight}40;
      box-shadow: ${({ theme }) => theme.boxShadow.neon};
      
      &:hover {
        box-shadow: ${({ theme }) => theme.boxShadow.neonStrong};
      }
    }
    
    /* Card with gradient border */
    &.card-gradient-border {
      position: relative;
      border: none;
      background-clip: padding-box;
      
      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        margin: -1px;
        border-radius: inherit;
        background: ${({ theme }) => theme.gradients.rainbow};
        background-size: 200% auto;
        animation: ${gradientFlow} 4s ease infinite;
      }
      
      &:hover:before {
        animation: ${gradientFlow} 2s ease infinite;
      }
    }
    
    /* Card with floating effect */
    &.card-float {
      animation: ${floating} 3s ease-in-out infinite;
      
      &:hover {
        animation-play-state: paused;
      }
    }
  }
  
  /* Dashboard specific styles */
  .dashboard-container {
    background: ${({ theme }) => theme.colors.dashboard.background};
    min-height: 100vh;
    
    .dashboard-card {
      background: ${({ theme }) => theme.colors.dashboard.cardBackground};
      border-radius: ${({ theme }) => theme.borderRadius.lg};
      box-shadow: ${({ theme }) => theme.boxShadow.md};
      transition: ${({ theme }) => theme.transitions.default};
      
      &:hover {
        transform: translateY(-5px) scale(1.01);
        box-shadow: ${({ theme }) => theme.boxShadow.lg};
      }
      
      /* Different accent colors for dashboard cards */
      &.accent-1 {
        border-top: 3px solid ${({ theme }) => theme.colors.dashboard.accent1};
      }
      
      &.accent-2 {
        border-top: 3px solid ${({ theme }) => theme.colors.dashboard.accent2};
      }
      
      &.accent-3 {
        border-top: 3px solid ${({ theme }) => theme.colors.dashboard.accent3};
      }
      
      &.accent-4 {
        border-top: 3px solid ${({ theme }) => theme.colors.dashboard.accent4};
      }
    }
  }
  
  /* Section animations */
  .section {
    animation: ${fadeIn} 0.8s ease-out forwards;
    opacity: 0;
  }
  
  /* Hero section animations */
  .hero-section {
    position: relative;
    overflow: hidden;
    
    &:before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: ${({ theme }) => theme.colors.primaryLight}10;
      border-radius: 50%;
      z-index: -1;
    }
    
    .hero-title {
      animation: ${fadeInDown} 0.8s ease-out forwards;
      opacity: 0;
    }
    
    .hero-subtitle {
      animation: ${fadeInUp} 0.8s ease-out forwards;
      opacity: 0;
      animation-delay: 0.2s;
    }
    
    .hero-cta {
      animation: ${fadeInUp} 0.8s ease-out forwards;
      opacity: 0;
      animation-delay: 0.4s;
    }
    
    .hero-image {
      animation: ${zoomOut} 1s ease-out forwards;
      opacity: 0;
      animation-delay: 0.6s;
    }
  }
  
  /* Animation classes that can be applied anywhere */
  .fade-in {
    animation: ${fadeIn} 0.5s ease-out forwards;
  }
  
  .fade-in-up {
    animation: ${fadeInUp} 0.5s ease-out forwards;
  }
  
  .fade-in-down {
    animation: ${fadeInDown} 0.5s ease-out forwards;
  }
  
  .fade-in-left {
    animation: ${fadeInLeft} 0.5s ease-out forwards;
  }
  
  .fade-in-right {
    animation: ${fadeInRight} 0.5s ease-out forwards;
  }
  
  .slide-in-up {
    animation: ${slideInUp} 0.5s ease-out forwards;
  }
  
  .slide-in-down {
    animation: ${slideInDown} 0.5s ease-out forwards;
  }
  
  .slide-in-left {
    animation: ${slideInLeft} 0.5s ease-out forwards;
  }
  
  .slide-in-right {
    animation: ${slideInRight} 0.5s ease-out forwards;
  }
  
  .zoom-in {
    animation: ${zoomIn} 0.5s ease-out forwards;
  }
  
  .zoom-out {
    animation: ${zoomOut} 0.5s ease-out forwards;
  }
  
  .bounce {
    animation: ${bounce} 1s ease infinite;
  }
  
  .pulse {
    animation: ${pulse} 2s infinite;
  }
  
  .flash {
    animation: ${flash} 2s infinite;
  }
  
  .shake {
    animation: ${shake} 0.8s ease-out;
  }
  
  .rotate-in {
    animation: ${rotateIn} 0.5s ease-out forwards;
  }
  
  .floating {
    animation: ${floating} 3s ease-in-out infinite;
  }
  
  .glowing {
    animation: ${glowing} 2s infinite;
  }
  
  .glowing-text {
    animation: ${glowingText} 2s infinite;
  }
  
  .gradient-text {
    background: ${({ theme }) => theme.gradients.rainbow};
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${gradientFlow} 5s ease infinite;
  }
  
  /* Animation delay utilities */
  .delay-0 { animation-delay: 0s; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }
  .delay-5 { animation-delay: 0.5s; }
  .delay-6 { animation-delay: 0.6s; }
  .delay-7 { animation-delay: 0.7s; }
  .delay-8 { animation-delay: 0.8s; }
  .delay-9 { animation-delay: 0.9s; }
  .delay-10 { animation-delay: 1s; }
  
  /* Color utilities */
  .text-primary { color: ${({ theme }) => theme.colors.primary}; }
  .text-secondary { color: ${({ theme }) => theme.colors.secondary}; }
  .text-accent { color: ${({ theme }) => theme.colors.accent}; }
  .text-success { color: ${({ theme }) => theme.colors.success}; }
  .text-error { color: ${({ theme }) => theme.colors.error}; }
  .text-warning { color: ${({ theme }) => theme.colors.warning}; }
  .text-info { color: ${({ theme }) => theme.colors.info}; }
  
  /* Glassmorphism utilities */
  .glass {
    background: ${({ theme }) => theme.colors.glass};
    backdrop-filter: blur(${({ theme }) => theme.blur.md});
    -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.md});
    border: 1px solid ${({ theme }) => theme.colors.glassBorder};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
  
  .glass-dark {
    background: ${({ theme }) => theme.colors.darkGlass};
    backdrop-filter: blur(${({ theme }) => theme.blur.md});
    -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.md});
    border: 1px solid ${({ theme }) => theme.colors.darkGlassBorder};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.scrollTrack};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scrollThumb};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    transition: ${({ theme }) => theme.transitions.default};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.scrollThumbHover};
  }
  
  /* Selection styling */
  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  
  /* Tooltip styling */
  [data-tooltip] {
    position: relative;
    cursor: help;
    
    &:before, &:after {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
      position: absolute;
      z-index: ${({ theme }) => theme.zIndex.tooltip};
    }
    
    &:before {
      content: attr(data-tooltip);
      padding: 0.5rem 1rem;
      background: ${({ theme }) => theme.colors.headings};
      color: white;
      border-radius: ${({ theme }) => theme.borderRadius.md};
      white-space: nowrap;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: ${({ theme }) => theme.boxShadow.md};
      font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    }
    
    &:after {
      content: '';
      border-width: 5px;
      border-style: solid;
      border-color: ${({ theme }) => theme.colors.headings} transparent transparent transparent;
      top: -3px;
      left: 50%;
      transform: translateX(-50%);
    }
    
    &:hover:before, &:hover:after {
      visibility: visible;
      opacity: 1;
    }
  }
  
  /* Neon text effect */
  .neon-text {
    color: ${({ theme }) => theme.colors.primaryNeon};
    text-shadow: 0 0 5px ${({ theme }) => theme.colors.primaryNeon}80,
                 0 0 10px ${({ theme }) => theme.colors.primaryNeon}40;
  }
  
  .neon-text-secondary {
    color: ${({ theme }) => theme.colors.secondaryNeon};
    text-shadow: 0 0 5px ${({ theme }) => theme.colors.secondaryNeon}80,
                 0 0 10px ${({ theme }) => theme.colors.secondaryNeon}40;
  }
  
  .neon-text-accent {
    color: ${({ theme }) => theme.colors.accentNeon};
    text-shadow: 0 0 5px ${({ theme }) => theme.colors.accentNeon}80,
                 0 0 10px ${({ theme }) => theme.colors.accentNeon}40;
  }
`;
import { createGlobalStyle, keyframes } from 'styled-components';

// Define keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&display=swap');

  * {
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
          rgba(255, 255, 255, 0.2),
          transparent
        );
        transition: ${({ theme }) => theme.transitions.default};
      }
      
      &:hover:before {
        left: 100%;
      }
      
      &.btn-primary {
        background: ${({ theme }) => theme.colors.primaryGradient};
        color: white;
        box-shadow: ${({ theme }) => theme.boxShadow.coloredSm};
        
        &:hover {
          box-shadow: ${({ theme }) => theme.boxShadow.coloredMd};
          transform: translateY(-2px);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
      
      &.btn-secondary {
        background: ${({ theme }) => theme.colors.secondaryGradient};
        color: white;
        
        &:hover {
          box-shadow: 0 4px 20px rgba(0, 201, 167, 0.3);
          transform: translateY(-2px);
        }
      }
      
      &.btn-outline {
        background: transparent;
        border: 2px solid ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primary};
        
        &:hover {
          background: rgba(138, 43, 226, 0.1);
          transform: translateY(-2px);
        }
      }
      
      &.btn-ghost {
        background: transparent;
        color: ${({ theme }) => theme.colors.primary};
        
        &:hover {
          background: rgba(138, 43, 226, 0.05);
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
      box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.1);
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.75rem;
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
    color: ${({ theme }) => theme.colors.headings};
    animation: ${slideInRight} 0.5s ease forwards;
    opacity: 0;
    animation-delay: 0.1s;
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
    margin-bottom: 1.5rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
    animation-delay: 0.15s;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
    animation-delay: 0.2s;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    }
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    animation-delay: 0.25s;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    }
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    animation-delay: 0.3s;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSizes.md};
    }
  }

  h6 {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    animation-delay: 0.35s;
  }

  p {
    margin-bottom: 1rem;
    animation: ${slideInUp} 0.6s ease forwards;
    opacity: 0;
    animation-delay: 0.2s;
  }
  
  /* Cards with glassmorphism effect */
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
      transform: translateY(-5px);
      box-shadow: ${({ theme }) => theme.boxShadow.xl};
    }
    
    &.interactive {
      cursor: pointer;
      
      &:active {
        transform: scale(0.98);
      }
    }
  }
  
  /* Section animations */
  .section {
    animation: ${fadeIn} 0.8s ease-out forwards;
    opacity: 0;
  }
  
  /* Animation classes that can be applied anywhere */
  .fade-in {
    animation: ${fadeIn} 0.5s ease-out forwards;
  }
  
  .slide-in-right {
    animation: ${slideInRight} 0.5s ease forwards;
  }
  
  .slide-in-up {
    animation: ${slideInUp} 0.5s ease forwards;
  }
  
  .pulse {
    animation: ${pulse} 2s infinite;
  }
  
  /* Animation delay utilities */
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }
  .delay-5 { animation-delay: 0.5s; }

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
`;
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    line-height: 1.5;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input, textarea, select {
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    font-weight: 600;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.headings};
  }

  h1 {
    font-size: 2.5rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 2rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 1.75rem;
    }
  }

  h3 {
    font-size: 1.75rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 1.5rem;
    }
  }

  h4 {
    font-size: 1.5rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 1.25rem;
    }
  }

  h5 {
    font-size: 1.25rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 1.1rem;
    }
  }

  h6 {
    font-size: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.scrollTrack};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scrollThumb};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.scrollThumbHover};
  }
`;
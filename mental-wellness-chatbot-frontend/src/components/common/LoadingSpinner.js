import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Updated with $-prefixed props
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.$fullScreen ? '100vh' : '100%'};
  width: 100%;
`;

const Spinner = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.divider};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
`;

const LoadingSpinner = ({ size, fullScreen = false, text }) => {
  return (
    <SpinnerWrapper $fullScreen={fullScreen}>
      <div>
        <Spinner size={size} />
        {text && <LoadingText>{text}</LoadingText>}
      </div>
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
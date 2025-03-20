import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 6rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 4rem;
  }
`;

const ErrorMessage = styled.h2`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.headings};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Page Not Found</ErrorMessage>
      <ErrorDescription>
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </ErrorDescription>
      
      <ButtonContainer>
        <Button as={Link} to="/">
          Go Home
        </Button>
        <Button as={Link} to="/chat" variant="outline">
          Start Chatting
        </Button>
      </ButtonContainer>
    </NotFoundContainer>
  );
};

export default NotFound;
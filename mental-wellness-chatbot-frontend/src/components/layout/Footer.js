import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.foreground};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 -1px 0 ${({ theme }) => theme.colors.divider};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${({ theme }) => theme.container.xl};
  margin: 0 auto;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterHeading = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.short};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <FooterHeading>Mental Wellness Chatbot</FooterHeading>
            <FooterText>
              A personalized mental wellness assistant that provides support,
              resources, and techniques to help improve your mental wellbeing.
            </FooterText>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinks>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/chat">Chat</FooterLink>
              <FooterLink to="/resources">Resources</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Support</FooterHeading>
            <FooterLinks>
              <FooterLink to="/resources">Crisis Resources</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterTop>
        
        <FooterBottom>
          <Copyright>
            © {currentYear} Mental Wellness Chatbot. All rights reserved.
          </Copyright>
          
          <LegalLinks>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/disclaimer">Disclaimer</FooterLink>
          </LegalLinks>
        </FooterBottom>
        
        <FooterText style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.75rem' }}>
          Important: This chatbot is not a substitute for professional mental health care.
          If you are experiencing a crisis, please seek immediate help from a qualified professional.
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
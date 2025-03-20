import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: ${({ theme }) => `linear-gradient(180deg, ${theme.colors.foreground} 0%, ${theme.colors.cardBackgroundAlt} 100%)`};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 -1px 0 ${({ theme }) => theme.colors.divider};
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.primaryGradient};
    opacity: 0.7;
  }
  
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
  color: ${({ theme }) => theme.colors.headings};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 30px;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1.6;
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
  color: ${({ theme }) => theme.colors.textMuted || theme.colors.textLight};
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

const DisclaimerBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.error}10;
  border: 1px solid ${({ theme }) => theme.colors.error}30;
`;

const DisclaimerText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin: 0;
  text-align: center;
`;

const BrandTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <BrandTitle>Mental Wellness Hub</BrandTitle>
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
            © {currentYear} Mental Wellness Hub. All rights reserved.
          </Copyright>
          
          <LegalLinks>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/disclaimer">Disclaimer</FooterLink>
          </LegalLinks>
        </FooterBottom>
        
        <DisclaimerBox>
          <DisclaimerText>
            <strong>Important:</strong> This application is not a substitute for professional mental health care.
            If you are experiencing a crisis, please seek immediate help from a qualified professional.
          </DisclaimerText>
        </DisclaimerBox>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
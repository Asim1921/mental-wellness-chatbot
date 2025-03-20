import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/common/Button';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing.xl}`};
  background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryLight});
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  }
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes['5xl']};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  max-width: 800px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const FeatureSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: ${({ theme }) => theme.transitions.medium};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FeatureTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`;

const CTASection = styled.section`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.xl} 0`};
  margin-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;

const CTATitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CTADescription = styled.p`
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
`;

const DisclaimerSection = styled.section`
  background-color: ${({ theme }) => `${theme.colors.warning}15`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => `${theme.colors.warning}30`};
`;

const DisclaimerTitle = styled.h4`
  color: ${({ theme }) => theme.colors.warning};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <Layout>
      <HeroSection>
        <HeroTitle>Your Mental Wellness Companion</HeroTitle>
        <HeroSubtitle>
          A personalized AI assistant that listens, supports, and provides valuable resources 
          to help improve your mental wellbeing.
        </HeroSubtitle>
        <ButtonGroup>
          {isAuthenticated ? (
            <Button size="large" onClick={() => navigate('/chat')}>
              Start Chatting
            </Button>
          ) : (
            <>
              <Button size="large" onClick={() => navigate('/register')}>
                Sign Up
              </Button>
              <Button size="large" variant="outline" onClick={() => navigate('/login')}>
                Login
              </Button>
            </>
          )}
        </ButtonGroup>
      </HeroSection>
      
      <FeatureSection>
        <SectionTitle>How It Helps</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>💬</FeatureIcon>
            <FeatureTitle>Personalized Conversations</FeatureTitle>
            <FeatureDescription>
              Share your thoughts and feelings with a compassionate AI that responds
              with understanding and helpful insights.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🧘</FeatureIcon>
            <FeatureTitle>Mindfulness Exercises</FeatureTitle>
            <FeatureDescription>
              Access guided exercises to help reduce stress, anxiety, and improve
              your mental clarity and emotional balance.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Mood Tracking</FeatureTitle>
            <FeatureDescription>
              Monitor your emotional patterns over time to gain insights into your
              mental health journey and identify helpful strategies.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>💡</FeatureIcon>
            <FeatureTitle>Coping Techniques</FeatureTitle>
            <FeatureDescription>
              Learn evidence-based strategies to manage difficult emotions and build
              resilience for life's challenges.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>Personalized Resources</FeatureTitle>
            <FeatureDescription>
              Discover articles, quotes, and tools tailored to your specific needs
              and mental health goals.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🛡️</FeatureIcon>
            <FeatureTitle>Crisis Support</FeatureTitle>
            <FeatureDescription>
              Access emergency resources and hotlines when you need immediate support
              during difficult times.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeatureSection>
      
      <CTASection>
        <CTATitle>Ready to Start Your Wellness Journey?</CTATitle>
        <CTADescription>
          Join thousands of users who have improved their mental wellbeing with our
          supportive AI companion.
        </CTADescription>
        {isAuthenticated ? (
          <Button size="large" onClick={() => navigate('/chat')}>
            Start Chatting Now
          </Button>
        ) : (
          <Button size="large" onClick={() => navigate('/register')}>
            Create Your Free Account
          </Button>
        )}
      </CTASection>
      
      <DisclaimerSection>
        <DisclaimerTitle>Important Note</DisclaimerTitle>
        <p>
          This chatbot is designed to provide support and resources for mental wellness, 
          but it is not a substitute for professional mental health care. If you are 
          experiencing a crisis or need immediate help, please contact a mental health 
          professional or crisis service.
        </p>
      </DisclaimerSection>
    </Layout>
  );
};

export default Home;
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import useApi from '../hooks/useApi';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const WelcomeCard = styled.div`
  background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryLight});
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  color: white;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const WelcomeTitle = styled.h1`
  margin: 0;
`;

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitleText = styled.span``;

const ViewAllLink = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const ChatHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ChatHistoryCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  transition: ${({ theme }) => theme.transitions.short};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.divider};
  }
`;

const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatDate = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const MoodTrackerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MoodButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme, selected }) => selected ? theme.colors.primary : theme.colors.divider};
  background-color: ${({ theme, selected }) => selected ? `${theme.colors.primary}10` : theme.colors.background};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.short};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const MoodEmoji = styled.div`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const MoodLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
`;

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loading, getChatHistory, getMoodHistory, addMoodEntry } = useApi();
  
  const [chatSessions, setChatSessions] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [stats, setStats] = useState({
    chatSessions: 0,
    moodEntries: 0,
    streak: 0,
    resources: 0
  });
  
  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      const response = await getChatHistory();
      if (!response.error && response.sessions) {
        setChatSessions(response.sessions);
        setStats(prev => ({ ...prev, chatSessions: response.count || 0 }));
      }
    };
    
    fetchChatHistory();
  }, [getChatHistory]);
  
  // Fetch mood history
  useEffect(() => {
    const fetchMoodHistory = async () => {
      const response = await getMoodHistory();
      if (!response.error && response.moodTracking) {
        setMoodHistory(response.moodTracking);
        setStats(prev => ({ ...prev, moodEntries: response.moodTracking.length || 0 }));
        
        // Calculate streak (consecutive days with mood entries)
        if (response.moodTracking.length > 0) {
          let streak = 0;
          const sortedEntries = [...response.moodTracking].sort((a, b) => 
            new Date(b.date) - new Date(a.date));
          
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          let currentDate = today;
          
          for (const entry of sortedEntries) {
            const entryDate = new Date(entry.date);
            entryDate.setHours(0, 0, 0, 0);
            
            const diffDays = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24));
            
            if (diffDays <= 1) {
              streak++;
              currentDate = entryDate;
            } else {
              break;
            }
          }
          
          setStats(prev => ({ ...prev, streak }));
        }
      }
    };
    
    fetchMoodHistory();
  }, [getMoodHistory]);
  
  // Submit mood entry
  const handleMoodSubmit = async () => {
    if (!selectedMood) return;
    
    const moodData = {
      mood: selectedMood,
      note: ''
    };
    
    const response = await addMoodEntry(moodData);
    
    if (!response.error && response.moodTracking) {
      setMoodHistory(response.moodTracking);
      setStats(prev => ({ 
        ...prev, 
        moodEntries: response.moodTracking.length || 0,
        streak: prev.streak + 1
      }));
      setSelectedMood(null); // Reset selection
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <Layout>
        <LoadingSpinner fullScreen text="Loading your dashboard..." />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <DashboardContainer>
        <WelcomeCard>
          <WelcomeTitle>Welcome back, {user?.name || 'Friend'}!</WelcomeTitle>
          <p>Track your progress, log your mood, and continue your wellness journey.</p>
          <Button onClick={() => navigate('/chat')} style={{ alignSelf: 'flex-start' }}>
            Start Chatting
          </Button>
        </WelcomeCard>
        
        <Section>
          <SectionTitle>
            <SectionTitleText>Your Stats</SectionTitleText>
          </SectionTitle>
          
          <StatsGrid>
            <StatCard>
              <StatValue>{stats.chatSessions}</StatValue>
              <StatLabel>Chat Sessions</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatValue>{stats.moodEntries}</StatValue>
              <StatLabel>Mood Entries</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatValue>{stats.streak}</StatValue>
              <StatLabel>Day Streak</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatValue>{stats.resources}</StatValue>
              <StatLabel>Resources Saved</StatLabel>
            </StatCard>
          </StatsGrid>
        </Section>
        
        <Section>
          <SectionTitle>
            <SectionTitleText>Today's Mood</SectionTitleText>
          </SectionTitle>
          
          <MoodTrackerSection>
            <MoodGrid>
              <MoodButton 
                selected={selectedMood === 'very_bad'} 
                onClick={() => setSelectedMood('very_bad')}
              >
                <MoodEmoji>😞</MoodEmoji>
                <MoodLabel>Very Bad</MoodLabel>
              </MoodButton>
              
              <MoodButton 
                selected={selectedMood === 'bad'} 
                onClick={() => setSelectedMood('bad')}
              >
                <MoodEmoji>😔</MoodEmoji>
                <MoodLabel>Bad</MoodLabel>
              </MoodButton>
              
              <MoodButton 
                selected={selectedMood === 'neutral'} 
                onClick={() => setSelectedMood('neutral')}
              >
                <MoodEmoji>😐</MoodEmoji>
                <MoodLabel>Neutral</MoodLabel>
              </MoodButton>
              
              <MoodButton 
                selected={selectedMood === 'good'} 
                onClick={() => setSelectedMood('good')}
              >
                <MoodEmoji>🙂</MoodEmoji>
                <MoodLabel>Good</MoodLabel>
              </MoodButton>
              
              <MoodButton 
                selected={selectedMood === 'very_good'} 
                onClick={() => setSelectedMood('very_good')}
              >
                <MoodEmoji>😄</MoodEmoji>
                <MoodLabel>Very Good</MoodLabel>
              </MoodButton>
            </MoodGrid>
            
            <Button
              onClick={handleMoodSubmit}
              disabled={!selectedMood}
              fullWidth
            >
              Log Today's Mood
            </Button>
          </MoodTrackerSection>
        </Section>
        
        <Section>
          <SectionTitle>
            <SectionTitleText>Recent Conversations</SectionTitleText>
            <ViewAllLink onClick={() => navigate('/chat-history')}>
              View All
            </ViewAllLink>
          </SectionTitle>
          
          {chatSessions.length > 0 ? (
            <ChatHistoryList>
              {chatSessions.slice(0, 5).map((session) => (
                <ChatHistoryCard 
                  key={session.sessionId}
                  onClick={() => navigate(`/chat?session=${session.sessionId}`)}
                >
                  <ChatInfo>
                    <div>Session {session.sessionId.substring(0, 8)}...</div>
                    <ChatDate>{formatDate(session.updatedAt)}</ChatDate>
                  </ChatInfo>
                  <Button variant="text" size="small">
                    Continue
                  </Button>
                </ChatHistoryCard>
              ))}
            </ChatHistoryList>
          ) : (
            <NoDataMessage>
              You haven't had any conversations yet. Start chatting to see your history!
            </NoDataMessage>
          )}
        </Section>
      </DashboardContainer>
    </Layout>
  );
};

export default Dashboard;
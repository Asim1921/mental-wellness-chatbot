import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this: npm install uuid
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useApi from '../hooks/useApi';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px); // Adjust based on your navbar/footer height
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ChatTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
`;

const NewChatButton = styled(Button)`
  margin-left: auto;
`;

const ChatMessagesContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  word-wrap: break-word;
  
  ${({ isUser, theme }) => isUser ? `
    align-self: flex-end;
    background-color: ${theme.colors.primary};
    color: white;
    border-bottom-right-radius: ${theme.borderRadius.sm};
  ` : `
    align-self: flex-start;
    background-color: ${theme.colors.foreground};
    color: ${theme.colors.text};
    border-bottom-left-radius: ${theme.borderRadius.sm};
    box-shadow: ${theme.boxShadow.sm};
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 85%;
  }
`;

const MessageTime = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  text-align: right;
  opacity: 0.7;
`;

const ResourceCard = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => `${theme.colors.info}15`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 3px solid ${({ theme }) => theme.colors.info};
`;

const ResourceTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const ResourceLink = styled.a`
  color: ${({ theme }) => theme.colors.info};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  text-decoration: none;
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    text-decoration: underline;
  }
`;

const ExerciseCard = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => `${theme.colors.secondary}15`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 3px solid ${({ theme }) => theme.colors.secondary};
`;

const ExerciseTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const ExerciseSteps = styled.ol`
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

const QuoteCard = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  font-style: italic;
`;

const QuoteAuthor = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  text-align: right;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-style: normal;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const WelcomeTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InputContainer = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  background-color: ${({ theme }) => theme.colors.foreground};
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  resize: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}30`};
  }
`;

const SendButton = styled(Button)`
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { loading, error, sendMessage, getChatSession } = useApi();
  const [searchParams] = useSearchParams();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle session ID from URL or create new one
  useEffect(() => {
    const sessionParam = searchParams.get('session');
    
    if (sessionParam) {
      setSessionId(sessionParam);
      // Load existing chat session
      const fetchSession = async () => {
        const response = await getChatSession(sessionParam);
        if (!response.error && response.session) {
          setMessages(response.session.messages);
        }
      };
      fetchSession();
    } else {
      // Create new session ID
      setSessionId(uuidv4());
      
      // Add welcome message
      setMessages([
        {
          id: 1,
          sender: 'bot',
          content: "Hi, I'm your mental wellness assistant. How are you feeling today?",
          timestamp: new Date(),
        }
      ]);
    }
  }, [searchParams, getChatSession]);
  
  // Handle message submission
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Send message to server
    const response = await sendMessage(inputMessage, sessionId);
    
    setIsTyping(false);
    
    if (!response.error && response.message) {
      // Add bot response to chat
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        content: response.message.content,
        timestamp: new Date(response.message.timestamp || Date.now()),
        contentType: response.message.contentReference?.contentType,
        contentId: response.message.contentReference?.contentId,
        // Additional details based on content type
        details: {
          ...(response.message.quoteDetails && { quote: response.message.quoteDetails }),
          ...(response.message.exerciseDetails && { exercise: response.message.exerciseDetails }),
          ...(response.message.techniqueDetails && { technique: response.message.techniqueDetails }),
          ...(response.message.resources && { resources: response.message.resources }),
        }
      };
      
      setMessages(prev => [...prev, botMessage]);
    } else {
      // Add error message
      const errorMessage = {
        id: messages.length + 2,
        sender: 'bot',
        content: "I'm sorry, there was an error processing your message. Please try again.",
        timestamp: new Date(),
        isError: true,
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };
  
  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Create a new chat session
  const handleNewChat = () => {
    setSessionId(uuidv4());
    setMessages([
      {
        id: 1,
        sender: 'bot',
        content: "Hi, I'm your mental wellness assistant. How are you feeling today?",
        timestamp: new Date(),
      }
    ]);
    // Update URL without the session parameter
    window.history.pushState({}, '', '/chat');
  };
  
  // Render message content with additional cards based on content type
  const renderMessageContent = (message) => {
    return (
      <>
        <div>{message.content}</div>
        
        {message.contentType === 'quote' && message.details?.quote && (
          <QuoteCard>
            {message.details.quote.text || message.content}
            {message.details.quote.author && (
              <QuoteAuthor>— {message.details.quote.author}</QuoteAuthor>
            )}
          </QuoteCard>
        )}
        
        {message.contentType === 'exercise' && message.details?.exercise && (
          <ExerciseCard>
            <ExerciseTitle>{message.details.exercise.title}</ExerciseTitle>
            {message.details.exercise.steps && (
              <ExerciseSteps>
                {message.details.exercise.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ExerciseSteps>
            )}
          </ExerciseCard>
        )}
        
        {message.contentType === 'technique' && message.details?.technique && (
          <ExerciseCard>
            <ExerciseTitle>{message.details.technique.title}</ExerciseTitle>
            <div>{message.details.technique.instructions}</div>
          </ExerciseCard>
        )}
        
        {message.details?.resources && message.details.resources.length > 0 && (
          <>
            {message.details.resources.map((resource, index) => (
              <ResourceCard key={index}>
                <ResourceTitle>{resource.title}</ResourceTitle>
                <div>{resource.description}</div>
                <ResourceLink href={resource.url} target="_blank" rel="noopener noreferrer">
                  Learn More →
                </ResourceLink>
              </ResourceCard>
            ))}
          </>
        )}
        
        <MessageTime>{formatTime(message.timestamp)}</MessageTime>
      </>
    );
  };
  
  if (loading && messages.length === 0) {
    return (
      <Layout noPadding>
        <LoadingSpinner fullScreen text="Loading chat..." />
      </Layout>
    );
  }
  
  return (
    <Layout noPadding>
      <ChatContainer>
        <ChatHeader>
          <ChatTitle>Mental Wellness Chat</ChatTitle>
          <NewChatButton 
            variant="outline" 
            size="small"
            onClick={handleNewChat}
          >
            New Chat
          </NewChatButton>
        </ChatHeader>
        
        <ChatMessagesContainer>
          {messages.length === 0 && (
            <WelcomeMessage>
              <WelcomeTitle>Welcome to Your Mental Wellness Assistant</WelcomeTitle>
              <p>
                I'm here to provide support, resources, and strategies to help with your mental wellbeing.
                You can share how you're feeling, ask for advice, or simply chat. What's on your mind today?
              </p>
            </WelcomeMessage>
          )}
          
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              isUser={message.sender === 'user'}
            >
              {renderMessageContent(message)}
            </MessageBubble>
          ))}
          
          {isTyping && (
            <MessageBubble>
              <div>Thinking...</div>
            </MessageBubble>
          )}
          
          <div ref={messagesEndRef} />
        </ChatMessagesContainer>
        
        <InputContainer>
          <MessageInput
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            rows={2}
          />
          <SendButton
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
          >
            Send
          </SendButton>
        </InputContainer>
      </ChatContainer>
    </Layout>
  );
};

export default Chat;
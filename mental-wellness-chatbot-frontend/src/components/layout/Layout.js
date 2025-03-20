import React, { useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme, nopadding }) => nopadding ? '0' : theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme, nopadding }) => nopadding ? '0' : theme.spacing.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme, nopadding }) => nopadding ? '0' : theme.spacing.md};
  }
`;

const Layout = ({ children, noPadding = false }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  
  // Pages that don't need the standard layout
  const fullscreenPages = ['/login', '/register', '/404'];
  const isFullscreenPage = fullscreenPages.includes(location.pathname);
  
  // Chat page needs different padding
  const isChatPage = location.pathname === '/chat';
  
  if (isFullscreenPage) {
    return <>{children}</>;
  }
  
  return (
    <LayoutContainer>
      <Navbar />
      <ContentWrapper>
        {isAuthenticated && <Sidebar />}
        <MainContent nopadding={noPadding || isChatPage}>
          {children}
        </MainContent>
      </ContentWrapper>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.foreground};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  display: flex;
  flex-direction: column;
  transition: ${({ theme }) => theme.transitions.medium};
  overflow-y: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: fixed;
    height: 100vh;
    z-index: ${({ theme }) => theme.zIndex.fixed};
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-250px')};
    box-shadow: ${({ $isOpen, theme }) => $isOpen ? theme.boxShadow.lg : 'none'};
  }
`;

const SidebarHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SidebarTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`;

const NavSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.xs}`};
  margin: 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.short};
  border-left: 3px solid transparent;
  
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}10`};
    border-left-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.divider};
    text-decoration: none;
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
    font-size: 1.2rem;
  }
`;

const ToggleButton = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  z-index: ${({ theme }) => theme.zIndex.fixed};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Close sidebar on location change (mobile only)
  useEffect(() => {
    if (window.innerWidth <= 992) {
      setIsOpen(false);
    }
  }, [location]);
  
  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && window.innerWidth <= 992) {
        const sidebar = document.getElementById('sidebar');
        const toggleButton = document.getElementById('sidebar-toggle');
        
        if (sidebar && !sidebar.contains(e.target) && toggleButton && !toggleButton.contains(e.target)) {
          setIsOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <>
      <SidebarContainer id="sidebar" $isOpen={isOpen}>
        <SidebarHeader>
          <SidebarTitle>Dashboard</SidebarTitle>
          <CloseButton onClick={() => setIsOpen(false)}>✕</CloseButton>
        </SidebarHeader>
        
        <NavSection>
          <SectionTitle>Main</SectionTitle>
          <NavList>
            <NavItem>
              <NavLink to="/dashboard">Overview</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/chat">Chat</NavLink>
            </NavItem>
          </NavList>
        </NavSection>
        
        <NavSection>
          <SectionTitle>Wellness Tools</SectionTitle>
          <NavList>
            <NavItem>
              <NavLink to="/exercises">Mindfulness Exercises</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/techniques">Coping Techniques</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/mood-tracker">Mood Tracker</NavLink>
            </NavItem>
          </NavList>
        </NavSection>
        
        <NavSection>
          <SectionTitle>Resources</SectionTitle>
          <NavList>
            <NavItem>
              <NavLink to="/resources">All Resources</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/favorites">Saved Favorites</NavLink>
            </NavItem>
          </NavList>
        </NavSection>
        
        <NavSection>
          <SectionTitle>Settings</SectionTitle>
          <NavList>
            <NavItem>
              <NavLink to="/profile">Profile</NavLink>
            </NavItem>
          </NavList>
        </NavSection>
      </SidebarContainer>
      
      <ToggleButton 
        id="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        ☰
      </ToggleButton>
    </>
  );
};

export default Sidebar;
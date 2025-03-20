import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

// Import icons - you'll need to install these packages
// npm install react-icons
import { 
  RiDashboardLine, 
  RiMessage3Line, 
  RiMindMap, 
  RiBookmarkLine,
  RiEmotionLine,
  RiHeartLine,
  RiSettings4Line, 
  RiUser3Line,
  RiCloseCircleLine,
  RiMenuLine,
  RiMenuFoldLine
} from 'react-icons/ri';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const SidebarContainer = styled.aside`
  width: 260px;
  height: 100vh;
  background: ${({ theme }) => `linear-gradient(180deg, ${theme.colors.foreground} 0%, ${theme.colors.cardBackgroundAlt} 100%)`};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow-y: auto;
  position: sticky;
  top: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.cardBorder};
  animation: ${slideInLeft} 0.6s ease-out;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scrollThumb};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.fixed};
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-300px')};
    box-shadow: ${({ $isOpen, theme }) => $isOpen ? theme.boxShadow.xl : 'none'};
    backdrop-filter: blur(${({ theme }) => theme.blur.md});
  }
`;

const SidebarHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.divider}80`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.primaryLight}10 0%, ${theme.colors.primary}10 100%)`};
`;

const SidebarTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  animation: ${fadeIn} 0.8s ease-out;
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight};
  transition: ${({ theme }) => theme.transitions.default};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
    color: ${({ theme }) => theme.colors.primary};
    transform: rotate(90deg);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    font-size: 1.2rem;
  }
`;

const NavSection = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${({ $index }) => `${0.1 + $index * 0.1}s`};
`;

const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  padding: ${({ theme }) => `0 ${theme.spacing.lg} ${theme.spacing.xs}`};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  opacity: 0;
  animation: ${slideUp} 0.3s ease-out forwards;
  animation-delay: ${({ $index }) => `${0.2 + $index * 0.05}s`};
`;

const NavLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: ${({ theme }) => theme.colors.primaryGradient};
    border-radius: 0 ${({ theme }) => theme.borderRadius.full} ${({ theme }) => theme.borderRadius.full} 0;
    opacity: 0;
    transform: translateX(-4px);
    transition: all 0.3s ease;
  }
  
  .icon {
    margin-right: ${({ theme }) => theme.spacing.sm};
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.textLight};
    transition: ${({ theme }) => theme.transitions.default};
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `linear-gradient(90deg, ${theme.colors.primaryLight}15 0%, transparent 100%)`};
    transform: translateX(5px);
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    
    &:before {
      opacity: 1;
      transform: translateX(0);
    }
    
    .icon {
      color: ${({ theme }) => theme.colors.primary};
      animation: ${pulse} 2s infinite;
    }
  }
  
  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}05`};
    transform: translateX(5px);
    
    .icon {
      color: ${({ theme }) => theme.colors.primary};
      transform: scale(1.1);
    }
  }
`;

const ToggleButton = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primaryGradient};
  color: white;
  border: none;
  cursor: pointer;
  z-index: ${({ theme }) => theme.zIndex.fixed};
  box-shadow: ${({ theme }) => theme.boxShadow.coloredMd};
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 20px rgba(138, 43, 226, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

// Get icon component by name
const getIcon = (name) => {
  switch (name) {
    case 'dashboard': return <RiDashboardLine className="icon" />;
    case 'chat': return <RiMessage3Line className="icon" />;
    case 'mindfulness': return <RiMindMap className="icon" />;
    case 'techniques': return <RiBookmarkLine className="icon" />;
    case 'mood': return <RiEmotionLine className="icon" />;
    case 'resources': return <RiHeartLine className="icon" />;
    case 'favorites': return <RiBookmarkLine className="icon" />;
    case 'profile': return <RiUser3Line className="icon" />;
    default: return null;
  }
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Define navigation items
  const navItems = [
    {
      section: 'Main',
      items: [
        { name: 'Overview', path: '/dashboard', icon: 'dashboard' },
        { name: 'Chat', path: '/chat', icon: 'chat' }
      ]
    },
    {
      section: 'Wellness Tools',
      items: [
        { name: 'Mindfulness Exercises', path: '/exercises', icon: 'mindfulness' },
        { name: 'Coping Techniques', path: '/techniques', icon: 'techniques' },
        { name: 'Mood Tracker', path: '/mood-tracker', icon: 'mood' }
      ]
    },
    {
      section: 'Resources',
      items: [
        { name: 'All Resources', path: '/resources', icon: 'resources' },
        { name: 'Saved Favorites', path: '/favorites', icon: 'favorites' }
      ]
    },
    {
      section: 'Settings',
      items: [
        { name: 'Profile', path: '/profile', icon: 'profile' }
      ]
    }
  ];
  
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
          <SidebarTitle>Wellness Hub</SidebarTitle>
          <CloseButton onClick={() => setIsOpen(false)}>
            <RiCloseCircleLine size={22} />
          </CloseButton>
        </SidebarHeader>
        
        {navItems.map((section, sectionIndex) => (
          <NavSection key={section.section} $index={sectionIndex}>
            <SectionTitle>{section.section}</SectionTitle>
            <NavList>
              {section.items.map((item, itemIndex) => (
                <NavItem key={item.path} $index={itemIndex}>
                  <NavLink to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
                    {getIcon(item.icon)}
                    {item.name}
                  </NavLink>
                </NavItem>
              ))}
            </NavList>
          </NavSection>
        ))}
      </SidebarContainer>
      
      <ToggleButton 
        id="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <RiMenuFoldLine /> : <RiMenuLine />}
      </ToggleButton>
    </>
  );
};

export default Sidebar;
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../common/Button';

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.foreground};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.foreground};
  z-index: ${({ theme }) => theme.zIndex.modal};
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  transition: ${({ theme }) => theme.transitions.short};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const UserName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.foreground};
  min-width: 180px;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  z-index: 1;
  display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.short};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  transition: ${({ theme }) => theme.transitions.short};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setUserDropdownOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleResourcesDropdown = () => {
    setResourcesDropdownOpen(!resourcesDropdownOpen);
    setUserDropdownOpen(false);
  };
  
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    setResourcesDropdownOpen(false);
  };
  
  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (resourcesDropdownOpen || userDropdownOpen) {
        // Check if click was outside the dropdown
        if (!event.target.closest('.dropdown-toggle')) {
          setResourcesDropdownOpen(false);
          setUserDropdownOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [resourcesDropdownOpen, userDropdownOpen]);
  
  return (
    <NavbarContainer>
      <Logo to="/">Mental Wellness</Logo>
      
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        
        <Dropdown>
          <DropdownToggle 
            className="dropdown-toggle"
            onClick={toggleResourcesDropdown}
          >
            Resources ▾
          </DropdownToggle>
          <DropdownMenu $isOpen={resourcesDropdownOpen}>
            <DropdownItem to="/resources">All Resources</DropdownItem>
            <DropdownItem to="/exercises">Mindfulness Exercises</DropdownItem>
            <DropdownItem to="/techniques">Coping Techniques</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/chat">Chat</NavLink>
            
            <UserSection>
              <Dropdown>
                <DropdownToggle 
                  className="dropdown-toggle" 
                  onClick={toggleUserDropdown}
                >
                  {user?.name} ▾
                </DropdownToggle>
                <DropdownMenu $isOpen={userDropdownOpen}>
                  <DropdownItem to="/profile">Profile</DropdownItem>
                  <DropdownItem to="/mood-tracker">Mood Tracker</DropdownItem>
                  <DropdownItem to="/favorites">Saved Favorites</DropdownItem>
                  <DropdownButton onClick={handleLogout}>
                    Logout
                  </DropdownButton>
                </DropdownMenu>
              </Dropdown>
            </UserSection>
          </>
        ) : (
          <>
            <Button variant="outline" size="small" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button size="small" onClick={() => navigate('/register')}>
              Sign Up
            </Button>
          </>
        )}
      </NavLinks>
      
      <MobileMenuButton onClick={toggleMobileMenu}>
        ☰
      </MobileMenuButton>
      
      <MobileMenu $isOpen={mobileMenuOpen}>
        <MobileMenuHeader>
          <Logo to="/">Mental Wellness</Logo>
          <MobileMenuButton onClick={toggleMobileMenu}>✕</MobileMenuButton>
        </MobileMenuHeader>
        
        <MobileMenuLinks>
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/resources" onClick={() => setMobileMenuOpen(false)}>Resources</NavLink>
          <NavLink to="/exercises" onClick={() => setMobileMenuOpen(false)}>Mindfulness Exercises</NavLink>
          <NavLink to="/techniques" onClick={() => setMobileMenuOpen(false)}>Coping Techniques</NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>
              <NavLink to="/chat" onClick={() => setMobileMenuOpen(false)}>Chat</NavLink>
              <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</NavLink>
              <Button 
                variant="outline" 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button 
                onClick={() => {
                  navigate('/register');
                  setMobileMenuOpen(false);
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </MobileMenuLinks>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;
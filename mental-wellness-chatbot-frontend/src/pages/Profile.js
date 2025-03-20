import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import useApi from '../hooks/useApi';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ProfileSection = styled.section`
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.headings};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const PreferenceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const PreferenceCard = styled.div`
  border: 1px solid ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.short};
  background-color: ${({ theme, active }) => 
    active ? `${theme.colors.primary}10` : theme.colors.background};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const PreferenceTitle = styled.h4`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const PreferenceDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const ThemeSelect = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ThemeOption = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme, selected }) => 
    selected ? `0 0 0 2px ${theme.colors.primary}` : theme.boxShadow.sm};
  
  &:hover {
    box-shadow: ${({ theme, selected }) => 
      selected ? `0 0 0 2px ${theme.colors.primary}` : theme.boxShadow.md};
  }
`;

const SuccessMessage = styled.div`
  background-color: ${({ theme }) => `${theme.colors.success}15`};
  color: ${({ theme }) => theme.colors.success};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => `${theme.colors.error}15`};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Profile = () => {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const { loading, error: apiError, updateProfile: apiUpdateProfile } = useApi();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [preferences, setPreferences] = useState({
    theme: 'light',
    notificationsEnabled: true,
    contentPreferences: {
      quotes: true,
      exercises: true,
      techniques: true,
    },
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
      });
      
      if (user.preferences) {
        setPreferences(user.preferences);
      }
    }
  }, [user]);
  
  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear error
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: null,
      });
    }
  };
  
  // Toggle preference
  const togglePreference = (type, value) => {
    if (type === 'contentPreferences') {
      setPreferences({
        ...preferences,
        contentPreferences: {
          ...preferences.contentPreferences,
          [value]: !preferences.contentPreferences[value],
        },
      });
    } else {
      setPreferences({
        ...preferences,
        [type]: value,
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Only validate password if provided (for updates)
    if (formData.password) {
      if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      
      if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (validateForm()) {
      // Remove confirmPassword and empty password if not provided
      const userData = { ...formData };
      delete userData.confirmPassword;
      
      if (!userData.password) {
        delete userData.password;
      }
      
      // Add preferences
      userData.preferences = preferences;
      
      const success = await updateProfile(userData);
      
      if (success) {
        setSuccessMessage('Profile updated successfully!');
        // Clear passwords
        setFormData({
          ...formData,
          password: '',
          confirmPassword: '',
        });
      }
    }
  };
  
  if (loading && !user) {
    return (
      <Layout>
        <LoadingSpinner fullScreen text="Loading profile..." />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <ProfileContainer>
        <ProfileSection>
          <SectionTitle>Profile Settings</SectionTitle>
          
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                id="name"
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Input
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Input
                id="password"
                name="password"
                label="Password (leave blank to keep current)"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
              />
            </FormGroup>
            
            <FormGroup>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword}
                disabled={!formData.password}
              />
            </FormGroup>
            
            <ButtonGroup>
              <Button type="submit" isLoading={loading}>
                Update Profile
              </Button>
            </ButtonGroup>
          </form>
        </ProfileSection>
        
        <ProfileSection>
          <SectionTitle>Preferences</SectionTitle>
          
          <FormGroup>
            <h3>Theme</h3>
            <ThemeSelect>
              <ThemeOption 
                selected={preferences.theme === 'light'}
                onClick={() => togglePreference('theme', 'light')}
                style={{ background: 'white', color: '#1f2937' }}
              >
                Light
              </ThemeOption>
              <ThemeOption 
                selected={preferences.theme === 'dark'}
                onClick={() => togglePreference('theme', 'dark')}
                style={{ background: '#1f2937', color: 'white' }}
              >
                Dark
              </ThemeOption>
            </ThemeSelect>
          </FormGroup>
          
          <FormGroup>
            <h3>Notifications</h3>
            <ButtonGroup>
              <Button 
                variant={preferences.notificationsEnabled ? 'primary' : 'outline'}
                onClick={() => togglePreference('notificationsEnabled', true)}
              >
                Enabled
              </Button>
              <Button 
                variant={!preferences.notificationsEnabled ? 'primary' : 'outline'}
                onClick={() => togglePreference('notificationsEnabled', false)}
              >
                Disabled
              </Button>
            </ButtonGroup>
          </FormGroup>
          
          <FormGroup>
            <h3>Content Types</h3>
            <p>Select the types of content you'd like to receive:</p>
            
            <PreferenceGrid>
              <PreferenceCard 
                active={preferences.contentPreferences.quotes}
                onClick={() => togglePreference('contentPreferences', 'quotes')}
              >
                <PreferenceTitle>Quotes</PreferenceTitle>
                <PreferenceDescription>
                  Inspirational and motivational quotes
                </PreferenceDescription>
              </PreferenceCard>
              
              <PreferenceCard 
                active={preferences.contentPreferences.exercises}
                onClick={() => togglePreference('contentPreferences', 'exercises')}
              >
                <PreferenceTitle>Exercises</PreferenceTitle>
                <PreferenceDescription>
                  Guided mental wellness exercises
                </PreferenceDescription>
              </PreferenceCard>
              
              <PreferenceCard 
                active={preferences.contentPreferences.techniques}
                onClick={() => togglePreference('contentPreferences', 'techniques')}
              >
                <PreferenceTitle>Techniques</PreferenceTitle>
                <PreferenceDescription>
                  Coping and relaxation techniques
                </PreferenceDescription>
              </PreferenceCard>
            </PreferenceGrid>
          </FormGroup>
          
          <Button onClick={handleSubmit} isLoading={loading}>
            Save Preferences
          </Button>
        </ProfileSection>
        
        <ProfileSection>
          <SectionTitle>Account</SectionTitle>
          
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </ProfileSection>
      </ProfileContainer>
    </Layout>
  );
};

export default Profile;
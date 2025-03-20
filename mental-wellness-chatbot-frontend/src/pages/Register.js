import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryLight});
`;

const RegisterCard = styled.div`
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 450px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RegisterTitle = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.headings};
`;

const FormError = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => `${theme.colors.error}15`};
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FormFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const PrivacyText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const LoginLink = styled(Link)`
  margin-top: ${({ theme }) => theme.spacing.md};
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const { register, isAuthenticated, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user types
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: null
      });
    }
  };
  
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
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = formData;
      
      const success = await register(userData);
      
      if (success) {
        navigate('/dashboard');
      }
    }
  };
  
  return (
    <RegisterContainer>
      <RegisterCard>
        <LogoContainer>
          <Logo to="/">Mental Wellness</Logo>
        </LogoContainer>
        
        <RegisterTitle>Create Account</RegisterTitle>
        
        {error && <FormError>{error}</FormError>}
        
        <RegisterForm onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              id="name"
              name="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
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
              type="email"
              label="Email"
              placeholder="Enter your email"
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
              type="password"
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={formErrors.confirmPassword}
              required
            />
          </FormGroup>
          
          <Button 
            type="submit" 
            fullWidth 
            isLoading={loading}
          >
            Create Account
          </Button>
          
          <PrivacyText>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </PrivacyText>
          
          <FormFooter>
            <LoginLink to="/login">
              Already have an account? Login
            </LoginLink>
          </FormFooter>
        </RegisterForm>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
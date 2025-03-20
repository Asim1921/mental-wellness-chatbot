import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryLight});
`;

const LoginCard = styled.div`
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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LoginTitle = styled.h1`
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

const CreateAccountLink = styled(Link)`
  margin-top: ${({ theme }) => theme.spacing.md};
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const { login, isAuthenticated, error, loading } = useContext(AuthContext);
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
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const success = await login(formData);
      
      if (success) {
        navigate('/dashboard');
      }
    }
  };
  
  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <Logo to="/">Mental Wellness</Logo>
        </LogoContainer>
        
        <LoginTitle>Welcome Back</LoginTitle>
        
        {error && <FormError>{error}</FormError>}
        
        <LoginForm onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              required
            />
          </FormGroup>
          
          <Button 
            type="submit" 
            fullWidth 
            isLoading={loading}
          >
            Login
          </Button>
          
          <FormFooter>
            <CreateAccountLink to="/register">
              Don't have an account? Sign Up
            </CreateAccountLink>
          </FormFooter>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
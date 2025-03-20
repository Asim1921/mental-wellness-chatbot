import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on first render
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Set auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Fetch user profile
        console.log('Checking authentication with stored token...');
        const res = await axios.get(`${API_URL}/users/profile`);
        console.log('Auth check response:', res.data);
        
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (err) {
        console.error('Auth check failed:', err);
        
        // More detailed error logging
        if (err.response) {
          console.error('Error data:', err.response.data);
          console.error('Error status:', err.response.status);
        }
        
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Register user with detailed logging
  const register = async (userData) => {
    setError(null);
    try {
      console.log('Registering user with data:', { ...userData, password: '[FILTERED]' });
      const res = await axios.post(`${API_URL}/users`, userData);
      console.log('Registration response:', res.data);
      
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setUser(res.data);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Registration failed:', err);
      
      // More detailed error logging
      if (err.response) {
        console.error('Error data:', err.response.data);
        console.error('Error status:', err.response.status);
        setError(err.response.data.message || 'Registration failed');
      } else if (err.request) {
        console.error('No response received:', err.request);
        setError('No response from server. Please check your connection.');
      } else {
        console.error('Error:', err.message);
        setError(err.message || 'Registration failed');
      }
      
      return false;
    }
  };

  // Login user with detailed logging
  const login = async (userData) => {
    setError(null);
    try {
      console.log('Logging in user:', userData.email);
      const res = await axios.post(`${API_URL}/users/login`, userData);
      console.log('Login response:', res.data);
      
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setUser(res.data);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      
      // More detailed error logging
      if (err.response) {
        console.error('Error data:', err.response.data);
        console.error('Error status:', err.response.status);
        setError(err.response.data.message || 'Invalid email or password');
      } else if (err.request) {
        console.error('No response received:', err.request);
        setError('No response from server. Please check your connection.');
      } else {
        console.error('Error:', err.message);
        setError(err.message || 'Login failed');
      }
      
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setError(null);
    try {
      console.log('Updating profile with data:', { ...userData, password: userData.password ? '[FILTERED]' : undefined });
      const res = await axios.put(`${API_URL}/users/profile`, userData);
      console.log('Profile update response:', res.data);
      
      // If token is returned, update it
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }
      
      setUser(res.data);
      return true;
    } catch (err) {
      console.error('Profile update failed:', err);
      
      // More detailed error logging
      if (err.response) {
        console.error('Error data:', err.response.data);
        console.error('Error status:', err.response.status);
        setError(err.response.data.message || 'Profile update failed');
      } else if (err.request) {
        console.error('No response received:', err.request);
        setError('No response from server. Please check your connection.');
      } else {
        console.error('Error:', err.message);
        setError(err.message || 'Profile update failed');
      }
      
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
import { useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Configure axios with token in header if available
  const setupAxios = useCallback(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    return axios;
  }, []);
  
  // Generic API request function with better error logging
  const apiRequest = useCallback(async (method, endpoint, data = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const axiosInstance = setupAxios();
      const url = `${API_URL}${endpoint}`;
      
      console.log(`Making ${method.toUpperCase()} request to: ${url}`);
      if (data) {
        console.log('Request data:', data);
      }
      
      let response;
      
      switch (method.toLowerCase()) {
        case 'get':
          response = await axiosInstance.get(url);
          break;
        case 'post':
          response = await axiosInstance.post(url, data);
          break;
        case 'put':
          response = await axiosInstance.put(url, data);
          break;
        case 'delete':
          response = await axiosInstance.delete(url);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      
      console.log('Response:', response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      console.error('API Error:', err);
      
      // More detailed error logging
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', err.response.data);
        console.error('Error status:', err.response.status);
        console.error('Error headers:', err.response.headers);
        
        const errorMessage = err.response.data.message || 
                             err.response.data.error || 
                             'Server error occurred';
        setError(errorMessage);
        return { error: errorMessage };
      } else if (err.request) {
        // The request was made but no response was received
        console.error('Error request:', err.request);
        setError('No response from server. Please check your connection.');
        return { error: 'No response from server' };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', err.message);
        setError(err.message || 'Something went wrong');
        return { error: err.message };
      }
    }
  }, [setupAxios]);
  
  // Specific API methods
  const get = useCallback((endpoint) => {
    return apiRequest('get', endpoint);
  }, [apiRequest]);
  
  const post = useCallback((endpoint, data) => {
    return apiRequest('post', endpoint, data);
  }, [apiRequest]);
  
  const put = useCallback((endpoint, data) => {
    return apiRequest('put', endpoint, data);
  }, [apiRequest]);
  
  const del = useCallback((endpoint) => {
    return apiRequest('delete', endpoint);
  }, [apiRequest]);
  
  // Get wellness content
  const getWellnessContent = useCallback((type = null, tags = null, page = 1, limit = 10) => {
    let endpoint = '/content?';
    
    if (type) {
      endpoint += `contentType=${type}&`;
    }
    
    if (tags) {
      // Convert tags array to comma-separated string
      const tagsString = Array.isArray(tags) ? tags.join(',') : tags;
      endpoint += `tags=${tagsString}&`;
    }
    
    endpoint += `page=${page}&limit=${limit}`;
    
    return get(endpoint);
  }, [get]);
  
  // Send chat message
  const sendMessage = useCallback((message, sessionId) => {
    return post('/chat', { message, sessionId });
  }, [post]);
  
  // Get chat history
  const getChatHistory = useCallback((page = 1, limit = 10) => {
    return get(`/chat/history?page=${page}&limit=${limit}`);
  }, [get]);
  
  // Get chat session
  const getChatSession = useCallback((sessionId) => {
    return get(`/chat/${sessionId}`);
  }, [get]);
  
  // Add chat feedback
  const addChatFeedback = useCallback((sessionId, feedback) => {
    return post(`/chat/${sessionId}/feedback`, feedback);
  }, [post]);
  
  // Get mood history
  const getMoodHistory = useCallback(() => {
    return get('/users/mood');
  }, [get]);
  
  // Add mood entry
  const addMoodEntry = useCallback((moodData) => {
    return post('/users/mood', moodData);
  }, [post]);
  
  // Update user profile
  const updateProfile = useCallback((profileData) => {
    return put('/users/profile', profileData);
  }, [put]);
  
  return {
    loading,
    error,
    get,
    post,
    put,
    del,
    getWellnessContent,
    sendMessage,
    getChatHistory,
    getChatSession,
    addChatFeedback,
    getMoodHistory,
    addMoodEntry,
    updateProfile,
  };
};

export default useApi;
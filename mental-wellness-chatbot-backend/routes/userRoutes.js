const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile,
  addMoodEntry,
  getMoodHistory 
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Mood tracking routes
router.post('/mood', protect, addMoodEntry);
router.get('/mood', protect, getMoodHistory);

module.exports = router;
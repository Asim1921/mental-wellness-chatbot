const express = require('express');
const router = express.Router();
const { 
  processMessage, 
  getChatHistory, 
  getChatSession, 
  addChatFeedback 
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

// Protect all chat routes
router.use(protect);

// Process a chat message
router.post('/', processMessage);

// Get chat history for user
router.get('/history', getChatHistory);

// Get specific chat session
router.get('/:sessionId', getChatSession);

// Add feedback to a chat session
router.post('/:sessionId/feedback', addChatFeedback);

module.exports = router;
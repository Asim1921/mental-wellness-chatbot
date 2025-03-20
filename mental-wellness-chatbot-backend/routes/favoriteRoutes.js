const express = require('express');
const router = express.Router();
const { 
  getUserFavorites,
  addFavorite,
  removeFavorite,
  updateFavoriteNotes,
  checkFavorite
} = require('../controllers/favoriteController');
const { protect } = require('../middleware/auth');

// Protect all favorite routes
router.use(protect);

// Get all favorites
router.get('/', getUserFavorites);

// Add to favorites
router.post('/', addFavorite);

// Check if content is in favorites
router.get('/check/:contentId', checkFavorite);

// Update favorite notes
router.put('/:id', updateFavoriteNotes);

// Remove from favorites
router.delete('/:id', removeFavorite);

module.exports = router;
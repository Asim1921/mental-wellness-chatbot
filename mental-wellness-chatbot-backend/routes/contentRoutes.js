const express = require('express');
const router = express.Router();
const { 
  getContent, 
  getContentById, 
  createContent, 
  updateContent, 
  deleteContent,
  getEmergencyResources,
  getExercisesByDifficulty,
  getTechniquesByTag
} = require('../controllers/contentController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getContent);
router.get('/emergency', getEmergencyResources);
router.get('/exercises', getExercisesByDifficulty);
router.get('/techniques', getTechniquesByTag);
router.get('/:id', getContentById);

// Admin only routes
router.post('/', protect, admin, createContent);
router.put('/:id', protect, admin, updateContent);
router.delete('/:id', protect, admin, deleteContent);

module.exports = router;
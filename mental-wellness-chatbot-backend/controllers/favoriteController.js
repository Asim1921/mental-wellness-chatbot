const Favorite = require('../models/Favorite');
const { WellnessContent, Quote, Exercise, Technique, Resource, ContentTag } = require('../models/WellnessContent');

/**
 * @desc    Get user favorites
 * @route   GET /api/favorites
 * @access  Private
 */
const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user favorites with content details
    const favorites = await Favorite.findAll({
      where: { userId },
      include: [
        {
          model: WellnessContent,
          include: [
            { model: ContentTag, as: 'tags' },
            { model: Quote, as: 'quote', required: false },
            { model: Exercise, as: 'exercise', required: false },
            { model: Technique, as: 'technique', required: false },
            { model: Resource, as: 'resource', required: false }
          ]
        }
      ],
      order: [['updatedAt', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites
    });
  } catch (error) {
    console.error('Error in getUserFavorites:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Add content to favorites
 * @route   POST /api/favorites
 * @access  Private
 */
const addFavorite = async (req, res) => {
  try {
    const { contentId, notes } = req.body;
    const userId = req.user.id;
    
    if (!contentId) {
      return res.status(400).json({
        success: false,
        message: 'Content ID is required'
      });
    }
    
    // Check if content exists
    const content = await WellnessContent.findByPk(contentId);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      where: { userId, contentId }
    });
    
    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Content already in favorites'
      });
    }
    
    // Add to favorites
    const favorite = await Favorite.create({
      userId,
      contentId,
      notes: notes || null
    });
    
    res.status(201).json({
      success: true,
      data: favorite
    });
  } catch (error) {
    console.error('Error in addFavorite:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Remove content from favorites
 * @route   DELETE /api/favorites/:id
 * @access  Private
 */
const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Check if favorite exists and belongs to user
    const favorite = await Favorite.findOne({
      where: { id, userId }
    });
    
    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }
    
    // Remove from favorites
    await favorite.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Removed from favorites'
    });
  } catch (error) {
    console.error('Error in removeFavorite:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Update favorite notes
 * @route   PUT /api/favorites/:id
 * @access  Private
 */
const updateFavoriteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const userId = req.user.id;
    
    // Check if favorite exists and belongs to user
    const favorite = await Favorite.findOne({
      where: { id, userId }
    });
    
    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }
    
    // Update notes
    favorite.notes = notes;
    await favorite.save();
    
    res.status(200).json({
      success: true,
      data: favorite
    });
  } catch (error) {
    console.error('Error in updateFavoriteNotes:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Check if content is in favorites
 * @route   GET /api/favorites/check/:contentId
 * @access  Private
 */
const checkFavorite = async (req, res) => {
  try {
    const { contentId } = req.params;
    const userId = req.user.id;
    
    // Check if in favorites
    const favorite = await Favorite.findOne({
      where: { userId, contentId }
    });
    
    res.status(200).json({
      success: true,
      isFavorite: !!favorite,
      favorite: favorite || null
    });
  } catch (error) {
    console.error('Error in checkFavorite:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getUserFavorites,
  addFavorite,
  removeFavorite,
  updateFavoriteNotes,
  checkFavorite
};
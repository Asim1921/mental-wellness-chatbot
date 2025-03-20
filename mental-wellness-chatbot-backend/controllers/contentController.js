const { WellnessContent, Quote, Exercise, Technique, Resource, ContentTag } = require('../models/WellnessContent');
const { Op } = require('sequelize');
const sequelize = require('../config/database'); // Make sure to import sequelize

/**
 * @desc    Get content by type and tags
 * @route   GET /api/content
 * @access  Public
 */
const getContent = async (req, res) => {
  try {
    const { contentType, tags, difficulty, limit = 10, page = 1 } = req.query;
    
    // Build query object
    let query = { active: true };
    
    if (contentType) {
      query.contentType = contentType;
    }
    
    // Build include array for joins
    const includes = [];
    
    // Include tags for filtering
    if (tags) {
      // Convert tags string to array
      const tagsArray = tags.split(',').map(tag => tag.trim());
      
      includes.push({
        model: ContentTag,
        as: 'tags',
        where: {
          tag: {
            [Op.in]: tagsArray
          }
        }
      });
    } else {
      // Include tags without filtering
      includes.push({
        model: ContentTag,
        as: 'tags'
      });
    }
    
    // Include type-specific models based on contentType
    if (contentType === 'quote') {
      includes.push({
        model: Quote,
        as: 'quote'
      });
    } else if (contentType === 'exercise') {
      // Add specific exercise inclusions
      const exerciseInclude = {
        model: Exercise,
        as: 'exercise',
      };
      
      // Add difficulty filter if provided
      if (difficulty) {
        exerciseInclude.where = {
          difficulty
        };
      }
      
      includes.push(exerciseInclude);
    } else if (contentType === 'technique') {
      includes.push({
        model: Technique,
        as: 'technique'
      });
    } else if (contentType === 'resource') {
      includes.push({
        model: Resource,
        as: 'resource'
      });
    } else {
      // Include all types if no specific type is requested
      includes.push(
        {
          model: Quote,
          as: 'quote',
          required: false
        },
        {
          model: Exercise,
          as: 'exercise',
          required: false
        },
        {
          model: Technique,
          as: 'technique',
          required: false
        },
        {
          model: Resource,
          as: 'resource',
          required: false
        }
      );
    }
    
    // Execute query with pagination
    const content = await WellnessContent.findAll({
      where: query,
      include: includes,
      order: [['updatedAt', 'DESC']],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    });
    
    // Get total count for pagination
    const count = await WellnessContent.count({
      where: query,
      include: includes.filter(inc => inc.where), // Only include where clauses for count
    });
    
    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      data: content,
    });
  } catch (error) {
    console.error('Error in getContent:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get content by ID
 * @route   GET /api/content/:id
 * @access  Public
 */
const getContentById = async (req, res) => {
  try {
    const content = await WellnessContent.findByPk(req.params.id, {
      include: [
        {
          model: ContentTag,
          as: 'tags'
        },
        {
          model: Quote,
          as: 'quote',
          required: false
        },
        {
          model: Exercise,
          as: 'exercise',
          required: false
        },
        {
          model: Technique,
          as: 'technique',
          required: false
        },
        {
          model: Resource,
          as: 'resource',
          required: false
        }
      ]
    });
    
    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }
    
    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Create new content (admin only)
 * @route   POST /api/content
 * @access  Private/Admin
 */
const createContent = async (req, res) => {
  try {
    const { contentType, tags } = req.body;
    
    if (!contentType) {
      res.status(400);
      throw new Error('Content type is required');
    }
    
    // Begin transaction
    const result = await sequelize.transaction(async (t) => {
      // Create base content
      const content = await WellnessContent.create({
        contentType,
        createdBy: req.user.id,
        active: true
      }, { transaction: t });
      
      // Create specific content based on type
      let specificContent;
      
      switch (contentType) {
        case 'quote':
          specificContent = await Quote.create({
            contentId: content.id,
            text: req.body.text,
            author: req.body.author || 'Unknown',
            source: req.body.source
          }, { transaction: t });
          break;
        case 'exercise':
          specificContent = await Exercise.create({
            contentId: content.id,
            title: req.body.title,
            description: req.body.description,
            steps: req.body.steps || [],
            duration: req.body.duration || 5,
            difficulty: req.body.difficulty || 'beginner'
          }, { transaction: t });
          break;
        case 'technique':
          specificContent = await Technique.create({
            contentId: content.id,
            title: req.body.title,
            description: req.body.description,
            instructions: req.body.instructions,
            benefits: req.body.benefits || [],
            contraindications: req.body.contraindications || []
          }, { transaction: t });
          break;
        case 'resource':
          specificContent = await Resource.create({
            contentId: content.id,
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            resourceType: req.body.resourceType,
            isEmergency: req.body.isEmergency || false
          }, { transaction: t });
          break;
        default:
          throw new Error('Invalid content type');
      }
      
      // Add tags if provided
      if (tags && Array.isArray(tags)) {
        const contentTags = tags.map(tag => ({
          contentId: content.id,
          tag
        }));
        
        await ContentTag.bulkCreate(contentTags, { transaction: t });
      }
      
      return { content, specificContent };
    });
    
    res.status(201).json({
      success: true,
      data: result.content,
    });
  } catch (error) {
    console.error('Error in createContent:', error);
    res.status(error.status || 400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update content (admin only)
 * @route   PUT /api/content/:id
 * @access  Private/Admin
 */
const updateContent = async (req, res) => {
  try {
    const content = await WellnessContent.findByPk(req.params.id);
    
    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }
    
    // Remove contentType from updates - can't change the type
    const { contentType, tags, ...updates } = req.body;
    
    // Begin transaction
    const result = await sequelize.transaction(async (t) => {
      // Update base content
      content.active = updates.active !== undefined ? updates.active : content.active;
      await content.save({ transaction: t });
      
      // Update specific content based on type
      switch (content.contentType) {
        case 'quote':
          if (updates.text || updates.author || updates.source) {
            const quote = await Quote.findOne({ where: { contentId: content.id } });
            if (quote) {
              quote.text = updates.text || quote.text;
              quote.author = updates.author || quote.author;
              quote.source = updates.source || quote.source;
              await quote.save({ transaction: t });
            }
          }
          break;
        case 'exercise':
          if (updates.title || updates.description || updates.steps || updates.duration || updates.difficulty) {
            const exercise = await Exercise.findOne({ where: { contentId: content.id } });
            if (exercise) {
              exercise.title = updates.title || exercise.title;
              exercise.description = updates.description || exercise.description;
              exercise.steps = updates.steps || exercise.steps;
              exercise.duration = updates.duration || exercise.duration;
              exercise.difficulty = updates.difficulty || exercise.difficulty;
              await exercise.save({ transaction: t });
            }
          }
          break;
        case 'technique':
          if (updates.title || updates.description || updates.instructions || updates.benefits || updates.contraindications) {
            const technique = await Technique.findOne({ where: { contentId: content.id } });
            if (technique) {
              technique.title = updates.title || technique.title;
              technique.description = updates.description || technique.description;
              technique.instructions = updates.instructions || technique.instructions;
              technique.benefits = updates.benefits || technique.benefits;
              technique.contraindications = updates.contraindications || technique.contraindications;
              await technique.save({ transaction: t });
            }
          }
          break;
        case 'resource':
          if (updates.title || updates.description || updates.url || updates.resourceType || updates.isEmergency !== undefined) {
            const resource = await Resource.findOne({ where: { contentId: content.id } });
            if (resource) {
              resource.title = updates.title || resource.title;
              resource.description = updates.description || resource.description;
              resource.url = updates.url || resource.url;
              resource.resourceType = updates.resourceType || resource.resourceType;
              resource.isEmergency = updates.isEmergency !== undefined ? updates.isEmergency : resource.isEmergency;
              await resource.save({ transaction: t });
            }
          }
          break;
      }
      
      // Update tags if provided
      if (tags && Array.isArray(tags)) {
        // Remove existing tags
        await ContentTag.destroy({
          where: { contentId: content.id },
          transaction: t
        });
        
        // Add new tags
        const contentTags = tags.map(tag => ({
          contentId: content.id,
          tag
        }));
        
        await ContentTag.bulkCreate(contentTags, { transaction: t });
      }
      
      return content;
    });
    
    // Get updated content with associations
    const updatedContent = await WellnessContent.findByPk(req.params.id, {
      include: [
        {
          model: ContentTag,
          as: 'tags'
        },
        {
          model: Quote,
          as: 'quote',
          required: false
        },
        {
          model: Exercise,
          as: 'exercise',
          required: false
        },
        {
          model: Technique,
          as: 'technique',
          required: false
        },
        {
          model: Resource,
          as: 'resource',
          required: false
        }
      ]
    });
    
    res.status(200).json({
      success: true,
      data: updatedContent,
    });
  } catch (error) {
    console.error('Error in updateContent:', error);
    res.status(error.status || 400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete content (admin only)
 * @route   DELETE /api/content/:id
 * @access  Private/Admin
 */
const deleteContent = async (req, res) => {
  try {
    const content = await WellnessContent.findByPk(req.params.id);
    
    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }
    
    // Soft delete - just mark as inactive
    content.active = false;
    await content.save();
    
    res.status(200).json({
      success: true,
      message: 'Content removed',
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get emergency resources
 * @route   GET /api/content/emergency
 * @access  Public
 */
const getEmergencyResources = async (req, res) => {
  try {
    const resources = await WellnessContent.findAll({
      where: {
        contentType: 'resource',
        active: true
      },
      include: [
        {
          model: ContentTag,
          as: 'tags'
        },
        {
          model: Resource,
          as: 'resource',
          where: {
            isEmergency: true
          }
        }
      ]
    });
    
    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    console.error('Error in getEmergencyResources:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get exercises by difficulty
 * @route   GET /api/content/exercises
 * @access  Public
 */
const getExercisesByDifficulty = async (req, res) => {
  try {
    const { difficulty, limit = 10, page = 1 } = req.query;
    
    // Build query for WellnessContent
    const query = { 
      contentType: 'exercise',
      active: true
    };
    
    // Build include for Exercise model
    const exerciseInclude = {
      model: Exercise,
      as: 'exercise',
    };
    
    // Add difficulty filter if provided
    if (difficulty) {
      exerciseInclude.where = {
        difficulty
      };
    }
    
    // Execute query with pagination
    const exercises = await WellnessContent.findAll({
      where: query,
      include: [
        exerciseInclude,
        {
          model: ContentTag,
          as: 'tags'
        }
      ],
      order: [['updatedAt', 'DESC']],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    });
    
    // Get total count for pagination
    const count = await WellnessContent.count({
      where: query,
      include: [
        exerciseInclude
      ]
    });
    
    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      data: exercises,
    });
  } catch (error) {
    console.error('Error in getExercisesByDifficulty:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get techniques by tag
 * @route   GET /api/content/techniques
 * @access  Public
 */
const getTechniquesByTag = async (req, res) => {
  try {
    const { tag, limit = 10, page = 1 } = req.query;
    
    // Build query for WellnessContent
    const query = { 
      contentType: 'technique',
      active: true
    };
    
    // Build includes array
    const includes = [
      {
        model: Technique,
        as: 'technique',
      }
    ];
    
    // Add tag filter if provided
    if (tag) {
      includes.push({
        model: ContentTag,
        as: 'tags',
        where: {
          tag
        }
      });
    } else {
      includes.push({
        model: ContentTag,
        as: 'tags'
      });
    }
    
    // Execute query with pagination
    const techniques = await WellnessContent.findAll({
      where: query,
      include: includes,
      order: [['updatedAt', 'DESC']],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    });
    
    // Get total count for pagination
    const count = await WellnessContent.count({
      where: query,
      include: tag ? [includes[1]] : [] // Only include tag where clause for count if tag provided
    });
    
    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      data: techniques,
    });
  } catch (error) {
    console.error('Error in getTechniquesByTag:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  getEmergencyResources,
  getExercisesByDifficulty,
  getTechniquesByTag
};
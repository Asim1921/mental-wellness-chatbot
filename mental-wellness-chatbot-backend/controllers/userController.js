const jwt = require('jsonwebtoken');
const User = require('../models/User');
const MoodTracking = require('../models/MoodTracking');

/**
 * Generate JWT token with error handling
 */
const generateToken = (id) => {
  // TEMPORARY FIX: Use hardcoded secret until we resolve the env variable issue
  const secret = 'hardcoded_secret_for_testing_jwt_generation_123';
  
  try {
    return jwt.sign({ id }, secret, {
      expiresIn: '30d',
    });
  } catch (error) {
    console.error('Token generation error:', error);
    throw new Error('Could not generate authentication token');
  }
};

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      // Generate token with try-catch
      let token;
      try {
        token = generateToken(user.id);
      } catch (tokenError) {
        console.error('Failed to generate token:', tokenError);
        res.status(500).json({
          success: false,
          message: 'Authentication error'
        });
        return;
      }

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        preferences: user.preferences,
        token,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ where: { email } });

    if (user && (await user.matchPassword(password))) {
      // Generate token with try-catch
      let token;
      try {
        token = generateToken(user.id);
      } catch (tokenError) {
        console.error('Failed to generate token:', tokenError);
        res.status(500).json({
          success: false,
          message: 'Authentication error'
        });
        return;
      }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        preferences: user.preferences,
        token,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = async (req, res) => {
  try {
    // req.user is already set by the protect middleware
    const user = req.user;

    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        preferences: user.preferences,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      // Update preferences if provided
      if (req.body.preferences) {
        user.preferences = {
          ...user.preferences,
          ...req.body.preferences,
        };
      }
      
      // Update password if provided
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      // Generate token with try-catch
      let token;
      try {
        token = generateToken(updatedUser.id);
      } catch (tokenError) {
        console.error('Failed to generate token:', tokenError);
        res.status(500).json({
          success: false,
          message: 'Authentication error'
        });
        return;
      }

      res.json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        preferences: updatedUser.preferences,
        token,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Add a mood tracking entry
 * @route   POST /api/users/mood
 * @access  Private
 */
const addMoodEntry = async (req, res) => {
  try {
    const { mood, note } = req.body;
    
    if (!mood) {
      res.status(400);
      throw new Error('Mood is required');
    }
    
    // Create mood entry
    const moodEntry = await MoodTracking.create({
      userId: req.user.id,
      mood,
      note: note || '',
      date: new Date(),
    });
    
    if (moodEntry) {
      // Get all mood entries for the user
      const moodEntries = await MoodTracking.findAll({
        where: { userId: req.user.id },
        order: [['date', 'DESC']],
      });
      
      res.status(201).json({
        success: true,
        moodTracking: moodEntries,
      });
    } else {
      res.status(400);
      throw new Error('Invalid mood data');
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get mood tracking history
 * @route   GET /api/users/mood
 * @access  Private
 */
const getMoodHistory = async (req, res) => {
  try {
    // Get all mood entries for the user
    const moodEntries = await MoodTracking.findAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']],
    });
    
    res.json({
      success: true,
      moodTracking: moodEntries,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addMoodEntry,
  getMoodHistory,
};
const { sequelize } = require('../config/database');
const User = require('./User');
const MoodTracking = require('./MoodTracking');
const { 
  WellnessContent, 
  Quote, 
  Exercise, 
  Technique, 
  Resource, 
  ContentTag 
} = require('./WellnessContent');
const { ChatSession, ChatMessage } = require('./ChatLog');
const Favorite = require('./Favorite');

// Export all models
module.exports = {
  sequelize,
  User,
  MoodTracking,
  WellnessContent,
  Quote,
  Exercise,
  Technique,
  Resource,
  ContentTag,
  ChatSession,
  ChatMessage,
  Favorite,
  
  // Function to initialize the database
  initializeDatabase: async (force = false) => {
    try {
      // This will create all tables based on models if they don't exist
      // If 'force' is true, it will drop tables first if they exist
      await sequelize.sync({ force });
      console.log('Database synchronized successfully');
      return true;
    } catch (error) {
      console.error('Error synchronizing database:', error);
      return false;
    }
  }
};
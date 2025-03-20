const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const { WellnessContent } = require('./WellnessContent');

// Define ChatSession model
const ChatSession = sequelize.define(
  'ChatSession',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    analysisResults: {
      type: DataTypes.JSON,
      defaultValue: {
        detectedThemes: [],
        emotionalState: 'undefined',
      },
    },
    feedbackHelpful: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    feedbackComments: {
      type: DataTypes.TEXT,
    },
    feedbackTimestamp: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'sessionId'],
      },
    ],
  }
);

// Define ChatMessage model
const ChatMessage = sequelize.define(
  'ChatMessage',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ChatSession,
        key: 'id',
      },
    },
    sender: {
      type: DataTypes.ENUM('user', 'bot'),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    contentType: {
      type: DataTypes.ENUM('quote', 'exercise', 'technique', 'resource', 'general'),
      defaultValue: 'general',
    },
    contentId: {
      type: DataTypes.INTEGER,
      references: {
        model: WellnessContent,
        key: 'id',
      },
      allowNull: true,
    },
    detectedEmotions: {
      type: DataTypes.JSON, // Array of strings stored as JSON
      defaultValue: [],
    },
    flaggedAsCrisis: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    additionalData: {
      type: DataTypes.JSON, // For storing type-specific data
      defaultValue: {},
    },
  },
  {
    timestamps: true,
  }
);

// Define relationships
User.hasMany(ChatSession, { foreignKey: 'userId' });
ChatSession.belongsTo(User, { foreignKey: 'userId' });

ChatSession.hasMany(ChatMessage, { foreignKey: 'sessionId' });
ChatMessage.belongsTo(ChatSession, { foreignKey: 'sessionId' });

WellnessContent.hasMany(ChatMessage, { foreignKey: 'contentId' });
ChatMessage.belongsTo(WellnessContent, { foreignKey: 'contentId' });

module.exports = {
  ChatSession,
  ChatMessage,
};
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

// Define MoodTracking model
const MoodTracking = sequelize.define(
  'MoodTracking',
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
    mood: {
      type: DataTypes.ENUM('very_bad', 'bad', 'neutral', 'good', 'very_good'),
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

// Define relationship
User.hasMany(MoodTracking, { foreignKey: 'userId' });
MoodTracking.belongsTo(User, { foreignKey: 'userId' });

module.exports = MoodTracking;
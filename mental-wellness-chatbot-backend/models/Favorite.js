const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const { WellnessContent } = require('./WellnessContent');

// Define Favorite model for user saved content
const Favorite = sequelize.define(
  'Favorite',
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
    contentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: WellnessContent,
        key: 'id',
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'contentId'],
      },
    ],
  }
);

// Define relationships
User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

WellnessContent.hasMany(Favorite, { foreignKey: 'contentId' });
Favorite.belongsTo(WellnessContent, { foreignKey: 'contentId' });

module.exports = Favorite;
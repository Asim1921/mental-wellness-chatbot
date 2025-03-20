const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

// Base Wellness Content model
const WellnessContent = sequelize.define(
  'WellnessContent',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contentType: {
      type: DataTypes.ENUM('quote', 'exercise', 'technique', 'resource'),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  }
);

// Quote model
const Quote = sequelize.define(
  'Quote',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: WellnessContent,
        key: 'id',
      },
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: 'Unknown',
    },
    source: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

// Exercise model
const Exercise = sequelize.define(
  'Exercise',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: WellnessContent,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    steps: {
      type: DataTypes.JSON, // Array of strings stored as JSON
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // in minutes
      defaultValue: 5,
    },
    difficulty: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      defaultValue: 'beginner',
    },
    resources: {
      type: DataTypes.JSON, // Array of resource objects stored as JSON
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  }
);

// Technique model
const Technique = sequelize.define(
  'Technique',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: WellnessContent,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    benefits: {
      type: DataTypes.JSON, // Array of strings stored as JSON
      defaultValue: [],
    },
    contraindications: {
      type: DataTypes.JSON, // Array of strings stored as JSON
      defaultValue: [],
    },
    resources: {
      type: DataTypes.JSON, // Array of resource objects stored as JSON
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  }
);

// Resource model
const Resource = sequelize.define(
  'Resource',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: WellnessContent,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resourceType: {
      type: DataTypes.ENUM(
        'article',
        'video',
        'book',
        'podcast',
        'app',
        'hotline',
        'organization',
        'other'
      ),
      allowNull: false,
    },
    isEmergency: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

// ContentTag model (for many-to-many relationship)
const ContentTag = sequelize.define(
  'ContentTag',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: WellnessContent,
        key: 'id',
      },
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['contentId', 'tag'],
      },
    ],
  }
);

// Define relationships
WellnessContent.hasOne(Quote, { foreignKey: 'contentId', as: 'quote' });
Quote.belongsTo(WellnessContent, { foreignKey: 'contentId' });

WellnessContent.hasOne(Exercise, { foreignKey: 'contentId', as: 'exercise' });
Exercise.belongsTo(WellnessContent, { foreignKey: 'contentId' });

WellnessContent.hasOne(Technique, { foreignKey: 'contentId', as: 'technique' });
Technique.belongsTo(WellnessContent, { foreignKey: 'contentId' });

WellnessContent.hasOne(Resource, { foreignKey: 'contentId', as: 'resource' });
Resource.belongsTo(WellnessContent, { foreignKey: 'contentId' });

WellnessContent.hasMany(ContentTag, { foreignKey: 'contentId', as: 'tags' });
ContentTag.belongsTo(WellnessContent, { foreignKey: 'contentId' });

User.hasMany(WellnessContent, { foreignKey: 'createdBy' });
WellnessContent.belongsTo(User, { foreignKey: 'createdBy' });

// Helper methods
WellnessContent.findByType = async function(type, options = {}) {
  const contents = await this.findAll({
    where: { 
      contentType: type,
      active: true,
      ...options.where 
    },
    include: [
      { model: ContentTag, as: 'tags' },
      { model: User, attributes: ['id', 'name'] },
      { model: Quote, as: 'quote' },
      { model: Exercise, as: 'exercise' },
      { model: Technique, as: 'technique' },
      { model: Resource, as: 'resource' }
    ],
    ...options
  });
  
  return contents;
};

module.exports = {
  WellnessContent,
  Quote,
  Exercise,
  Technique,
  Resource,
  ContentTag,
};
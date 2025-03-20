const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Create Sequelize instance for SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'data', 'database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite database connection established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the SQLite database:', error);
    return false;
  }
};

module.exports = { sequelize, testConnection };
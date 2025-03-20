// create-admin.js
const { sequelize } = require('./config/database');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createAdmin() {
  try {
    // Connect to the database directly
    await sequelize.authenticate();
    console.log('Connected to database');
    
    // Hash password directly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    // Insert user directly with SQL
    const query = `
      INSERT INTO Users (name, email, password, isAdmin, createdAt, updatedAt)
      VALUES ('Admin User', 'admin@example.com', '${hashedPassword}', 1, datetime('now'), datetime('now'))
    `;
    
    await sequelize.query(query);
    console.log('Admin user created successfully!');
    
  } catch (error) {
    console.error('Failed to create admin:', error);
  } finally {
    await sequelize.close();
  }
}

createAdmin();
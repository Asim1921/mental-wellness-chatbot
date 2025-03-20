// init-db.js
const { sequelize } = require('./config/database');
const User = require('./models/User');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

async function initDb() {
  try {
    // Make sure data directory exists
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      console.log('Creating data directory...');
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Sync database (create tables)
    console.log('Syncing database...');
    await sequelize.sync({ force: true }); // This will recreate all tables
    console.log('Database synchronized!');
    
    // Create admin user
    console.log('Creating admin user...');
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      isAdmin: true
    });
    
    console.log('Admin user created with ID:', adminUser.id);
    console.log('Admin email:', adminUser.email);
    
    // Query tables to ensure they exist
    const users = await User.findAll();
    console.log(`Found ${users.length} users in database`);
    
  } catch (error) {
    console.error('Failed to initialize database:', error);
  } finally {
    await sequelize.close();
  }
}

initDb();
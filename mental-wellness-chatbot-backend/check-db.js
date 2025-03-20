const fs = require('fs');
const path = require('path');

// Path to your SQLite database file
const dbPath = path.join(__dirname, 'data', 'database.sqlite');

console.log('Checking database file at:', dbPath);

// Check if the file exists
if (fs.existsSync(dbPath)) {
  console.log('Database file exists!');
  
  // Check file size
  const stats = fs.statSync(dbPath);
  console.log(`File size: ${stats.size} bytes`);
  
  // Check permissions
  console.log('File permissions:');
  console.log('- Readable:', fs.accessSync(dbPath, fs.constants.R_OK) === undefined);
  try {
    fs.accessSync(dbPath, fs.constants.W_OK);
    console.log('- Writable: true');
  } catch (error) {
    console.log('- Writable: false');
  }
} else {
  console.log('Database file does not exist!');
  
  // Check if the data directory exists
  const dataDir = path.join(__dirname, 'data');
  if (fs.existsSync(dataDir)) {
    console.log('Data directory exists.');
    
    // Check if we can write to the data directory
    try {
      fs.accessSync(dataDir, fs.constants.W_OK);
      console.log('Data directory is writable.');
    } catch (error) {
      console.log('Data directory is not writable!');
    }
  } else {
    console.log('Data directory does not exist!');
  }
}
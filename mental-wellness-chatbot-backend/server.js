const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { testConnection } = require('./config/database');
const { initializeDatabase } = require('./models');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables with explicit path
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Debug logs for environment variables
console.log('Environment loaded:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- PORT:', process.env.PORT);
console.log('- JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('- JWT_SECRET length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Add detailed request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

// Base API endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Mental Wellness Chatbot API is running' });
});

// Debug endpoint - REMOVE IN PRODUCTION
app.get('/api/debug-env', (req, res) => {
  // Only show if in development mode
  if (process.env.NODE_ENV !== 'production') {
    res.json({
      envVars: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        // Don't show the actual secret, just whether it exists
        JWT_SECRET: process.env.JWT_SECRET ? 'Set (hidden)' : 'Not set',
      },
      jwtSecretLength: process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0
    });
  } else {
    res.status(403).json({ message: 'Debug endpoints disabled in production' });
  }
});

// API routes
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/favorites', favoriteRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Mental Wellness Chatbot API is running');
});

// Error handling middleware
app.use(errorHandler);

// Start server function
const startServer = async () => {
  try {
    // Test database connection
    const connectionOk = await testConnection();
    
    if (!connectionOk) {
      console.error('Database connection failed. Exiting...');
      process.exit(1);
    }
    
    // Initialize database (sync models with database)
    await initializeDatabase(false);
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error(`Server failed to start: ${error.message}`);
    process.exit(1);
  }
};

// Start the server
startServer();
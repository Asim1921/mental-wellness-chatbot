const jwt = require('jsonwebtoken');
const User = require('../models/User');

// TEMPORARY FIX: Use hardcoded secret until we resolve the env variable issue
const secret = 'hardcoded_secret_for_testing_jwt_generation_123';

/**
 * Authentication middleware to protect routes
 */
const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token with hardcoded secret
      try {
        const decoded = jwt.verify(token, secret);
        
        // Get user from the token (exclude password)
        req.user = await User.findByPk(decoded.id, {
          attributes: { exclude: ['password'] },
        });

        if (!req.user) {
          res.status(401);
          throw new Error('User not found');
        }

        next();
      } catch (jwtError) {
        console.error('JWT verification error:', jwtError.message);
        res.status(401);
        throw new Error('Not authorized, token verification failed');
      }
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(error.statusCode || 401);
      next(error);
    }
  } else {
    res.status(401);
    const error = new Error('Not authorized, no token');
    next(error);
  }
};

/**
 * Admin-only access middleware
 */
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    const error = new Error('Not authorized as an admin');
    next(error);
  }
};

module.exports = { protect, admin };
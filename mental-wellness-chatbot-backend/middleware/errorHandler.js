/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // If response status code is still 200, set it to 500 (internal server error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log error for server-side debugging
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
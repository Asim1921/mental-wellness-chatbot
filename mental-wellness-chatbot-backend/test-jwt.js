const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log('Testing JWT token generation');
console.log('---------------------------');
console.log('Environment variables:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- JWT_SECRET present:', !!process.env.JWT_SECRET);
console.log('- JWT_SECRET length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);

try {
  // Try to generate a token with a simple payload
  const payload = { id: 1, test: true };
  console.log('Payload:', payload);
  
  // Generate token with explicit JWT_SECRET
  const hardcodedSecret = 'hardcoded_secret_for_testing_jwt_generation_123';
  console.log('Using hardcoded secret for test');
  
  const token = jwt.sign(payload, hardcodedSecret);
  console.log('Token successfully generated with hardcoded secret!');
  console.log('Token:', token);
  
  // Try to verify the token
  const decoded = jwt.verify(token, hardcodedSecret);
  console.log('Token successfully verified!');
  console.log('Decoded:', decoded);
  
  // Now try with environment variable
  if (process.env.JWT_SECRET) {
    console.log('\nTrying with JWT_SECRET from environment');
    const envToken = jwt.sign(payload, process.env.JWT_SECRET);
    console.log('Token successfully generated with environment JWT_SECRET!');
    
    // Try to verify the token
    const envDecoded = jwt.verify(envToken, process.env.JWT_SECRET);
    console.log('Token successfully verified with environment JWT_SECRET!');
  } else {
    console.log('\nSkipping ENV JWT_SECRET test because it is not set');
  }
  
} catch (error) {
  console.error('Error generating or verifying token:', error);
}
const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
  // Get the token from the cookie or Authorization header
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  // If the token doesn't exist
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  // Verify the validity of the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    // Store the token information in the request for later use
    req.session = decoded;
    next();
  });
};

const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.verifyToken = (req, res, next) => {
  // Get the token from the cookie or Authorization header
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  // If the token doesn't exist
  if (!token) return res.status(401).json({ message: 'Auhtentification requise' });

  // Verify the validity of the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token invalide' });

    // Store the token information in the request for later use
    req.session = decoded;
    next();
  });
};

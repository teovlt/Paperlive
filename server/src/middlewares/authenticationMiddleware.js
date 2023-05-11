const jwt = require('jsonwebtoken');
const Team = require('../models/teamModel');

module.exports.authenticateAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ error: 'Access token not found' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid access token' });
    req.teamId = decoded.id;
    next();
  });
};

module.exports.authenticateRefreshToken = (req, res, next) => {
  const token = req.cookies['__refresh__token'];

  if (token == null) return res.status(401).json({ error: 'Refresh token not found' });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid refresh token' });

    // Véfifier si l'utilisateur existe toujours
    const team = await Team.findById(decoded.id);
    if (!team) return res.status(401).json({ error: 'User not found' });

    req.refreshToken = token;
    req.teamId = decoded.id;
    next();
  });
};

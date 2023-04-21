const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
  // Récupérer le token depuis le cookie ou le header Authorizaiton
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  // Si le token n'existe pas
  if (!token) return res.status(401).json({ message: 'Auhtentification requise' });

  // Vérifier la validité du token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token invalide' });

    // Stocker les informations du token dans la requête pour une utilisation ultérieure
    req.session = decoded;
    next();
  });
};

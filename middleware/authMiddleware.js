const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Modèle User

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Récupère le token dans les headers
  
    if (!token) {
      console.log('Token manquant dans les headers');
      return res.status(401).json({ message: 'Non autorisé : aucun token fourni.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie le token
      console.log('Token décodé:', decoded);
  
      const user = await User.findById(decoded.userId); // Récupère l'utilisateur dans la base
  
      if (!user) {
        console.log('Utilisateur non trouvé pour cet ID');
        return res.status(401).json({ message: 'Utilisateur non trouvé.' });
      }
  
      req.user = user; // Ajoute l'utilisateur à la requête
      next(); // Passe au prochain middleware ou à la route
    } catch (error) {
      console.error('Erreur de vérification du token:', error);
      return res.status(401).json({ message: 'Token invalide.' });
    }
  };
  
  module.exports = authMiddleware;

const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Le modèle User

// Route pour récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Récupère tous les utilisateurs depuis MongoDB
    res.json(users); // Retourne les utilisateurs au format JSON
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
  }
});

// Route pour créer un utilisateur
router.post('/', async (req, res) => {
  try {
    const { nom, prenom, email, password, role="user" } = req.body;

    // Validation des champs
    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Création d'un nouvel utilisateur
    const newUser = new User({
      nom,
      prenom,
      email,
      password, 
      role
    });

    // Sauvegarde dans MongoDB
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); 
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
});

module.exports = router;


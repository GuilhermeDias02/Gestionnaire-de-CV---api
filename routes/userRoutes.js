const express = require("express");
const router = express.Router();
const userController = require('../controllers/user');
//const User = require('../models/user'); 


// Route pour créer un utilisateur
router.post('/', async (req, res) => {
  try {

    const { nom, prenom, email, password, role="user" } = req.body; //un utilisateur a pour le moment le role user automatiquement (on verra par la suite pour le role admin)
    console.log('Données reçues dans la requête POST test:', req.body);
    // Validation des champs
    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    // Vérifier si l'email existe déjà
    console.log('test1');
    const existingUser = await User.findOne({ email });
    console.log('test2');
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    console.log('Avant création');
    // Création d'un nouvel utilisateur
    const newUser = new User({
      nom,
      prenom,
      email,
      password, 
      role
    });
    console.log('Après création');
    // Sauvegarde dans MongoDB
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); 
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
});
router.get("/", userController.getAll);
router.get("/:id", userController.getOne);

module.exports = router;

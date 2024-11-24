const express = require("express");
const router = express.Router();
const userController = require('../controllers/user')

// Route pour récupérer tous les utilisateurs
router.get("/", userController.getAll);

// Route pour créer un utilisateur
router.post("/", async (req, res) => {
    try {
        const { nom, prenom, email, password, role = "user" } = req.body; //un utilisateur a pour le moment le role user automatiquement (on verra par la suite pour le role admin)

        // Validation des champs
        if (!nom || !prenom || !email || !password) {
            return res
                .status(400)
                .json({ message: "Tous les champs sont obligatoires" });
        }

        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Cet email est déjà utilisé" });
        }

        // Création d'un nouvel utilisateur
        const newUser = new User({
            nom,
            prenom,
            email,
            password,
            role,
        });

        // Sauvegarde dans MongoDB
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la création de l'utilisateur",
            error,
        });
    }
});

module.exports = router;

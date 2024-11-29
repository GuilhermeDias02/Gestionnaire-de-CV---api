const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authMiddleware = require("../middleware/authMiddleware");
//const User = require('../models/user');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing user information
 */

// Route pour tester la creation d'utilisateur
router.post("./", async (req, res) => {
    try {
        const { nom, prenom, email, password, role = "user" } = req.body; //un utilisateur a pour le moment le role user automatiquement (on verra par la suite pour le role admin)
        // console.log("Données reçues dans la requête POST test:", req.body);
        // Validation des champs
        if (!nom || !prenom || !email || !password) {
            return res
                .status(400)
                .json({ message: "Tous les champs sont obligatoires" });
        }

        // Vérifier si l'email existe déjà
        console.log("test1");
        const existingUser = await User.findOne({ email });
        console.log("test2");
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Cet email est déjà utilisé" });
        }
        console.log("Avant création");
        // Création d'un nouvel utilisateur
        const newUser = new User({
            nom,
            prenom,
            email,
            password,
            role,
        });
        console.log("Après création");
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

/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Get the current user's information
 *     description: Retrieve the information of the currently authenticated user based on the provided JWT token.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # Indicates that this route requires a bearer token
 *     responses:
 *       200:
 *         description: Successfully retrieved user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the user.
 *                     example: "670507e5a85e8b4542098ab9"
 *                   nom:
 *                     type: string
 *                     description: The user's last name.
 *                     example: Doe
 *                   prenom:
 *                     type: string
 *                     description: The user's first name.
 *                     example: John
 *                   email:
 *                     type: string
 *                     description: The user's email address.
 *                     example: john.doe@example.com
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.get("/", userController.getAll);

/**
 * @swagger
 * /api/user/:id:
 *   get:
 *     summary: Get one user's information
 *     description: Retrieve the information of the desired user based on the provided id.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # Indicates that this route requires a bearer token
 *     responses:
 *       200:
 *         description: Successfully retrieved user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the user.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 nom:
 *                   type: string
 *                   description: The user's last name.
 *                   example: Doe
 *                 prenom:
 *                   type: string
 *                   description: The user's first name.
 *                   example: John
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                   example: john.doe@example.com
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", userController.getOne);


router.get("/connected/token", authMiddleware, userController.getConnected)

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require('../controllers/user')

// Route pour récupérer tous les utilisateurs
router.get("/", userController.getAll);// juste pour les tests
router.get("/:id", userController.getOne);

module.exports = router;

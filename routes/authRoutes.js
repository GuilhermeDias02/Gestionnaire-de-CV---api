const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Route pour créer un utilisateur
router.post("/register", authController.register);
router.post("/login", authController.login);

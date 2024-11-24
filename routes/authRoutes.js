const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Route pour créer un utilisateur
router.post("/", authController.register);

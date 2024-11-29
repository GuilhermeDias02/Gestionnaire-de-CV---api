const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendation");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware pour vérifier le token

// Récupérer les recommandations pour un CV
router.get("/:cvId", authMiddleware, recommendationController.getOneByCv);

// Ajouter une recommandation
router.post("/", authMiddleware, recommendationController.createOne);

// Supprimer une recommandation
router.delete("/:id", authMiddleware, recommendationController.deleteOne);

module.exports = router;

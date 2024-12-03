const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendation");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware pour vérifier le token

/**
 * @swagger
 * /recommendation/{cvId}:
 *   get:
 *     summary: Récupérer toutes les recommandations pour un CV spécifique
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: cvId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du CV pour lequel récupérer les recommandations
 *     responses:
 *       200:
 *         description: Liste des recommandations récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Utilisateur non authentifié
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/:cvId", authMiddleware, recommendationController.getOneByCv);

/**
 * @swagger
 * /recommendation:
 *   post:
 *     summary: Ajouter une nouvelle recommandation à un CV
 *     tags: [Recommendations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cv:
 *                 type: string
 *                 description: ID du CV auquel la recommandation est liée
 *               message:
 *                 type: string
 *                 description: Message de la recommandation
 *               rating:
 *                 type: integer
 *                 description: Note donnée dans la recommandation (0 à 5)
 *     responses:
 *       201:
 *         description: Recommandation créée avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Utilisateur non authentifié
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/", authMiddleware, recommendationController.createOne);

/**
 * @swagger
 * /recommendation/{id}:
 *   delete:
 *     summary: Supprimer une recommandation existante
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recommandation à supprimer
 *     responses:
 *       204:
 *         description: Recommandation supprimée avec succès
 *       401:
 *         description: Utilisateur non authentifié
 *       404:
 *         description: Recommandation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete("/:id", authMiddleware, recommendationController.deleteOne);

module.exports = router;

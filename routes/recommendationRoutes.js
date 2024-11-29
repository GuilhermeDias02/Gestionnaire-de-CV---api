const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendation');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware d'authentification

/**
 * @swagger
 * tags:
 *   name: Recommendation
 *   description: API to manage Recommendations
 */

/**
 * @swagger
 * /api/recommendation/:
 *   get:
 *     summary: Get all recommendations
 *     description: Retrieve all the recommendations.
 *     tags:
 *       - Recommendation
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
 *                     description: The unique identifier of the recommendation.
 *                     example: "670507e5a85e8b4542098ab9"
 *                   message:
 *                     type: string
 *                     description: The user's last name.
 *                     example: Doe
 *                   rating:
 *                     type: number
 *                     description: A note between 1 and 5
 *                     example: 3
 *                   author:
 *                     type: string
 *                     description: The unique identifier of the recommendation's author.
 *                     example: "670507e5a85e8b4542098ab9"
 *                   cv:
 *                     type: string
 *                     description: The unique identifier of the recommendation's cv.
 *                     example: "670507e5a85e8b4542098ab9"
 *       500:
 *         description: Internal server error.
 */
router.get('/', authMiddleware, recommendationController.getAll); // Récupérer toutes les recommandations
//router.get('/:id', recommendationController.getOne); // Récupérer une recommandation par ID

/**
 * @swagger
 * /api/recommendation/:cvId:
 *   get:
 *     summary: Get a cv's recommendations
 *     description: Retrieve all cv's recommendations with its id.
 *     tags:
 *       - Recommendation
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
 *                     description: The unique identifier of the recommendation.
 *                     example: "670507e5a85e8b4542098ab9"
 *                   message:
 *                     type: string
 *                     description: The user's last name.
 *                     example: Doe
 *                   rating:
 *                     type: number
 *                     description: A note between 1 and 5
 *                     example: 3
 *                   author:
 *                     type: string
 *                     description: The unique identifier of the recommendation's author.
 *                     example: "670507e5a85e8b4542098ab9"
 *                   cv:
 *                     type: string
 *                     description: The unique identifier of the recommendation's cv.
 *                     example: "670507e5a85e8b4542098ab9"
 *       500:
 *         description: Internal server error.
 */
router.get('/:cvId', authMiddleware, recommendationController.getOneByCv); // Récupérer les recommandations pour un CV

/**
 * @swagger
 * /api/recommendation/:
 *   post:
 *     summary: 
 *     description: Creates a new user account with the provided details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cv
 *               - message
 *               - rating
 *             properties:
 *               cv:
 *                 type: string
 *                 description: The cv's id.
 *                 example: 670507e5a85e8b4542098ab9
 *               message:
 *                 type: string
 *                 description: The recommendation's comment
 *                 example: Good
 *               rating:
 *                 type: number
 *                 description: Between 1 and 5
 *                 example: 4
 *     responses:
 *       201:
 *         description: Recommandation créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the recommendation.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 message:
 *                   type: string
 *                   description: The message
 *                   example: Good
 *                 rating:
 *                   type: number
 *                   description: Number between 1 and 5
 *                   example: 5
 *                 author:
 *                   type: string
 *                   description: The unique identifier of the recommendation's author.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 cv:
 *                   type: string
 *                   description: The unique identifier of the recommendation's cv.
 *                   example: "670507e5a85e8b4542098ab9"
 *       400:
 *         description: Bad request - Invalid input or missing required fields.
 *       500:
 *         description: Internal server error.
 */
router.post('/', authMiddleware, recommendationController.createOne); // Ajouter une recommandation (authentifié)

/**
 * @swagger
 * /api/recommendation/:id:
 *   delete:
 *     summary: Delete a recommendation
 *     description: Retrieve a Cv based on its id
 *     security:
 *       - bearerAuth: []  # Indicates that this route requires a bearer token
 *     tags:
 *       - Recommendation
 *     responses:
 *       204:
 *         description: Reocmmendation has been removed successfully.
 *       400:
 *         description: No record with given id.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authMiddleware, recommendationController.deleteOne); // Supprimer une recommandation (authentifié)

module.exports = router;
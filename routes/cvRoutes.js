const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cv");
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /cv/one/{id}:
 *   get:
 *     summary: Récupérer un CV spécifique par son ID
 *     tags: [CVs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du CV
 *     responses:
 *       200:
 *         description: Détails du CV récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/one/:id", authMiddleware, cvController.getOne);

/**
 * @swagger
 * /cv:
 *   get:
 *     summary: Récupérer tous les CVs appartenant à l'utilisateur connecté
 *     tags: [CVs]
 *     responses:
 *       200:
 *         description: Liste des CVs récupérés avec succès
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
router.get("/", authMiddleware, cvController.getByToken);

/**
 * @swagger
 * /cv/search/{search}:
 *   get:
 *     summary: Rechercher des CVs par leur titre
 *     tags: [CVs]
 *     parameters:
 *       - in: path
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Mot-clé pour rechercher les CVs
 *     responses:
 *       200:
 *         description: Résultats de la recherche récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/search/:search", cvController.search);

/**
 * @swagger
 * /cv:
 *   post:
 *     summary: Créer un nouveau CV
 *     tags: [CVs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 description: Titre du CV
 *               description:
 *                 type: string
 *                 description: Description du CV
 *               techSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               softSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               certifications:
 *                 type: array
 *                 items:
 *                   type: string
 *               expPro:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     entreprise:
 *                       type: string
 *                     poste:
 *                       type: string
 *                     description:
 *                       type: string
 *     responses:
 *       201:
 *         description: CV créé avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/", authMiddleware, cvController.createCv);

/**
 * @swagger
 * /cv/{id}:
 *   put:
 *     summary: Modifier un CV existant
 *     tags: [CVs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du CV à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               techSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               softSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               certifications:
 *                 type: array
 *                 items:
 *                   type: string
 *               expPro:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     entreprise:
 *                       type: string
 *                     poste:
 *                       type: string
 *                     description:
 *                       type: string
 *     responses:
 *       200:
 *         description: CV modifié avec succès
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.put("/:id", authMiddleware, cvController.editCv);

/**
 * @swagger
 * /cv/{id}:
 *   delete:
 *     summary: Supprimer un CV existant
 *     tags: [CVs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du CV à supprimer
 *     responses:
 *       204:
 *         description: CV supprimé avec succès
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete("/:id", authMiddleware, cvController.deleteCv);

module.exports = router;

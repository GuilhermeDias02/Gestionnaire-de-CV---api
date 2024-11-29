const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendation');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware d'authentification

router.get('/', authMiddleware, recommendationController.getAll); // Récupérer toutes les recommandations
//router.get('/:id', recommendationController.getOne); // Récupérer une recommandation par ID
router.get('/:cvId', authMiddleware, recommendationController.getOneByCv); // Récupérer les recommandations pour un CV
router.post('/', authMiddleware, recommendationController.createOne); // Ajouter une recommandation (authentifié)
router.delete('/:id', authMiddleware, recommendationController.deleteOne); // Supprimer une recommandation (authentifié)

module.exports = router;
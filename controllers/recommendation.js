const Recommendation = require('../models/recommendation');

module.exports = {
  // Récupérer toutes les recommandations
  getAll: async (req, res) => {
    try {
      const recomm = await Recommendation.find();
      res.json(recomm);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la récupération des Recommendations',
        error,
      });
    }
  },

  // Récupérer une recommandation par ID
  getOne: async (req, res) => {
    const recommId = req.params.id;
    try {
      const recomm = await Recommendation.findById(recommId);
      res.send(recomm);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: `Erreur lors de la récupération de la recommandation avec id=${recommId}`,
      });
    }
  },

  // Récupérer toutes les recommandations pour un CV
  getOneByCv: async (req, res) => {
    const cvId = req.params.cvId;
    try {
        const recommendations = await Recommendation.find({ cv: cvId });
        res.send(recommendations);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `Error retrieving recommendations for cvId=${cvId}`,
        });
    }
},


  // Ajouter une nouvelle recommandation
  createOne: async (req, res) => {
    try {
      console.log("Données reçues :", req.body);
      const { cv, message, rating } = req.body;
      // Validation des données
      if (!cv || !message) {
        return res.status(400).send({ message: "Le CV et le message sont obligatoires." });
      }
  
      // Création de la recommandation
      const newRecomm = new Recommendation({
        cv,
        message,
        rating,
        author: req.user?.id || null, 
      });
  
      await newRecomm.save();
  
      res.status(201).send({
        message: "Recommandation créée avec succès",
        recommendation: newRecomm,
      });
    } catch (error) {
      console.error("Erreur lors de la création de la recommandation :", error);
      res.status(500).send({
        message: "Erreur interne du serveur.",
        error: error.message,
      });
    }
  },

  // Supprimer une recommandation
  deleteOne: async (req, res) => {
    try {
      const recommId = req.params.id;
      const recomm = await Recommendation.findByIdAndDelete(recommId);

      if (recomm) {
        res.status(204).send({
          message: 'Recommendation supprimée avec succès.',
        });
      } else {
        res.status(400).send(`Aucune recommandation trouvée avec l'id : ${recommId}`);
      }
    } catch (error) {
      res.status(500).send({
        message: error.message || `Erreur lors de la suppression de la recommandation avec id=${req.params.id}`,
      });
    }
  },
};

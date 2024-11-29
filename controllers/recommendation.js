const Recommendation = require("../models/recommendation");
const Cv = require("../models/cv");

module.exports = {
    // Récupérer toutes les recommandations pour un CV
    getOneByCv: async (req, res) => {
      const cvId = req.params.cvId;
      try {
          const recommendations = await Recommendation.find({ cv: cvId });
          if (!recommendations) {
              return res.status(404).send({ message: `Aucune recommandation trouvée pour le CV avec l'ID=${cvId}.` });
          }
          res.send(recommendations);
      } catch (error) {
          console.error(error);
          res.status(500).send({
              message: `Erreur lors de la récupération des recommandations pour cvId=${cvId}`,
              error: error.message,
          });
      }
  },
  

    // Ajouter une nouvelle recommandation
    createOne: async (req, res) => {
      try {
          const { cv, message, rating } = req.body;
  
          // Pas de validation stricte ici, car 0 est une valeur autorisée
          if (rating < 0 || rating > 5) {
              return res.status(400).send({ message: "La note doit être comprise entre 0 et 5." });
          }
  
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

          // Récupérer la recommandation
          const recomm = await Recommendation.findById(recommId);
          if (!recomm) {
              return res.status(404).send({ message: 'Recommandation introuvable.' });
          }

          // Vérifier si l'utilisateur est le propriétaire du CV
          const cv = await Cv.findById(recomm.cv);
          if (!cv) {
              return res.status(404).send({ message: 'CV introuvable.' });
          }

          if (cv.author.toString() !== req.user._id.toString()) {
              return res.status(403).send({ message: 'Accès interdit : vous n\'êtes pas le propriétaire de ce CV.' });
          }

          // Supprimer la recommandation
          await Recommendation.findByIdAndDelete(recommId);
          res.status(200).send({ message: 'Recommandation supprimée avec succès.' });
      } catch (error) {
          res.status(500).send({
              message: error.message || 'Erreur lors de la suppression de la recommandation.',
          });
      }
  },  
};

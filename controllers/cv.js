const Cv = require("../models/cv");

module.exports = {
    getOne: async (req, res) => {
        const cvId = req.params.id;
        try {
          const cv = await Cv.findById(cvId);
    
          if (!cv) {
            return res.status(404).send({
              message: `CV avec l'ID=${cvId} non trouvé.`,
            });
          }
    
          res.send(cv);
        } catch (error) {
          console.error(error);
          res.status(500).send({
            message: `Erreur lors de la récupération du CV avec l'ID=${cvId}.`,
          });
        }
      },

      getByToken: async (req, res) => {
        try {
            const search = req.query.search || ""; // Si `search` n'est pas fourni, par défaut ""
            const cvs = await Cv.find(
                search
                    ? { titre: { $regex: ".*" + search + ".*", $options: "i" } } 
                    : {}
            ).limit(10);
            res.send(cvs);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "Error retrieving CVs",
                error: error.message,
            });
        }
    },

    createCv: async (req, res) => {

        const verifyCv = (cvData) => {
            if (!cvData.titre || !cvData.description) {
              return { message: 'Le titre et la description sont obligatoires.' };
            }
            return null;
          };
          
        try {
            // Validation des données
            const isNotValidate = verifyCv(req.body);
            if (isNotValidate) {
                return res.status(400).send({ error: isNotValidate.message });
            }
    
            const cvBody = req.body;
    
            // Création du nouveau CV
            const newCv = new Cv({
                nom: req.user.nom,
                prenom: req.user.prenom,
                titre: cvBody.titre,
                adresse: cvBody.adresse,
                description: cvBody.description,
                techSkills: cvBody.techSkills,
                softSkills: cvBody.softSkills,
                certifications: cvBody.certifications,
                expPro: cvBody.expPro,
                visible: cvBody.visible,
                author: req.user._id, // Associe le CV à l'utilisateur connecté
            });
    
            // Sauvegarde du CV
            await newCv.save();
    
            // Mise à jour de l'utilisateur pour ajouter le CV
            const user = req.user;
            user.cvs.push(newCv._id);
            await user.save();
    
            res.status(201).send({
                success: true,
                message: 'CV créé avec succès.',
                cv: newCv,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: error.message || 'Erreur lors de la création du CV.',
            });
        }
    },
    

    editCv: async (req, res) => {
        try {
            const cvId = req.params.id;

            const isNotValidate = verifyCv(req.body);
            if (isNotValidate) {
                res.status(400);
                res.send({
                    error: isNotValidate.message
                });
            }

            const updatedCv = await Cv.findByIdAndUpdate(cvId, req.body, {
                new: true
            });

            if (!updatedCv) {
                return res.status(404).send({
                    message: `Cv with id=${cvId} not found.`
                });
            }

            res.send({
                message: 'Cv was updated successfully.',
                data: updatedCv
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || `Error updating cv with id=${req.params.id}`
            });
        }
    },

    deleteCv: async (req, res) => {
        try {
            const cvId = req.params.id;
            const cv = await Cv.findByIdAndDelete(cvId);

            if (cv) {
                res.status(204).send({
                    message: 'Cv has been removed successfully.'
                });
            } else {
                res.status(400).send(`No record with given id: ${cvId}`);
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || `Error deleting cv with id=${req.params.id}`
            });
        }
    }
};

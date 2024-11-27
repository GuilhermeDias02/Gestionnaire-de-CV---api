const Recommendation = require("../models/recommendation");

module.exports = {
    getAll: async (req, res) => {
        try {
            const recomm = await Recommendation.find();
            res.json(recomm);
        } catch (error) {
            res.status(500).json({
                message: "Erreur lors de la récupération des Recommendations",
                error,
            });
        }
    },

    getOne: async (req, res) => {
        const recommId = req.params.id;
        try {
            const recomm = await Recommendation.findById(recommId);
            res.send(recomm);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: `Error retrieving recomm with id=${recommId}`,
            });
        }
    },

    getOneByAuthor: async (req, res) => {
        const authorId = req.params.id;
        try {
            const recomm = Recommendation.find({ author: authorId });
            if (!recomm) {
                return res
                    .status(401)
                    .send({ message: "No recomendations from this author" });
            }
            res.send(recomm);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: `Error retrieving recomm with authorId=${authorId}`,
            });
        }
    },

    getOneByCv: async (req, res) => {
        const cvId = req.params.id;
        try {
            const recomm = Recommendation.find({ cv: cvId });
            if (!recomm) {
                return res
                    .status(401)
                    .send({ message: "No recomendations in this cv" });
            }
            res.send(recomm);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: `Error retrieving recomm with cvId=${authorId}`,
            });
        }
    },

    createOne: async (req, res) => {
        try {
            const isNotValidate = verifyRecomm(req.body);
            if (isNotValidate) {
                res.status(400);
                res.send({
                    error: isNotValidate.message,
                });
            }
            const recommBody = req.body;
            const newRecomm = new Recommendation({
                message: recommBody.message,
            });

            newRecomm.author = req.author;
            newRecomm.cv = req.cv;
            newRecomm.save();

            const { id, nom, prenom } = req.user;
            newCv.author = {
                id,
                nom,
                prenom,
            };
            res.status(201);
            res.send({
                success: true,
                cv: newCv,
            });
        } catch (error) {
            res.status(500);
            res.send({
                error: error.message,
            });
        }
    },

    deleteOne: async (req, res) => {
        try {
            const recommId = req.params.id;
            const recomm = await Recommendation.findByIdAndDelete(recommId);

            if (recomm) {
                res.status(204).send({
                    message: "Recommendation has been removed successfully.",
                });
            } else {
                res.status(400).send(
                    `No Recommendation with given id: ${recommId}`
                );
            }
        } catch (error) {
            res.status(500).send({
                message:
                    error.message ||
                    `Error deleting recommendation with id=${req.params.id}`,
            });
        }
    },
};

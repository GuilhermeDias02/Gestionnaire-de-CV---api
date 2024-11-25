const Cv = require("../models/cv");

module.exports = {
    getOne: async (req, res) => {
        const cvId = req.params.id;
        try {
            const cv = await Cv.findById(cvId);
            res.send(cv);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: `Error retrieving Cv with id=${cvId}`,
            });
        }
    },

    search: async (req, res) => {
        const search = req.params.search;
        try {
            const cvs = await Cv.find({
                titre: { $regex: ".*" + search + ".*" },
            }).limit(10);
            res.send(cvs);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: `Error retrieving Cvs with search=\"${search}\"}`,
            });
        }
    },

    createCv: async (req, res) => {
        try {
            const isNotValidate = verifyCv(req.body);
            if (isNotValidate) {
                res.status(400);
                res.send({
                    error: isNotValidate.message,
                });
            }
            const cvBody = req.body;
            const newCv = new Cv({
                titre: cvBody.titre,
                adresse: cvBody.adresse,
                description: cvBody.description,
                techSkills: cvBody.techSkills,
                softSkills: cvBody.softSkills,
                certifications: cvBody.certifications,
                expPro: cvBody.expPro,
                visible: cvBody.expPro,
            });

            newCv.author = req.user;
            newCv.save();

            const { id, nom, prenom } = req.user;
            newCv.author = {
                id,
                nom,
                prenom,
            };
            res.status(201);
            res.send({
                success: true,
                book: newCv,
            });
        } catch (error) {
            res.status(500);
            res.send({
                error: error.message,
            });
        }
    },
};

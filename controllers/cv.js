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

    
};

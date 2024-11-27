const User = require("../models/user");

module.exports = {
    getAll: async (req, res) => {
        console.log("user");
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({
                message: "Erreur lors de la récupération des utilisateurs",
                error,
            });
        }
    },

    getOne: async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);
            res.send(user);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: `Error retrieving user with id=${userId}`,
            });
        }
    },
};

const User = require("../models/user");

module.exports = {
    getAll: async (req, res) => {
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
}
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyUser } = require("../validator/user");

module.exports = {
    register: async (req, res) => {
        console.log("test");
        try {
            // console.log("début fonction");

            const isNotValidateUser = verifyUser(newUser);
            if (isNotValidateUser) {
                res.status(400).send({
                    error: isNotValidateUser.message,
                });
            }

            const { nom, prenom, email, password, role = "user" } = req.body; //un utilisateur a pour le moment le role user automatiquement (on verra par la suite pour le role admin)
            // console.log('Données reçues dans la requête POST test:', req.body);

            if (!nom || !prenom || !email || !password) {
                return res
                    .status(400)
                    .json({ message: "Tous les champs sont obligatoires" });
            }

            // Vérifier si l'email existe déjà
            // console.log('test1');
            const existingUser = await User.findOne({ email });
            // console.log('test2');
            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "Cet email est déjà utilisé" });
            }
            // console.log("test3");
            // Création d'un nouvel utilisateur
            const cryptpwd = await bcrypt.hash(password, 10);
            const newUser = new User({
                nom,
                prenom,
                email,
                password: cryptpwd,
                role,
            });
            // console.log(cryptpwd);
            // Sauvegarde dans MongoDB
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({
                message: "Erreur lors de la création de l'utilisateur",
                error,
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log("Données reçues dans la requête POST test:", req.body);
            const user = await User.findOne({ email });

            // Vérifie si l'utilisateur existe
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Utilisateur introuvable" });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );
            console: if (!isPasswordCorrect) {
                return res
                    .status(401)
                    .send({ message: "Email or Password wrong" });
            }

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            // Succès : retourne les informations utilisateur
            res.status(200).json({ message: "Connexion réussie", token, user });
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    },
};

const User = require('../models/user');
const {veriryUser} = require('../validator/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        try {
            const { nom, prenom, email, password, role = "user" } = req.body; //un utilisateur a pour le moment le role user automatiquement (on verra par la suite pour le role admin)

            // Validation des champs
            if (!nom || !prenom || !email || !password) {
                return res
                    .status(400)
                    .json({ message: "Tous les champs sont obligatoires" });
            }

            // Vérifier si l'email existe déjà
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "Cet email est déjà utilisé" });
            }

            // Création d'un nouvel utilisateur
            const newUser = new User({
                nom,
                prenom,
                email,
                password,
                role,
            });

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
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send({ message: 'Email or Password wrong' });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).send({ message: 'Email or Password wrong' });
            }

            const userData = {
                email: user.email
            };
            const secret = process.env.JWT_SECRET || 'secret';
            const jwtData = {
                expiresIn: process.env.JWT_TIMEOUT_DURATION || '1h'
            };

            const token = jwt.sign(userData, secret, jwtData);

            res.status(200).send({
                message: 'Successfully logged in',
                user: {
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email,
                    token
                }
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || 'some error occurred while logging user'
            });
        }
    },
};

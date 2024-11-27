const router = require("express").Router();
const authController = require("../controllers/auth");

// Route pour créer un utilisateur
router.post("/register", verifyUser, authController.register);
router.post("/login", authController.login);

module.exports = router;

const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cv");
//const { verifyToken } = require("../middleware/jwt");
const authMiddleware = require('../middleware/authMiddleware');

router.get("/:id", authMiddleware, cvController.getOne);
router.get("/", cvController.getByToken);

router.post("/", authMiddleware, cvController.createCv);

router.put("/:id", authMiddleware, cvController.editCv);

router.delete("/:id", authMiddleware, cvController.deleteCv);

module.exports = router;

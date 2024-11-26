const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cv");
const { verifyToken } = require("../middleware/jwt");

router.get("/:id", verifyToken, cvController.getOne);
router.get("/:seach", cvController.search);

router.post("/", verifyToken, cvController.createCv);

router.put("/:id", verifyToken, cvController.editCv);

router.delete("/:id", verifyToken, cvController.deleteCv);

module.exports = router;

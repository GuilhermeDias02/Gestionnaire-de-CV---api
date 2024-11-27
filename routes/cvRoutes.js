const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cv");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/one/:id", authMiddleware, cvController.getOne);
router.get("/", cvController.getByToken);
router.get("/search/:search", cvController.search);

router.post("/"/*, authMiddleware*/, cvController.createCv);

router.put("/:id", authMiddleware, cvController.editCv);

router.delete("/:id", authMiddleware, cvController.deleteCv);

module.exports = router;

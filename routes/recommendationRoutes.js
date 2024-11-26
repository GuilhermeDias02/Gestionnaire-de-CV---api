const router = require("express").Router();
const recommController = require("../controllers/recommendation");
const { verifyToken } = require("../middleware/jwt");

router.get("/", recommController.getAll);
router.get("/:id", verifyToken, recommController.getOne);
router.get("/:id", verifyToken, recommController.getOneByAuthor);
router.get("/:id", verifyToken, recommController.getOneByCv);

router.post("/", verifyToken, recommController.createOne);

router.delete("/", verifyToken, recommController.deleteOne);

module.exports = router;

const router = require("express").Router();
const recommController = require("../controllers/recommendation");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", recommController.getAll);
router.get("/recomm/:id", authMiddleware, recommController.getOne);
router.get("/author/:id", authMiddleware, recommController.getOneByAuthor);
router.get("/cv/:id", authMiddleware, recommController.getOneByCv);

router.post("/", authMiddleware, recommController.createOne);

router.delete("/:id", authMiddleware, recommController.deleteOne);

module.exports = router;

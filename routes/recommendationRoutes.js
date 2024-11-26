const router = require('express').Router();
const recommController = require('../controllers/recommendation');

router.get('/', recommController.getAll);
router.get('/:id', recommController.getOne);
router.get('/:id', recommController.getOneByAuthor);
router.get('/:id', recommController.getOneByCv);

router.post('/', recommController.createOne);

router.delete('/'. recommController.deleteOne);
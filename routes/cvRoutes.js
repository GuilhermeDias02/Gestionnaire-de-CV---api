const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cv');

router.get('/:id', cvController.getOne);
router.get('/:seach', cvController.search);

router.post('/', cvController.createCv);

router.put('/:id', cvController.editCv);

router.delete('/:id', cvController.deleteCv);
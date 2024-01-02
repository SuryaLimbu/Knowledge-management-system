const express = require('express');
const professionController = require('../controllers/professionController');
const router = express.Router();

 router.get('/', professionController.getProfessions);
 router.post('/create', professionController.createProfession);

 module.exports = router;

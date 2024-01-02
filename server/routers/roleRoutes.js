const express = require('express');
const roleController = require('../controllers/roleController');

const router = express.Router();

router.get('/', roleController.getRole);
router.post('/create', roleController.createRole);

module.exports = router; 
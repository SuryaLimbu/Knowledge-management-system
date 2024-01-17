const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();

router.get('/', clientController.getClient);
router.post('/create', clientController.createClient);
router.get('/:title', clientController.getSingleClient);
router.put('/:title', clientController.updateClient);
// router.delete('/:title', clientController.deleteClient);

module.exports = router;
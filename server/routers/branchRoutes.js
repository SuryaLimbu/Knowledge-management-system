const express = require('express');
const branchController = require('../controllers/branchController');
const router = express.Router();

router.get('/', branchController.getBranch);
router.post('/create', branchController.createBranch);
router.get('/:title', branchController.getSingleBranch);
router.put('/:title', branchController.updateBranch);
router.delete('/:title', branchController.deleteBranch);

module.exports = router;
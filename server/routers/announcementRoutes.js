const express = require('express');
const announcementController = require('../controllers/announcementController');
const router = express.Router();

router.get('/', announcementController.getAnnouncement);
// router.post('/create', branchController.createBranch);
// router.get('/:title', branchController.getSingleBranch);
// router.put('/:title', branchController.updateBranch);
// router.delete('/:title', branchController.deleteBranch);

module.exports = router;
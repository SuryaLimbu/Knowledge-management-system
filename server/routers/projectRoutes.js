const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();

router.get('/', projectController.getProject);
// router.post('/create', taskController.createTask);
router.get('/:projectId', projectController.getSingleProject);
// router.put('/:userId', taskController.updateTask);  
// router.delete('/:userId', taskController.deleteTask);  

module.exports = router;
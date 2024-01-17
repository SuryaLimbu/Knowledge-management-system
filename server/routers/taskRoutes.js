const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/', taskController.getTask);
// router.post('/create', taskController.createTask);
router.get('/:projectId', taskController.getSingleTask);
// router.put('/:userId', taskController.updateTask);  
// router.delete('/:userId', taskController.deleteTask);  

module.exports = router;
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getUsers);
router.post('/create', userController.createUser);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateUser);  
router.delete('/:userId', userController.deleteUser);  

module.exports = router;
const express = require('express');
const router = express.Router();

const Login = require('../auth/login');

router.post('/login', Login.Login);

module.exports = router;


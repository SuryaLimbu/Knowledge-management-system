const express = require('express');
const router = express.Router();

const Token = require('../auth/token');

router.post('/refresh', Token.Token);

module.exports = router;
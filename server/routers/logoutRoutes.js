const express = require('express');
const router = express.Router();

const Logout = require('../auth/logout');

router.post('/logout', Logout.Logout);

module.exports = router;


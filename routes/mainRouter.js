const controller = require('../controller/mainController');
const express = require('express');
const router = express.Router();

router.get('/', controller.displayMessages);

module.exports = router;

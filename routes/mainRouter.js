const controller = require('../controller/mainController');
const express = require('express');
const router = express.Router();

router.get('/', controller.displayMessages);

router.get('/register', controller.displayRegisterForm);

router.post('/register', controller.addNewUser);

module.exports = router;

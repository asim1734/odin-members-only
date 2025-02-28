const controller = require('../controller/mainController');
const express = require('express');
const router = express.Router();

router.get('/messages', controller.displayMessages);

router.get('/register', controller.displayRegisterForm);
router.post('/register', controller.addNewUser);

router.get('/log-in', controller.displayLoginForm);
router.post('/log-in', controller.loginUser);

module.exports = router;

const controller = require('../controller/mainController');
const express = require('express');
const router = express.Router();

router.get('/', controller.displayMessages);

router.get('/register', controller.displayRegisterForm);
router.post('/register', controller.addNewUser);

router.get('/log-in', controller.displayLoginForm);
router.post('/log-in', controller.loginUser);

router.get('/log-out', controller.logUserOut);

router.get('/new-member', controller.displayMemberForm);
router.post('/new-member', controller.makeUserMember);
module.exports = router;

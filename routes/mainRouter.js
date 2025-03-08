const controller = require('../controller/mainController');
const express = require('express');
const router = express.Router();

router.get('/', controller.displayMessages);

router.get('/register', controller.displayRegisterForm);
router.post('/register', controller.addNewUser);

router.get('/log-in', controller.displayLoginForm);
router.post('/log-in', controller.logUserIn);

router.get('/log-out', controller.logUserOut);

router.get('/new-member', controller.displayMemberForm);
router.post('/new-member', controller.makeUserMember);

router.get('/new-message', controller.displayMessageForm);
router.post('/new-message', controller.addNewMessage);

router.get('/admin-form', controller.displayAdminForm);
router.post('/admin-form', controller.makeUserAdmin);

module.exports = router;

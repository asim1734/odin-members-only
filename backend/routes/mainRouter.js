const express = require('express');
const controller = require('../controller/mainController');
const router = express.Router();

router.get('/api/current-user', controller.apiCurrentUser);
router.get('/api/messages', controller.apiMessages);

router.post('/register', controller.addNewUser);
router.post('/log-in', controller.logUserIn);
router.post('/log-out', controller.logUserOut);

router.post('/new-member', controller.makeUserMember);
router.post('/new-message', controller.addNewMessage);
router.post('/admin-form', controller.makeUserAdmin);

module.exports = router;

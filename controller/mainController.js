const model = require('../model/queries');
const passport = require('../config/passportConfig');

async function displayMessages(req, res) {
  try {
    const messages = await model.getAllMessages();
    res.render('messages', { messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function displayRegisterForm(req, res) {
  res.render('register');
}

async function displayLoginForm(req, res) {
  res.render('log-in');
}

async function loginUser(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: '/log-in',
    failureFlash: true,
  })(req, res, next);
}

async function addNewUser(req, res) {
  try {
    console.log(req.body);
    const { fullName, username, password } = req.body;

    await model.insertUser(fullName, username, password);
    console.log('User inserted');
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).send('Internal Server Error');
  }
  res.redirect('/log-in');
}

module.exports = {
  displayMessages,
  displayRegisterForm,
  displayLoginForm,
  addNewUser,
  loginUser,
};

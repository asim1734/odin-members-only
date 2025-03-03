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
    successRedirect: '/',
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

async function logUserOut(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
}

async function makeUserMember(req, res) {
  const keyword = req.body.keyword;
  if (keyword === 'cats') {
    await model.makeUserMember(req.user.id);
    res.redirect('/');
  } else {
    req.flash('KeywordError', 'Incorrect keyword, please try again.');
    res.redirect('/new-member');
  }
}

async function displayMemberForm(req, res) {
  res.render('new-member'); // No need to pass error explicitly
}

module.exports = {
  displayMessages,
  displayRegisterForm,
  displayLoginForm,
  addNewUser,
  loginUser,
  logUserOut,
  makeUserMember,
  displayMemberForm,
};

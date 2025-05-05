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

async function logUserIn(req, res, next) {
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
  res.render('new-member');
}

async function displayMessageForm(req, res) {
  res.render('new-message-form');
}

async function addNewMessage(req, res) {
  const content = req.body.content;
  await model.insertMessage(req.user.id, content);
  res.redirect('/');
}

async function displayAdminForm(req, res) {
  res.render('admin-form');
}

async function makeUserAdmin(req, res) {
  const keyword = req.body.keyword;
  if (keyword === 'dogs') {
    await model.makeUserAdmin(req.user.id);
    res.redirect('/');
  } else {
    req.flash('KeywordError', 'Incorrect keyword, please try again.');
    res.redirect('/admin-form');
  }
}

module.exports = {
  displayMessages,
  displayRegisterForm,
  displayLoginForm,
  displayMemberForm,
  displayMessageForm,
  displayAdminForm,
  addNewUser,
  addNewMessage,
  logUserIn,
  logUserOut,
  makeUserMember,
  makeUserAdmin,
};

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

async function logUserIn(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: info?.message || 'Invalid credentials',
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true });
    });
  })(req, res, next);
}

async function addNewUser(req, res) {
  try {
    const { fullName, username, password } = req.body;
    await model.insertUser(fullName, username, password);
    res.json({ success: true });
  } catch (error) {
    if (error.code === '23505') {
      // for duplicate username (Postgres)
      res
        .status(400)
        .json({ success: false, error: 'Username already taken.' });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal server error. Please try again.',
      });
    }
  }
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
  const { keyword } = req.body;
  if (keyword === 'cats') {
    await model.makeUserMember(req.user.id);
    return res.json({ success: true });
  }
  return res
    .status(400)
    .json({ success: false, error: 'Incorrect keyword, please try again.' });
}

async function addNewMessage(req, res) {
  const content = req.body.content;
  await model.insertMessage(req.user.id, content);
  res.redirect('/');
}

async function makeUserAdmin(req, res) {
  const { keyword } = req.body;
  if (keyword === 'dogs') {
    await model.makeUserAdmin(req.user.id);
    return res.json({ success: true });
  }
  return res
    .status(400)
    .json({ success: false, error: 'Incorrect keyword, please try again.' });
}

function apiCurrentUser(req, res) {
  if (!req.user) return res.json({ user: null });
  const { id, username, full_name, ismember, is_admin } = req.user;
  res.json({ user: { id, username, full_name, ismember, is_admin } });
}

async function apiMessages(req, res) {
  try {
    const messages = await model.getAllMessages();
    res.json(messages);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Failed to load messages' });
  }
}

module.exports = {
  displayMessages,
  addNewUser,
  addNewMessage,
  logUserIn,
  logUserOut,
  makeUserMember,
  makeUserAdmin,
  // Add API exports here:
  apiCurrentUser,
  apiMessages,
};

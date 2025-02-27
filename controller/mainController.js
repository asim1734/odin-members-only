const model = require('../model/queries');

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
  res.redirect('/');
}

module.exports = {
  displayMessages,
  displayRegisterForm,
  addNewUser,
};

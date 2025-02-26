const model = require('../model/queries');

async function displayMessages(req, res) {
  try {
    const messages = await model.getAllmessages();
    res.render('messages', { messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  displayMessages,
};

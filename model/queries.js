const pool = require('./pool');
const bcrypt = require('bcrypt');

async function getAllmessages() {
  const { rows } = await pool.query(
    'Select * from messages,users where messages.user_id = users.user_id '
  );
  return rows;
}

async function getUserWithUserid(userId) {
  const { rows } = await pool.query('select * from users where user_id = $1', [
    userId,
  ]);
  const user = rows[0];
  return user;
}

async function insertUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('insert into users (username, password) values ($1, $2)', [
    username,
    hashedPassword,
  ]);
}

async function insertMessage(userId, content) {
  await pool.query('insert into messages (user_id, content) values ($1, $2)', [
    userId,
    content,
  ]);
}

module.exports = {
  getAllmessages,
  getUserWithUserid,
  insertUser,
  insertMessage,
};

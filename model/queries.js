const pool = require('./pool');
const bcrypt = require('bcrypt');

async function getAllMessages() {
  const { rows } = await pool.query(
    'Select * from messages,users where messages.user_id = users.id '
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

async function insertUser(fullName, username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    'insert into users (full_name, username, password) values ($1, $2, $3)',
    [fullName, username, hashedPassword]
  );
}

async function insertMessage(userId, content) {
  await pool.query('insert into messages (user_id, content) values ($1, $2)', [
    userId,
    content,
  ]);
}

module.exports = {
  getAllMessages,
  getUserWithUserid,
  insertUser,
  insertMessage,
};

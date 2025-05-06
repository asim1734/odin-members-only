const pool = require('./pool');
const bcrypt = require('bcrypt');

async function getAllMessages() {
  const { rows } = await pool.query(
    'Select * from messages,users where messages.user_id = users.id '
  );
  return rows;
}

async function getUserByUserid(userId) {
  const { rows } = await pool.query('select * from users where id = $1', [
    userId,
  ]);
  const user = rows[0];
  return user;
}

async function getUserByUsername(username) {
  const { rows } = await pool.query('select * from users where username = $1', [
    username,
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

async function makeUserMember(userId) {
  await pool.query("update users set ismember = 'true' where id = $1 ", [
    userId,
  ]);
}

async function makeUserAdmin(userId) {
  await pool.query("update users set is_admin = 'true' where id = $1", [
    userId,
  ]);
}

async function deleteMessageById(messageId) {
  const id = Number(messageId);
  if (isNaN(id)) throw new Error('Invalid message ID');
  const result = await pool.query('DELETE FROM messages WHERE id = $1', [id]);
  console.log('Rows affected (model):', result.rowCount);
  return result.rowCount;
}

module.exports = {
  getAllMessages,
  getUserByUserid,
  getUserByUsername,
  insertUser,
  insertMessage,
  makeUserMember,
  makeUserAdmin,
  deleteMessageById,
};

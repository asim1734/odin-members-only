require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: process.env.DB_USERNAME,
  database: 'members_group',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;

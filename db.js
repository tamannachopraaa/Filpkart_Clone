// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',          // Your pgAdmin username
  host: 'localhost',
  database: 'flipkart_db',   // The name of the DB you created
  password: 'tamanna1234', // Your pgAdmin password
  port: 5432,
});

module.exports = pool;